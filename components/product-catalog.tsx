"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Sparkles, Zap, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from '@/components/ui/use-toast'
import { useCart } from "@/components/ui/cart-context"

interface Service {
  id: string
  name: string
  category: string
  price: number
  description: string
  duration: string
  photoServiceUrl: string // optional jika API belum ada photo
}

export default function ProductCatalog() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch("/api/services")
        const data = await res.json()
        setServices(Array.isArray(data.data) ? data.data : [data.data])
      } catch (err) {
        console.error("Gagal fetch services:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  if (loading) {
    return <p className="text-center py-20 text-gray-500">Memuat layanan...</p>
  }

  const handleAdd = (service: Service) => {
    addToCart({
      id: service.id,
      name: service.name,
      price: service.price,
      quantity: 1,
      notes: '',
    })

    toast({
      title: 'Berhasil Ditambahkan 🛒',
      description: `${service.name} masuk ke keranjang.`,
      duration: 3000,
    })
  }

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4">
            Layanan Profesional
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold text-balance mb-6">
            Layanan Terlengkap untuk <span className="text-primary">Semua Kebutuhan</span>
          </h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
            Dari deep cleaning hingga perawatan khusus, kami menyediakan solusi lengkap untuk menjaga sepatu dan helm
            Anda tetap bersih dan terawat.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="relative h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                {/* Gambar dengan efek hover zoom */}
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src={service.photoServiceUrl || "/placeholder-service.png"}
                    alt={service.name}
                    className="w-full h-56 object-cover transform transition-transform duration-500 hover:scale-110"
                  />
                </div>

                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Sparkles className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{service.name}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {service.duration}
                        </Badge>
                        <span className="text-sm font-semibold text-primary">
                          Rp {service.price.toLocaleString("id-ID")}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>

                <CardFooter className="p-6 pt-0">
                  <Button className="mt-3 w-full" onClick={() => handleAdd(service)}>
                    Tambah ke Keranjang
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Estimasi Waktu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-primary/5 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Estimasi Waktu Pengerjaan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-center space-x-3 p-4 bg-background rounded-xl">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Sparkles className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">Normal Service</div>
                  <div className="text-sm text-muted-foreground">3 jam pengerjaan</div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3 p-4 bg-background rounded-xl">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Zap className="h-5 w-5 text-orange-600" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">Express Service</div>
                  <div className="text-sm text-muted-foreground">1 hari + biaya tambahan</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}