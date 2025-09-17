"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getAllProducts, type Product } from "@/lib/products"

export function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getAllProducts()
        setProducts(fetchedProducts.slice(0, 3)) // Show only first 3 products
      } catch (error) {
        console.error("Error loading products:", error)
      } finally {
        console.log("hello");
        
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="animate-pulse">
          <div className="aspect-square bg-gray-800 rounded-lg"></div>
          <div className="mt-4 h-4 bg-gray-800 rounded w-3/4"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square bg-gray-800 rounded-lg"></div>
              <div className="mt-3 h-4 bg-gray-800 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No products available.</p>
      </div>
    )
  }

  const featuredProduct = products[0]
  const otherProducts = products.slice(1, 3)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Featured Product - Large Card */}
      <div className="group">
        <Link href={`/products/${featuredProduct.$id}`} className="block">
          <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-900 group-hover:opacity-75 transition-opacity">
            <Image
              src={featuredProduct.photos[0] || "/placeholder.svg?height=600&width=600"}
              alt={featuredProduct.name}
              fill
              className="object-cover object-center"
            />
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors">
                {featuredProduct.name}
              </h3>
            </div>
            <div className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium">{featuredProduct.price}</div>
          </div>
        </Link>
      </div>

      {/* Other Products - 2x1 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {otherProducts.map((product) => (
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
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                    {product.name}
                  </h3>
                </div>
                <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">{product.price}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
