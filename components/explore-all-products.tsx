import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function ExploreAllProducts() {
  return (
    <section className="mt-16 py-16 border-t border-gray-800">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Explore All Products</h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Discover our complete collection of high-quality products designed for the modern lifestyle. From comfortable
          apparel to stylish accessories, find everything you need.
        </p>
        <Link href="/products">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-medium group">
            View All Products
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </section>
  )
}
