"use client"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"

export default function ProcessAccordion() {
  const [items, setItems] = useState<{ title: string; description: string }[]>([])
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i))
  }

  // === FETCH WORKFLOW FROM API INFORMATION ===
  useEffect(() => {
    const fetchWorkflow = async () => {
      try {
        const res = await fetch("/api/information")
        const data = await res.json()

        if (Array.isArray(data?.data?.workflow)) {
          setItems(data.data.workflow)
        }
      } catch (err) {
        console.error("Gagal memuat workflow:", err)
      }
    }

    fetchWorkflow()
  }, [])

  return (
    <section className="relative bg-white py-20 overflow-hidden">
      {/* Judul */}
      <div className="text-center mb-16">
        <h2 className="text-5xl font-extrabold text-gray-900">
          ALUR PROSES PELAYANAN
        </h2>
        <p className="text-gray-500 mt-2">
          Lihat bagaimana setiap proses kami berjalan
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-center relative">
        
        {/* === LEFT — IMAGE === */}
        <div className="flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

            <img
              src="/process.png"
              alt="Proses Pencucian"
              className="relative 
        w-full 
        h-auto 
        rounded-2xl 
        object-contain
        shadow-2xl
        ring-1 ring-gray-900/5
        transition-transform duration-500 
        group-hover:scale-[1.02]

        md:w-[30rem]   /* w-120 (custom 120 = 30rem) */
        md:h-[25rem]   /* h-100 (custom 100 = 25rem) */
        md:object-cover"
            />
          </div>
        </div>

        {/* === RIGHT — ACCORDION === */}
        <div className="flex flex-col gap-4 w-full max-w-xl">
          
          {/* Loading */}
          {items.length === 0 && (
            <p className="text-gray-400 italic">Memuat proses...</p>
          )}

          {items.map((item, i) => {
            const isOpen = openIndex === i

            return (
              <div
                key={i}
                className={`pb-2 border-b transition-all duration-300 ${
                  isOpen ? "border-primary" : "border-gray-200"
                }`}
              >
                {/* Header */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex justify-between items-center py-3 group/btn transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 flex items-center justify-center rounded-full font-bold 
                        transition-all duration-300 shadow-sm
                        ${
                          isOpen
                            ? "bg-primary text-white shadow-lg shadow-blue-500/30 scale-110"
                            : "bg-gray-100 text-gray-600 group-hover/btn:bg-primary/10 group-hover/btn:text-primary group-hover/btn:scale-105"
                        }`}
                    >
                      {i + 1}
                    </div>

                    <span
                      className={`font-semibold text-lg transition-colors duration-300 ${
                        isOpen ? "text-gray-900" : "text-gray-700 group-hover/btn:text-primary"
                      }`}
                    >
                      {item.title}
                    </span>
                  </div>

                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 
                      ${isOpen ? "bg-primary/10 rotate-180" : "group-hover/btn:bg-gray-100"}`}
                  >
                    <ChevronDown
                      className={`w-5 h-5 transition-colors duration-300 ${
                        isOpen ? "text-primary" : "text-gray-500 group-hover/btn:text-gray-700"
                      }`}
                    />
                  </div>
                </button>

                {/* Body */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="mt-2 ml-14">
                      <p className="text-gray-500 mt-2text-sm leading-relaxed pl-4 border-l-2 border-primary/30">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
