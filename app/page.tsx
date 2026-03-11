import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import ProductCatalog from "@/components/product-catalog"
import Process from "@/components/process"
import Testimonial from "@/components/testimonial"
import Footers from "@/components/footers"
import Info from "@/components/services"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Info />
      <Process />
      <ProductCatalog />
      <Testimonial />
      <Footers />
    </main>
  )
}
