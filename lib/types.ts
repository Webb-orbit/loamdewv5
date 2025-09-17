export interface Product {
  id: number
  name: string
  price: string
  description: string
  images: string[]
  category: string
  sizes?: string[]
  colors?: string[]
  inStock: boolean
  featured?: boolean
}

export interface CartItem {
  id: number
  name: string
  price: string
  image: string
  quantity: number
  size?: string
  color?: string
}

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  addresses: Address[]
}

export interface Address {
  id: string
  type: "home" | "work" | "other"
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault: boolean
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  createdAt: string
  shippingAddress: Address
}
