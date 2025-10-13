import { Card } from "@/components/ui/card"

const testimonials = [
  {
    quote: "StreamLine has completely transformed how our team works. We ship features 3x faster now.",
    author: "Sarah Chen",
    role: "CTO at TechCorp",
    avatar: "/professional-woman-diverse.png",
  },
  {
    quote: "The best investment we made this year. The ROI was clear within the first month.",
    author: "Michael Rodriguez",
    role: "VP Engineering at DataFlow",
    avatar: "/professional-man.jpg",
  },
  {
    quote: "Incredible platform. The support team is responsive and the features are exactly what we needed.",
    author: "Emily Watson",
    role: "Product Manager at CloudScale",
    avatar: "/professional-woman-2.png",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            Loved by teams worldwide
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Join thousands of companies already using StreamLine to accelerate their workflows.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.author}
              className="relative overflow-hidden border-border bg-card p-8 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="mb-6">
                <svg className="h-8 w-8 text-primary/20" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
              </div>
              <p className="mb-6 text-foreground leading-relaxed">{testimonial.quote}</p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.author}
                  className="h-12 w-12 rounded-full"
                />
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
