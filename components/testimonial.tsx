"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Star, User, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Testimonial {
  id: string
  name: string
  pesanan: { serviceName: string; quantity: number }[]
  foto: string[]
  ulasan: string
  rating: number
}

export default function Testimonial() {
  const [index, setIndex] = useState(0)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isPaused, setIsPaused] = useState(false)
  const [loading, setLoading] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const [zoomImage, setZoomImage] = useState<string | null>(null)

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch("/api/testimonial")
        const data = await res.json()

        setTestimonials(Array.isArray(data.data) ? data.data : [data.data])
      } catch (err) {
        console.error("Gagal fetch services:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  const handlePrev = () => setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  const handleNext = () => setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))

  // Auto-slide setiap 5 detik
  useEffect(() => {
    if (isPaused) return
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPaused, testimonials.length])

  if (testimonials.length === 0)
    return null

  const current = testimonials[index]

  return (
    <section
      id="testimoni"
      className="py-16 bg-blue-100"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Header + tombol navigasi */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Testimoni Pelanggan
            </h2>
            <p className="text-sm text-gray-600">
              Cerita nyata dari pelanggan kami
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full border border-gray-300 bg-white hover:bg-gray-100 transition"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-[#0047AB] text-white hover:bg-[#003a8a] transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Testimoni */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="wait">
            {testimonials.slice(index, index + 2).map((t) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4"
              >
                {/* Header nama + rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-700" />
                    <p className="font-semibold">{t.name}</p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < t.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                </div>

                {/* Pesanan */}
                <div className="text-sm text-gray-600">
                  <p className="font-semibold">Pesanan:</p>
                  <ul className="list-disc ml-5">
                    {t.pesanan.map((p, i) => (
                      <li key={i}>
                        {p.serviceName}{" "}
                        <span className="text-gray-400">×{p.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Foto */}
                {t.foto && t.foto.length > 0 && (
                  <div className="flex gap-3 py-2">
                    {/* Tampilkan hanya maksimal 2 foto */}
                    {t.foto.slice(0, 2).map((f, i) => (
                      <div
                        key={i}
                        className="relative w-24 h-24 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition"
                        onClick={() => setZoomImage(f)}
                      >
                        <Image
                          src={f}
                          alt={`Foto testimoni ${t.name}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}

                    {t.foto.length > 2 && (
                      <div
                        onClick={() => setZoomImage(t.foto[2])}
                        className="w-24 h-24 rounded-lg bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-semibold cursor-pointer hover:bg-gray-300 transition"
                      >
                        +{t.foto.length - 2}
                      </div>
                    )}
                  </div>
                )}
                
                <p className="text-gray-700 font-medium text-sm leading-relaxed">
                  {t.ulasan}
                </p>

                {zoomImage && (
                  <div
                    className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999]"
                    onClick={() => setZoomImage(null)}
                  >
                    <div className="relative w-[90%] max-w-xl h-[70%] rounded-xl overflow-hidden">
                      <Image
                        src={zoomImage}
                        alt="Zoom"
                        fill
                        className="object-contain"
                      />
                      <button
                        className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 shadow"
                        onClick={() => setZoomImage(null)}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )}

              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
