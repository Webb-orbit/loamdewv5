"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { CartSidebar } from "@/components/cart-sidebar"
import { MobileSidebar } from "@/components/mobile-sidebar"

export function Header() {
  const { state, dispatch } = useCart()
  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0)

  return (
    <>
      <header className="border-b border-gray-800 bg-black sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Sidebar */}
            <MobileSidebar />

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-white transform rotate-45"></div>
              <span className="text-xl font-bold text-white">ACME STORE</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-white hover:text-blue-400 font-medium transition-colors">
                Home
              </Link>
              <Link href="/products" className="text-white hover:text-blue-400 font-medium transition-colors">
                All Products
              </Link>
              <Link href="/account" className="text-white hover:text-blue-400 font-medium transition-colors">
                Account
              </Link>
            </nav>

            {/* Cart */}
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => dispatch({ type: "TOGGLE_CART" })}
              >
                <ShoppingCart className="w-5 h-5 text-white" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>
      <CartSidebar />
    </>
  )
}
