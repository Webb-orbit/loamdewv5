"use client"

import { X, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import Image from "next/image"
import Link from "next/link"

export function CartSidebar() {
  const { state, dispatch } = useCart()

  const total = state.items.reduce((sum, item) => {
    const price = Number.parseFloat(item.price.replace("$", "").replace(" USD", ""))
    return sum + price * item.quantity
  }, 0)

  if (!state.isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => dispatch({ type: "CLOSE_CART" })} />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-black border-l border-gray-800 z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-white">Shopping Cart</h2>
          <Button variant="ghost" size="icon" onClick={() => dispatch({ type: "CLOSE_CART" })}>
            <X className="w-5 h-5 text-white" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {state.items.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">Your cart is empty</p>
              <Button className="mt-4" onClick={() => dispatch({ type: "CLOSE_CART" })}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {state.items.map((item, index) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}-${index}`}
                  className="flex items-center space-x-4 bg-gray-900 p-4 rounded-lg"
                >
                  <div className="w-16 h-16 relative">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium text-sm">{item.name}</h3>
                    {item.size && <p className="text-gray-400 text-xs">Size: {item.size}</p>}
                    {item.color && <p className="text-gray-400 text-xs">Color: {item.color}</p>}
                    <p className="text-blue-400 font-medium text-sm">{item.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8"
                      onClick={() =>
                        dispatch({
                          type: "UPDATE_QUANTITY",
                          payload: { id: item.id, quantity: item.quantity - 1 },
                        })
                      }
                    >
                      <Minus className="w-4 h-4 text-white" />
                    </Button>
                    <span className="text-white w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8"
                      onClick={() =>
                        dispatch({
                          type: "UPDATE_QUANTITY",
                          payload: { id: item.id, quantity: item.quantity + 1 },
                        })
                      }
                    >
                      <Plus className="w-4 h-4 text-white" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="border-t border-gray-800 p-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-white font-semibold">Total:</span>
              <span className="text-white font-bold">${total.toFixed(2)} USD</span>
            </div>
            <Link href="/cart" onClick={() => dispatch({ type: "CLOSE_CART" })}>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">View Cart</Button>
            </Link>
            <Button className="w-full bg-white text-black hover:bg-gray-200">Checkout</Button>
          </div>
        )}
      </div>
    </>
  )
}
