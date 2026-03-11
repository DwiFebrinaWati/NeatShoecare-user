"use client"

import { MapPin, Phone, Instagram } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

interface Information {
  id: string
  address: string
  linkAddress: string
  phoneNumber: string
  instagramUsername: string
  instagramLink: string
}

function sanitizePhoneForWa(phone?: string) {
  if (!phone) return ""
  let onlyDigits = phone.replace(/\D/g, "")

  if (onlyDigits.startsWith("0")) {
    onlyDigits = "62" + onlyDigits.slice(1)
  }
  
  return onlyDigits
}

export default function Footers() {
  const [information, setInformation] = useState<Information | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch("/api/information")
        const data = await res.json()

        // API mengembalikan object `data` — kita pakai langsung
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

  const address = information?.address ?? "Magelang Kota"
  const mapHref = information?.linkAddress ?? ""
  const phoneRaw = information?.phoneNumber ?? ""
  const phoneForWa = sanitizePhoneForWa(phoneRaw)
  const waHref = phoneForWa ? `https://wa.me/${phoneForWa}?text=${encodeURIComponent("Halo Neat Shoecare, saya mau tanya layanan.")}` : ""
  const instaHref = information?.instagramLink ?? (information?.instagramUsername ? `https://instagram.com/${information.instagramUsername.replace(/^@/, "")}` : "")

  return (
    <footer className="bg-[#0047AB] text-white py-3">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/Logo.png"
            alt="Neat Shoecare Logo"
            width={40}
            height={40}
            className="object-contain"
          />
        </div>

        {/* Info Kontak */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 text-sm font-medium">
          {/* Address (link ke maps) */}
          <a
            href={mapHref || "#"}
            target={mapHref ? "_blank" : undefined}
            rel={mapHref ? "noopener noreferrer" : undefined}
            className="flex items-center gap-2 hover:underline"
            aria-label={`Buka alamat di peta: ${address}`}
            onClick={(e) => {
              if (!mapHref) e.preventDefault()
            }}
          >
            <MapPin size={16} className="text-white" />
            <span>{address}</span>
          </a>

          {/* Phone / WA */}
          <a
            href={waHref || "#"}
            target={waHref ? "_blank" : undefined}
            rel={waHref ? "noopener noreferrer" : undefined}
            className="flex items-center gap-2 hover:underline"
            aria-label={phoneForWa ? `Chat via WhatsApp ke ${phoneRaw}` : "Nomor telepon belum tersedia"}
            onClick={(e) => {
              if (!waHref) e.preventDefault()
            }}
          >
            <Phone size={16} className="text-white" />
            <span>{phoneRaw || "088888888888"}</span>
          </a>

          {/* Instagram */}
          <a
            href={instaHref || "#"}
            target={instaHref ? "_blank" : undefined}
            rel={instaHref ? "noopener noreferrer" : undefined}
            className="flex items-center gap-2 hover:underline"
            aria-label={instaHref ? `Buka Instagram: ${information?.instagramUsername ?? instaHref}` : "Instagram belum tersedia"}
            onClick={(e) => {
              if (!instaHref) e.preventDefault()
            }}
          >
            <Instagram size={16} className="text-white" />
            <span>{information?.instagramUsername ?? "@neatShoecare"}</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
