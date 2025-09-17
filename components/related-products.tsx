"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getProductsByCategory, type Product } from "@/lib/products"

interface RelatedProductsProps {
  currentProductId: string
  category: string
}

export function RelatedProducts({ currentProductId, category }: RelatedProductsProps) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const products = await getProductsByCategory(category)
        // Filter out current product and limit to 4
        const filtered = products.filter((product) => product.$id !== currentProductId).slice(0, 4)
        setRelatedProducts(filtered)
      } catch (error) {
        console.error("Error loading related products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRelatedProducts()
  }, [currentProductId, category])

  if (loading) {
    return (
      <section className="mt-16 border-t border-gray-800 pt-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Related Products</h2>
          <p className="text-gray-400">You might also like these items</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square bg-gray-800 rounded-lg"></div>
              <div className="mt-4 h-4 bg-gray-800 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <section className="mt-16 border-t border-gray-800 pt-16">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Related Products</h2>
        <p className="text-gray-400">You might also like these items</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <div key={product.$id} className="group">
            <Link href={`/products/${product.$id}`} className="block">
              <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-900 group-hover:opacity-75 transition-opacity">
                <Image
                  src={product.photos[0] || "/placeholder.svg?height=400&width=400"}
                  alt={product.name}
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                    {product.name}
                  </h3>
                </div>
                <div className="bg-blue-600 text-white px-2 py-1 rounded text-sm font-medium">{product.price}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
