"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Home, Package, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false)

  const navigationItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "All Products", href: "/products", icon: Package },
    { name: "Account", href: "/account", icon: User },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)} className="text-white">
          <Menu className="w-5 h-5" />
        </Button>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-80 bg-black border-r border-gray-800 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-white transform rotate-45"></div>
            <span className="text-lg font-bold text-white">ACME STORE</span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="w-5 h-5 text-white" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 px-3 py-3 rounded-lg text-white hover:bg-gray-800 transition-colors"
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <p className="text-gray-400 text-sm text-center">© 2024 ACME STORE</p>
        </div>
      </div>
    </>
  )
}
