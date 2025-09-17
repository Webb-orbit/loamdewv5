import { SimpleHeader } from "@/components/simple-header"
import { ProductsGrid } from "@/components/products-grid"

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-black">
      <SimpleHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">All Products</h1>
          <p className="text-gray-400">Discover our complete collection</p>
        </div>
        <ProductsGrid />
      </main>
    </div>
  )
}
