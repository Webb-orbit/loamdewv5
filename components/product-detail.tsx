"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/products"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { dispatch } = useCart()
  const [selectedImage, setSelectedImage] = useState(0)
  const dimensions = Array.isArray(product.dimension) ? product.dimension : []
  const colors = Array.isArray(product.colors) ? product.colors : []
  const [selectedSize, setSelectedSize] = useState(dimensions[0] || "")
  const [selectedColor, setSelectedColor] = useState(colors[0] || "")

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.$id,
        name: product.name,
        price: product.price,
        image: product.photos[0],
        size: selectedSize,
        color: selectedColor,
      },
    })
    dispatch({ type: "OPEN_CART" })
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.photos.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.photos.length) % product.photos.length)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Product photos */}
      <div className="space-y-4">
        <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-900">
          <Image
            src={product.photos[selectedImage] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover object-center"
          />
          {product.photos.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70"
                onClick={prevImage}
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70"
                onClick={nextImage}
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </Button>
            </>
          )}
        </div>

        {/* Thumbnail photos */}
        {product.photos.length > 1 && (
          <div className="flex space-x-2">
            {product.photos.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-20 h-20 relative overflow-hidden rounded border-2 ${
                  selectedImage === index ? "border-blue-600" : "border-gray-700"
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
          <p className="text-2xl font-semibold text-blue-400">{product.price}</p>
        </div>

        <p className="text-gray-300 leading-relaxed">{product.description}</p>

        {/* Size Selection */}
        {dimensions.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-white font-medium">Size</h3>
            <div className="flex flex-wrap gap-2">
              {dimensions.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded transition-colors ${
                    selectedSize === size
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-gray-600 text-gray-300 hover:border-gray-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Color Selection */}
        {colors.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-white font-medium">Color</h3>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 border rounded transition-colors ${
                    selectedColor === color
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-gray-600 text-gray-300 hover:border-gray-400"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Add to Cart */}
        <div className="space-y-4">
          <Button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
            disabled={!product.instock}
          >
            {product.instock ? "Add to Cart" : "Out of Stock"}
          </Button>

          {product.instock && <p className="text-green-400 text-sm">✓ In stock and ready to ship</p>}
        </div>
      </div>
    </div>
  )
}
