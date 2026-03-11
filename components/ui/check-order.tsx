"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ConfirmInfo } from "@/components/ui/alert"

export default function CheckOrderModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [groupId, setGroupId] = useState("")
  const [uniqueCode, setUniqueCode] = useState("")
  const [orderData, setOrderData] = useState<any[] | null>(null)
  const [loading, setLoading] = useState(false)

  const [infoOpen, setInfoOpen] = useState(false)
  const [infoMessage, setInfoMessage] = useState("")

  const handleCheckOrder = async () => {
    if (!groupId || !uniqueCode) {
      setInfoMessage("Harap isi Group ID dan Unique Code.")
      setInfoOpen(true)
      return
    }

    setLoading(true)

    try {
      const res = await fetch(`/api/order/check?groupId=${groupId}&uniqueCode=${uniqueCode}`)
      const data = await res.json()

      if (data.status !== "success" || !data.data?.length) {
        setInfoMessage("Data pesanan tidak ditemukan.")
        setInfoOpen(true)
        return
      }

      setOrderData(data.data) // array
    } catch (e) {
      setInfoMessage("Terjadi kesalahan saat cek pesanan.")
      setInfoOpen(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!open) {
      // Reset semua state saat modal ditutup
      setGroupId("")
      setUniqueCode("")
      setOrderData(null)
      setLoading(false)
      setInfoMessage("")
      setInfoOpen(false)
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Cek Pesanan</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-4">
          <div>
            <label className="font-semibold">Group ID</label>
            <Input
              placeholder="69120250120xxxxx"
              value={groupId}
              onChange={e => setGroupId(e.target.value)}
            />
          </div>
    
          <div>
            <label className="font-semibold">Kode Pesanan</label>
            <Input
              placeholder="344475"
              value={uniqueCode}
              onChange={e => setUniqueCode(e.target.value)}
            />
          </div>

          <Button
            disabled={loading}
            onClick={handleCheckOrder}
            className="w-full bg-primary text-white mt-2"
          >
            {loading ? "Mengecek..." : "Cek Pesanan"}
          </Button>
        </div>

        {/* Hasil Cek Pesanan */}
        {orderData && (
          <div className="mt-6 bg-gray-50 p-4 rounded-xl border text-sm">
            {orderData.map((o, i) => (
              <div key={i} className="mb-4 pb-4 border-b last:border-none">
                <p><b>Status:</b> {o.status}</p>
                <p><b>Nama:</b> {o.name}</p>
                <p><b>Alamat:</b> {o.address}</p>
                <p><b>Service:</b> {o.serviceName}</p>
                <p><b>Harga:</b> Rp {o.price.toLocaleString("id-ID")}</p>
              </div>
            ))}
          </div>
        )}
      </DialogContent>

      <ConfirmInfo
        open={infoOpen}
        message={infoMessage}
        onConfirm={() => setInfoOpen(false)}
      />
    </Dialog>
  )
}
