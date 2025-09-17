"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function CheckoutPage() {
  const { state } = useCart()
  const [step, setStep] = useState(1)

  const total = state.items.reduce((sum, item) => {
    const price = Number.parseFloat(item.price.replace("$", "").replace(" USD", ""))
    return sum + price * item.quantity
  }, 0)

  const tax = total * 0.1 // 10% tax
  const finalTotal = total + tax

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-medium text-gray-900 mb-4">Your cart is empty</h1>
          <Link href="/products">
            <Button className="bg-gray-900 hover:bg-gray-800 text-white">Continue Shopping</Button>
          </Link>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <Link href="/cart" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to cart
          </Link>
          <h1 className="text-3xl font-medium text-gray-900">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div className="space-y-8">
            {/* Step Indicator */}
            <div className="flex items-center space-x-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 1 ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                1
              </div>
              <span className={step >= 1 ? "text-gray-900 font-medium" : "text-gray-500"}>Shipping</span>
              <div className="w-8 border-t border-gray-300"></div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 2 ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                2
              </div>
              <span className={step >= 2 ? "text-gray-900 font-medium" : "text-gray-500"}>Payment</span>
            </div>

            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-medium text-gray-900 mb-4">Shipping Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-gray-700">
                        First Name
                      </Label>
                      <Input id="firstName" className="mt-1 border-gray-300" />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-gray-700">
                        Last Name
                      </Label>
                      <Input id="lastName" className="mt-1 border-gray-300" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="email" className="text-gray-700">
                      Email
                    </Label>
                    <Input id="email" type="email" className="mt-1 border-gray-300" />
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="address" className="text-gray-700">
                      Address
                    </Label>
                    <Input id="address" className="mt-1 border-gray-300" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <Label htmlFor="city" className="text-gray-700">
                        City
                      </Label>
                      <Input id="city" className="mt-1 border-gray-300" />
                    </div>
                    <div>
                      <Label htmlFor="state" className="text-gray-700">
                        State
                      </Label>
                      <Input id="state" className="mt-1 border-gray-300" />
                    </div>
                    <div>
                      <Label htmlFor="zip" className="text-gray-700">
                        ZIP Code
                      </Label>
                      <Input id="zip" className="mt-1 border-gray-300" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Shipping Method</h3>
                  <RadioGroup defaultValue="standard" className="space-y-3">
                    <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard" className="flex-1 cursor-pointer">
                        <div className="flex justify-between">
                          <span>Standard Shipping</span>
                          <span className="text-gray-600">Free</span>
                        </div>
                        <p className="text-sm text-gray-500">5-7 business days</p>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg">
                      <RadioGroupItem value="express" id="express" />
                      <Label htmlFor="express" className="flex-1 cursor-pointer">
                        <div className="flex justify-between">
                          <span>Express Shipping</span>
                          <span className="text-gray-600">$15.00</span>
                        </div>
                        <p className="text-sm text-gray-500">2-3 business days</p>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button onClick={() => setStep(2)} className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3">
                  Continue to Payment
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-medium text-gray-900 mb-4">Payment Information</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber" className="text-gray-700">
                        Card Number
                      </Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="mt-1 border-gray-300" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry" className="text-gray-700">
                          Expiry Date
                        </Label>
                        <Input id="expiry" placeholder="MM/YY" className="mt-1 border-gray-300" />
                      </div>
                      <div>
                        <Label htmlFor="cvc" className="text-gray-700">
                          CVC
                        </Label>
                        <Input id="cvc" placeholder="123" className="mt-1 border-gray-300" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cardName" className="text-gray-700">
                        Name on Card
                      </Label>
                      <Input id="cardName" className="mt-1 border-gray-300" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="billing" />
                  <Label htmlFor="billing" className="text-sm text-gray-700">
                    Billing address is the same as shipping address
                  </Label>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={() => setStep(1)}
                    variant="outline"
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Back to Shipping
                  </Button>
                  <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3">Complete Order</Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-medium text-gray-900 mb-4">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {state.items.map((item, index) => (
                  <div key={`${item.id}-${item.size}-${item.color}-${index}`} className="flex items-center space-x-4">
                    <div className="w-16 h-16 relative flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                      {item.size && <p className="text-xs text-gray-500">Size: {item.size}</p>}
                      {item.color && <p className="text-xs text-gray-500">Color: {item.color}</p>}
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-medium text-gray-900">{item.price}</div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
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
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-lg font-medium text-gray-900">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)} USD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
