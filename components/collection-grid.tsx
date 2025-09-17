"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getProductsByCategory, type Product } from "@/lib/products"

interface CollectionGridProps {
  category: string
}

export function CollectionGrid({ category }: CollectionGridProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProductsByCategory(category)
        setProducts(fetchedProducts)
      } catch (error) {
        console.error("Error loading products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [category])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-square bg-gray-800 rounded-lg"></div>
            <div className="mt-4 h-4 bg-gray-800 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No products found in this collection.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
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
  )
}
