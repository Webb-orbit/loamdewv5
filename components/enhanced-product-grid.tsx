"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { getAllProducts, type Product } from "@/lib/products"

export function EnhancedProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [displayCount, setDisplayCount] = useState(3)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getAllProducts()
        setProducts(fetchedProducts)
      } catch (error) {
        console.error("Error loading products:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const featuredProducts = products.slice(0, displayCount)

  const loadMore = async () => {
    setIsLoading(true)
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setDisplayCount((prev) => Math.min(prev + 3, products.length))
    setIsLoading(false)
  }

  if (isLoading && products.length === 0) {
    return (
      <div className="space-y-8">
        <div className="text-center py-12">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-800 rounded w-1/2 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-800 rounded w-3/4 mx-auto"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:row-span-2 animate-pulse">
            <div className="aspect-square bg-gray-800 rounded-lg"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-gray-800 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Premium Quality
          <span className="block text-blue-400">Modern Design</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Discover our curated collection of high-quality products designed for the modern lifestyle
        </p>
      </div>

      {/* Featured Products Grid */}
      {featuredProducts.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Large Featured Product */}
          <div className="lg:row-span-2">
            <ProductCard product={featuredProducts[0]} size="lg" showQuickAdd={true} />
          </div>

          {/* Smaller Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featuredProducts.slice(1).map((product) => (
              <ProductCard key={product.$id} product={product} size="md" showQuickAdd={true} />
            ))}
          </div>
        </div>
      )}

      {/* Loading Skeletons */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-square w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      )}

      {/* Load More Button */}
      {displayCount < products.length && (
        <div className="text-center">
          <Button
            onClick={loadMore}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
          >
            {isLoading ? "Loading..." : "Load More Products"}
          </Button>
        </div>
      )}
    </div>
  )
}
