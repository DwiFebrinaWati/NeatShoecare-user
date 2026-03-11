"use client"

import { Button } from "@/components/ui/button"
import { Truck, TicketPercent, ShieldCheck, MapPin, ClipboardList, FileEdit, Shirt, Wind, Package, WashingMachine, Droplets } from "lucide-react"

export default function Hero() {
  const scrollToProducts = () => {
    const element = document.getElementById("services")
    if (element) element.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="home"
      className="pt-24 pb-12 min-h-screen flex items-center bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-3 gap-10 items-center relative">
        
        {/* 🧴 Text Section (2/3 bagian) */}
        <div className="md:col-span-2 max-w-2xl z-10">
          <span className="inline-block bg-primary-light text-primary font-medium px-4 py-1 rounded-full mb-4 shadow-sm">
            Layanan Pembersihan Sepatu Profesional
          </span>

          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            <span className="text-black">Rawat Sepatumu, <br /></span>
            <span className="text-primary">Percayakan pada Neat Shoecare</span>
          </h1>

          <p className="text-gray-600 mb-6 leading-relaxed text-sm md:text-base">
            Produk perawatan sepatu premium yang dirancang untuk menjaga sepatu Anda tetap prima.
            Dari semir kulit hingga pembersihan anti-bakteri, kami punya semua yang Anda butuhkan.
          </p>

          <Button
            onClick={scrollToProducts}
            className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-all relative h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            Lihat Layanan
          </Button>
        </div>

        {/* 👟 Image Section (1/3 bagian) */}
        <div className="relative flex justify-center md:justify-end z-0">
          {/* Lingkaran biru muda di belakang */}
          <div className="absolute -top-6 -right-6 w-16 h-16 bg-white border-4 border-primary-light rounded-full"></div>

          {/* Frame gambar */}
          <div className="relative w-[280px] md:w-[360px] lg:w-[400px]">
            <div className="rounded-3xl p-2 bg-white border-4 border-primary shadow-lg relative overflow-hidden">
              <img
                src="/hero.png"
                alt="Sepatu Bersih"
                className="w-full h-auto object-cover rounded-2xl transform transition-transform duration-500 hover:scale-110"
              />
            </div>

            {/* Ikon atas kiri */}
            <div className="absolute -top-6 -left-6 bg-white border-4 border-primary/30 p-3 rounded-full shadow-md">
              <WashingMachine className="w-6 h-6 text-primary" />
            </div>

            {/* Ikon bawah kiri */}
            <div className="absolute -bottom-4 -left-16 bg-white border-4 border-primary/30 p-3 rounded-full shadow-lg">
              <Droplets className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
