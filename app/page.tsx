import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import ProductCatalog from "@/components/product-catalog"
import PriceSimulator from "@/components/price-simulator"
import Testimonials from "@/components/testimonials"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <ProductCatalog />
      <PriceSimulator />
      <Testimonials />
      <Footer />
    </main>
  )
}
