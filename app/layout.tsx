import type React from "react"
import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { CartProvider } from "@/lib/cart-context"
import { ErrorBoundary } from "@/components/error-boundary"
import { ReduxProvider } from "@/components/providers/redux-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ACME STORE - Premium Quality Products",
  description: "Discover our curated collection of high-quality products designed for the modern lifestyle",
  keywords: ["ecommerce", "fashion", "accessories", "premium", "quality"],
  authors: [{ name: "ACME STORE" }],
  openGraph: {
    title: "ACME STORE - Premium Quality Products",
    description: "Discover our curated collection of high-quality products designed for the modern lifestyle",
    type: "website",
  },
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <ReduxProvider>
            <CartProvider>{children}</CartProvider>
          </ReduxProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
