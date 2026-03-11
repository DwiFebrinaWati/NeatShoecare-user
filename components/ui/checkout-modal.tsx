"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/ui/cart-context"
import { ConfirmPopup, ConfirmInfo } from "@/components/ui/alert"
import { useInformation } from "@/hooks/useInformation"

interface CartItem {
  id: string
  quantity: number
  // add other properties if needed
}

interface ExpandedOrder {
  serviceId: string
  name: string
  address: string
  pickupDelivery: boolean
  pickupNote: string
  serviceNote: string
}

export default function CheckoutModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { cart, totalPrice, clearCart } = useCart()
  const { information } = useInformation()

  const [loading, setLoading] = useState(false)
  const [popupOpen, setPopupOpen] = useState(false)
  const [popupMessage, setPopupMessage] = useState("")
  const [infoOpen, setInfoOpen] = useState(false)
  const [infoMessage, setInfoMessage] = useState("")

  const [pendingWAData, setPendingWAData] = useState<any>(null)
  const [cooldown, setCooldown] = useState(0)

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [notes, setNotes] = useState("")
  const [pickupDelivery, setPickupDelivery] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("cash")

  const generateGroupId = () => {
    const d = new Date()
    const id = Math.floor(10000 + Math.random() * 90000)
    return `NEAT${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}${id}`
  }

  const generateUniqueCode = () => Math.floor(100000 + Math.random() * 900000).toString()

  useEffect(() => {
    const last = localStorage.getItem("lastOrderTime")
    if (!last) return

    const remaining = 600000 - (Date.now() - Number(last))
    if (remaining > 0) {
      setCooldown(remaining)

      const interval = setInterval(() => {
        setCooldown(prev => {
          if (prev <= 1000) {
            clearInterval(interval)
            return 0
          }
          return prev - 1000
        })
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    if (infoOpen && cooldown > 0) {
      const rawNumber = information?.phoneNumber ?? "6281234567890"
      let adminNumber = rawNumber.replace(/\D/g, "")
      if (adminNumber.startsWith("0")) adminNumber = "62" + adminNumber.slice(1)
      if (!adminNumber.startsWith("62")) adminNumber = "62" + adminNumber

      const waUrl = `https://wa.me/${adminNumber}?text=${encodeURIComponent(
        "Halo admin, saya ingin mengubah pesanan sebelumnya atau ada pertanyaan."
      )}`
      setPendingWAData({ url: waUrl })

      setInfoMessage(
        `Anda hanya dapat membuat pesanan baru setelah ${formatTime(cooldown)}.\n\n` +
        `Jika anda perlu merubah pesanan sebelumnya atau ada keperluan lain, silahkan hubungi admin kami.`
      )
      setInfoOpen(true)
      return
    }
  }, [cooldown, infoOpen])

  const formatTime = (ms: number) => {
    const m = Math.floor(ms / 60000)
    const s = Math.floor((ms % 60000) / 1000)
    return `${m}:${s.toString().padStart(2, "0")}`
  }

  const handleSubmit = async () => {
    if (cooldown > 0) {
      setInfoOpen(true)
      return
    }

    if (!name || !phone || !address) {
      setInfoMessage("Harap isi Nama, Nomor WA, dan Alamat.")
      setInfoOpen(true)
      return
    }
    
    function expandOrders(cart: CartItem[]): ExpandedOrder[] {
      const result: ExpandedOrder[] = []
      cart.forEach(item => {
      for (let i = 0; i < item.quantity; i++) {
        result.push({
        serviceId: item.id,
        name,
        address,
        pickupDelivery,
        pickupNote: pickupDelivery ? notes : "",
        serviceNote: notes,
        })
      }
      })
      return result
    }

    const productListText = cart
      .map(
        (item, index) =>
          `${index + 1}. ${item.name} (Qty: ${item.quantity})${item.notes ? ` - Catatan: ${item.notes}` : ''}`
      )
      .join('\n')

    const payload = {
      groupId: generateGroupId(),
      uniqueCode: generateUniqueCode(),
      paymentMethod,
      orders: expandOrders(cart)
    }

    console.log("Payload dikirim:", payload)

    setLoading(true)

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (data.status !== "success") {
        setInfoMessage("Gagal membuat pesanan: " + (data?.message || "Unknown"))
        setInfoOpen(true)
        return
      }

      const { orderGroupId, uniqueCode } = data.summary ?? {}

      if (!orderGroupId || !uniqueCode) {
        setInfoMessage("Pesanan berhasil, tetapi data respon tidak lengkap.")
        setInfoOpen(true)
        return
      }

      // Starting order cooldown (10 minutes)
      localStorage.setItem("lastOrderTime", Date.now().toString())
      setCooldown(600000)

      const rawNumber = information?.phoneNumber ?? "6281234567890"
      let adminNumber = rawNumber.replace(/\D/g, "")
      if (adminNumber.startsWith("0")) {
        adminNumber = "62" + adminNumber.slice(1)
      }
      if (!adminNumber.startsWith("62")) {
        adminNumber = "62" + adminNumber
      }
      
      const waText = `Halo Neat Shoecare!
        Saya telah membuat pesanan:

        Group ID: ${orderGroupId}
        Kode: ${uniqueCode}
        Nama: ${name}
        Alamat: ${address}

        Daftar Produk:
        ${productListText}

        Total: Rp ${totalPrice.toLocaleString("id-ID")}`

      setPendingWAData({
        url: `https://wa.me/${adminNumber}?text=${encodeURIComponent(waText)}`,
      })

      setPopupMessage(
        `Pesanan berhasil dibuat!
Simpan Group ID dan Kode Pesanan Anda untuk cek pesanan.
Anda akan diarahkan ke WhatsApp untuk konfirmasi.
⚠ Anda hanya dapat membuat pesanan baru setelah 10 menit.`
      )
      setPopupOpen(true)

      clearCart()
      onOpenChange(false)
    } catch (err: any) {
      setInfoMessage("Terjadi error: " + err)
      setInfoOpen(true)
    } finally {
      setLoading(false)
    }
  }

  const handlePopupConfirm = () => {
    setPopupOpen(false)
    if (pendingWAData) {
      window.open(pendingWAData.url, "_blank")
      setPendingWAData(null)
    }
  }

  // --- tombol WA di info popup
  const infoActionButton = pendingWAData?.url ? (
    <Button
      onClick={() => {
        window.open(pendingWAData.url, "_blank")
        setInfoOpen(false)
        setPendingWAData(null)
      }}
      className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl"
    >
      Hubungi Admin via WA
    </Button>
  ) : undefined

  return (
    <>
      {/* MAIN CHECKOUT MODAL */}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Checkout</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 mt-4">
            <div>
              <label className="font-semibold">Nama Lengkap *</label>
              <Input value={name} onChange={e => setName(e.target.value)} placeholder="Nama lengkap" required/>
            </div>

            <div>
              <label className="font-semibold">Nomor WhatsApp *</label>
              <Input
                value={phone}
                onChange={e => setPhone(e.target.value.replace(/\D/g, ""))}
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="0812xxxx"
                required
              />
            </div>

            <div>
              <label className="font-semibold">Alamat Lengkap *</label>
              <Textarea value={address} onChange={e => setAddress(e.target.value)} placeholder="Alamat" required/>
            </div>

            <div>
              <label className="font-semibold">Catatan (opsional)</label>
              <Textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Catatan" />
            </div>

            <div className="flex items-center gap-3">
              <input id="pickup" type="checkbox" checked={pickupDelivery} onChange={e => setPickupDelivery(e.target.checked)} />
              <label htmlFor="pickup">Minta antar-jemput</label>
            </div>

            <div>
              <label className="font-semibold">Metode Pembayaran</label>
              <select
                value={paymentMethod}
                onChange={e => setPaymentMethod(e.target.value)}
                className="ml-2 px-3 py-2 rounded border"
              >
                <option value="cash">Tunai (Cash)</option>
                <option value="transfer">Transfer</option>
                <option value="Dana">Dana</option>
                <option value="QRIS">QRIS</option>
              </select>
            </div>

            <div className="mt-2 text-right text-xl font-bold">
              Total: Rp {totalPrice.toLocaleString("id-ID")},-
            </div>

            <Button
              disabled={loading || cart.length === 0}
              onClick={handleSubmit}
              className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl"
            >
              {loading ? "Memproses..." : "Buat Pesanan"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* POPUP INFORMASI */}
      <ConfirmInfo open={infoOpen} message={infoMessage} onConfirm={() => setInfoOpen(false)} actionButton={infoActionButton} />

      {/* POPUP KONFIRMASI WHATSAPP */}
      <ConfirmPopup open={popupOpen} message={popupMessage} onConfirm={handlePopupConfirm} />
    </>
  )
}