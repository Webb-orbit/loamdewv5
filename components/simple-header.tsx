"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ShoppingCart, Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { CartSidebar } from "@/components/cart-sidebar"
import { cn } from "@/lib/utils"

export function SimpleHeader() {
  const { state, dispatch } = useCart()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "All Products", href: "/products" },
    { name: "Account", href: "/auth/login" },
  ]

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full border-b transition-all duration-300",
          isScrolled ? "bg-black/95 backdrop-blur-md border-gray-800 shadow-lg" : "bg-black border-gray-800",
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-6 h-6 bg-white transform rotate-45 transition-transform group-hover:rotate-90 duration-300"></div>
              <span className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                ACME STORE
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-blue-400 font-medium transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative text-white hover:text-blue-400 transition-colors"
              onClick={() => dispatch({ type: "TOGGLE_CART" })}
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {itemCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed left-0 top-0 h-full w-80 bg-black border-r border-gray-800 z-50 transform transition-transform duration-300 md:hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-white transform rotate-45"></div>
                <span className="text-lg font-bold text-white">ACME STORE</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-5 h-5 text-white" />
              </Button>
            </div>
            <nav className="p-4">
              <div className="space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center px-3 py-3 rounded-lg text-white hover:bg-gray-800 transition-colors"
                  >
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </>
      )}

      <CartSidebar />
    </>
  )
}
