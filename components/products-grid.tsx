"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getAllProducts, type Product } from "@/lib/products"

export function ProductsGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getAllProducts()
        setProducts(fetchedProducts)
      } catch (error) {
        console.error("Error loading products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-square bg-gray-800 rounded-lg"></div>
            <div className="mt-4 h-4 bg-gray-800 rounded w-3/4"></div>
            <div className="mt-2 h-3 bg-gray-800 rounded w-1/2"></div>
          </div>
        ))}
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
                <p className="text-xs text-gray-400 mt-1">{product.category}</p>
              </div>
              <div className="bg-blue-600 text-white px-2 py-1 rounded text-sm font-medium">{product.price}</div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}
