import { notFound } from "next/navigation"
import { ProductDetail } from "@/components/product-detail"
import { SimpleHeader } from "@/components/simple-header"
import { RelatedProducts } from "@/components/related-products"
import Productbase from "@/libapi/product_api"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await Productbase.getProduct(params.id)
  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-black">
      <SimpleHeader />
      <main className="container mx-auto px-4 py-8">
        <ProductDetail product={product} />
        <RelatedProducts currentProductId={product.id} category={product.category} />
      </main>
    </div>
  )
}
