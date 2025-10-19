import { Instagram, MessageCircle } from "lucide-react"

export default function Footer() {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Neat Shoecare</h3>
            <p className="text-primary-foreground/80 mb-4">
              Premium shoe care products for the discerning customer. Keep your footwear looking pristine with our
              professional-grade solutions.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-2 text-primary-foreground/80">
              <p>📍 123 Shoe Care Lane</p>
              <p>📍 Premium District, PC 12345</p>
              <p>📧 hello@neatshoecare.com</p>
              <p>📞 (555) 123-NEAT</p>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-primary-foreground/10 p-3 rounded-full hover:bg-primary-foreground/20 transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-primary-foreground/10 p-3 rounded-full hover:bg-primary-foreground/20 transition-colors duration-200"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
              <a
                href="#"
                className="bg-primary-foreground/10 p-3 rounded-full hover:bg-primary-foreground/20 transition-colors duration-200"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60">© 2025 Neat Shoecare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
