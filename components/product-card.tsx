"use client"

import { cn } from "@/lib/utils"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/types"
import { ShoppingCart, Heart } from "lucide-react"

interface ProductCardProps {
  product: Product
  size?: "sm" | "md" | "lg"
  showQuickAdd?: boolean
}

export function ProductCard({ product, size = "md", showQuickAdd = false }: ProductCardProps) {
  const { dispatch } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
      },
    })

    setIsLoading(false)
    dispatch({ type: "OPEN_CART" })
  }

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
  }

  const sizeClasses = {
    sm: "aspect-square",
    md: "aspect-square",
    lg: "aspect-square",
  }

  const textSizes = {
    sm: { title: "text-sm", price: "text-xs" },
    md: { title: "text-base", price: "text-sm" },
    lg: { title: "text-lg", price: "text-base" },
  }

  return (
    <div className="group relative">
      <Link href={`/products/${product.id}`} className="block">
        <div
          className={cn(
            "relative overflow-hidden rounded-lg bg-gray-100 transition-all duration-300",
            "group-hover:shadow-lg group-hover:scale-[1.02]",
            sizeClasses[size],
          )}
        >
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />

          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />

          {/* Wishlist Button */}
          <button
            onClick={toggleWishlist}
            className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
          >
            <Heart className={cn("w-4 h-4", isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600")} />
          </button>

          {/* Quick Add Button */}
          {showQuickAdd && (
            <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <Button
                onClick={handleQuickAdd}
                disabled={isLoading || !product.inStock}
                className="w-full bg-white text-gray-900 hover:bg-gray-100 shadow-md"
                size="sm"
              >
                {isLoading ? (
                  <div className="w-4 h-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Quick Add
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Stock Status */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-medium">Out of Stock</span>
            </div>
          )}
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-start justify-between">
            <h3
              className={cn(
                "font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2",
                textSizes[size].title,
              )}
            >
              {product.name}
            </h3>
            <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium ml-2 flex-shrink-0">
              {product.price}
            </div>
          </div>

          {product.category && <p className="text-xs text-gray-500 capitalize">{product.category}</p>}

          {/* Rating Stars (placeholder) */}
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-3 h-3 bg-gray-200 rounded-full" />
            ))}
            <span className="text-xs text-gray-500 ml-2">(24)</span>
          </div>
        </div>
      </Link>
    </div>
  )
}
