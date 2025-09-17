import Userbase, { type CartItem } from "./auth"

class CartService {
  // Add item to cart
  async addToCart(userId: string, item: CartItem) {
    try {
      const result = await Userbase.addToCart(userId, item)
      return { status: "success", response: result }
    } catch (error: any) {
      return { status: error?.code || "error", response: error }
    }
  }

  // Remove item from cart
  async removeFromCart(userId: string, productId: string) {
    try {
      const result = await Userbase.removeFromCart(userId, productId)
      return { status: "success", response: result }
    } catch (error: any) {
      return { status: error?.code || "error", response: error }
    }
  }

  // Get user cart
  async getCart(userId: string) {
    try {
      const user = await Userbase.getUser(userId)
      const cart: CartItem[] = user.cart ? JSON.parse(user.cart) : []
      return { status: "success", response: cart }
    } catch (error: any) {
      return { status: error?.code || "error", response: error }
    }
  }

  // Clear cart
  async clearCart(userId: string) {
    try {
      const result = await Userbase.updateCart(userId, [])
      return { status: "success", response: result }
    } catch (error: any) {
      return { status: error?.code || "error", response: error }
    }
  }

  // Update item quantity
  async updateQuantity(userId: string, productId: string, quantity: number) {
    try {
      const user = await Userbase.getUser(userId)
      const currentCart: CartItem[] = user.cart ? JSON.parse(user.cart) : []

      const itemIndex = currentCart.findIndex((item) => item.productId === productId)
      if (itemIndex > -1) {
        if (quantity <= 0) {
          currentCart.splice(itemIndex, 1)
        } else {
          currentCart[itemIndex].quantity = quantity
        }

        const result = await Userbase.updateCart(userId, currentCart)
        return { status: "success", response: result }
      } else {
        return { status: "error", response: "Item not found in cart" }
      }
    } catch (error: any) {
      return { status: error?.code || "error", response: error }
    }
  }
}

const cartService = new CartService()
export default cartService
