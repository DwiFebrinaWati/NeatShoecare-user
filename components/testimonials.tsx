"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    review:
      "Neat Shoecare products have completely transformed how I maintain my shoe collection. The leather polish is exceptional!",
    image: "/professional-woman-headshot.png",
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 5,
    review:
      "As someone who owns expensive dress shoes, I trust only Neat Shoecare. Their waterproof spray saved my suede loafers!",
    image: "/professional-man-headshot.png",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    rating: 5,
    review: "The sneaker wipes are a game-changer for busy professionals. Quick, effective, and always reliable.",
    image: "/young-professional-woman-headshot.png",
  },
  {
    id: 4,
    name: "David Thompson",
    rating: 5,
    review: "Outstanding quality and results. My leather boots look brand new after using their complete care system.",
    image: "/mature-professional-man-headshot.jpg",
  },
  {
    id: 5,
    name: "Lisa Park",
    rating: 5,
    review: "I recommend Neat Shoecare to all my friends. The deodorizer works wonders and the products last forever.",
    image: "/professional-woman-headshot.png",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentIndex(index)
  }

  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What Our Customers Say</h2>
          <p className="text-lg text-muted-foreground">Trusted by thousands of shoe enthusiasts worldwide</p>
        </div>

        <div className="relative">
          <Card className="bg-card border-border shadow-lg">
            <CardContent className="p-8 md:p-12">
              <div className="text-center">
                <div className="mb-6">
                  <img
                    src={testimonials[currentIndex].image || "/placeholder.svg"}
                    alt={testimonials[currentIndex].name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>

                <blockquote className="text-lg md:text-xl text-foreground mb-6 italic">
                  "{testimonials[currentIndex].review}"
                </blockquote>

                <cite className="text-primary font-semibold text-lg">{testimonials[currentIndex].name}</cite>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="sm"
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? "bg-primary" : "bg-border"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
