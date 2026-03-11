"use client"

import { Truck, TicketPercent, ShieldCheck, MapPin } from "lucide-react"
import { useEffect, useState } from "react"

interface Information {
  id: string
  address: string
  openHour: string
  closeHour: string
}

export default function Info() {
  const [information, setInformation] = useState<Information | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch("/api/information")
        const data = await res.json()

        setInformation(Array.isArray(data.data) ? data.data[0] : data.data)
      } catch (err) {
        console.error("Gagal fetch services:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  if (loading) {
    return <p className="text-center py-20 text-gray-500">Memuat informasi...</p>
  }

    function formatTime(isoString?: string) {
    if (!isoString) return ""
    const date = new Date(isoString)
    const hours = date.getUTCHours().toString().padStart(2, "0")
    const minutes = date.getUTCMinutes().toString().padStart(2, "0")
    return `${hours}.${minutes}`
    }

return (
    <section id="information" className="flex justify-center items-center py-16 bg-white">
      <div className="max-w-6xl w-full bg-primary-light rounded-3xl border border-primary/30 p-10">

        {/* Bagian Atas - Icon Layanan */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-primary font-semibold text-sm mb-10">
          <div className="flex items-center gap-3">
            <Truck className="w-7 h-7 text-primary" />
            <p>
              Jasa Antar-Jemput <br />
              <span className="font-normal text-gray-700">(Pick up & Delivery)</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <TicketPercent className="w-7 h-7 text-primary" />
            <p>
              10x Kupon <br />
              <span className="font-normal text-gray-700">Gratis 1x Cuci</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck className="w-7 h-7 text-primary" />
            <p>
              Terpercaya <br />
              <span className="font-normal text-gray-700">Lebih dari 2 Tahun</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="w-7 h-7 text-primary" />
            <p>
              {information?.address ?? "Magelang Kota"} <br />
              <span className="font-normal text-gray-700">
                {formatTime(information?.openHour)}–{formatTime(information?.closeHour) || "20.00"} WIB
              </span>
            </p>
          </div>
        </div>

        {/* Teks & Gambar */}
        <div className="grid md:grid-cols-2 items-center gap-8">
          <div className="text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
              TETAP BERSIH, TETAP KEREN
            </h2>
            <p className="text-gray-600 text-lg font-semibold">
              Cuci Sepatu & Helm Lo, <br /> Agar Selalu Kece Setiap Hari
            </p>
          </div>

          <div className="flex justify-center md:justify-end mt-8 md:mt-0">
            <img
              src="/shoe.png"
              alt="Sepatu Bersih"
              className="w-[250px] sm:w-[280px] md:w-[340px] lg:w-[400px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}