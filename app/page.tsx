import { SimpleHeader } from "@/components/simple-header"
import { HeroSection } from "@/components/hero-section"
import { ProductGrid } from "@/components/product-grid"
import { ExploreAllProducts } from "@/components/explore-all-products"
import { EnhancedFooter } from "@/components/enhanced-footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      <SimpleHeader />
      <main className="container mx-auto px-4 py-8">
        <HeroSection />
        <ProductGrid />
        <ExploreAllProducts />
      </main>
      <EnhancedFooter />
    </div>
  )
}
