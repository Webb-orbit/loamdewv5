"use client"

import { Header } from "@/components/header"
import { useCart } from "@/lib/cart-context"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Plus, Minus, Trash2 } from "lucide-react"
import Link from "next/link"

export default function CartPage() {
  const { state, dispatch } = useCart()

  const total = state.items.reduce((sum, item) => {
    const price = Number.parseFloat(item.price.replace("$", "").replace(" USD", ""))
    return sum + price * item.quantity
  }, 0)

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-medium text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">{state.items.length} items in your cart</p>
        </div>

        {state.items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-6 text-lg">Your cart is empty</p>
            <Link href="/products">
              <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3">Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Cart Items */}
            <div className="space-y-6">
              {state.items.map((item, index) => (
                <div key={`${item.id}-${item.size}-${item.color}-${index}`} className="border-b border-gray-200 pb-6">
                  <div className="flex items-start space-x-6">
                    <div className="w-24 h-24 relative flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                      {item.size && <p className="text-gray-500 text-sm mt-1">Size: {item.size}</p>}
                      {item.color && <p className="text-gray-500 text-sm">Color: {item.color}</p>}
                      <p className="text-lg font-medium text-gray-900 mt-2">{item.price}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-8 h-8 border-gray-300 bg-transparent"
                        onClick={() =>
                          dispatch({
                            type: "UPDATE_QUANTITY",
                            payload: { id: item.id, quantity: item.quantity - 1 },
                          })
                        }
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="text-gray-900 w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-8 h-8 border-gray-300 bg-transparent"
                        onClick={() =>
                          dispatch({
                            type: "UPDATE_QUANTITY",
                            payload: { id: item.id, quantity: item.quantity + 1 },
                          })
                        }
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8 text-gray-400 hover:text-red-500"
                        onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.id })}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="border-t border-gray-200 pt-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-medium text-gray-900 mb-4">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-medium text-gray-900">
                      <span>Total</span>
                      <span>${total.toFixed(2)} USD</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  <Link href="/checkout">
                    <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3">
                      Proceed to Checkout
                    </Button>
                  </Link>
                  <Link href="/products">
                    <Button
                      variant="outline"
                      className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                    >
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
