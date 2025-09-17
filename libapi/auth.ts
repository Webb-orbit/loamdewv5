import { Client, Databases, Account, ID } from "appwrite"
import AppwriteConf from "./appwriteconfig"

export interface UserDocument {
  name: string
  address: string
  ordercount: number
  cart: string // Array stored as string in Appwrite yo
  zipcode: string
  oauthid: string
}

export interface CartItem {
  productId: string
  quantity: number
  name: string
  amount: number
}

class UserService {
  private client: Client
  private databases: Databases

  constructor() {
    this.client = new Client().setEndpoint(AppwriteConf.appwriteEndpoint).setProject(AppwriteConf.projectId)

    this.databases = new Databases(this.client)
  }

  // Create a new user
  async createUser(user: UserDocument) {
    return await this.databases.createDocument(AppwriteConf.appwriteBase, AppwriteConf.userCollid, ID.unique(), user)
  }

  // Get user by ID
  async getUser(docId: string) {
    return await this.databases.getDocument(AppwriteConf.appwriteBase, AppwriteConf.userCollid, docId)
  }

  async getUserByOAuthId(oauthId: string) {
    return await this.databases.listDocuments(AppwriteConf.appwriteBase, AppwriteConf.userCollid, [
      `oauthid=${oauthId}`,
    ])
  }

  // Update user details
  async updateUser(docId: string, user: Partial<UserDocument>) {
    return await this.databases.updateDocument(AppwriteConf.appwriteBase, AppwriteConf.userCollid, docId, user)
  }

  async updateCart(docId: string, cart: CartItem[]) {
    return await this.databases.updateDocument(AppwriteConf.appwriteBase, AppwriteConf.userCollid, docId, {
      cart: JSON.stringify(cart),
    })
  }

  async addToCart(docId: string, item: CartItem) {
    const user = await this.getUser(docId)
    const currentCart: CartItem[] = user.cart ? JSON.parse(user.cart) : []

    const existingItemIndex = currentCart.findIndex((cartItem) => cartItem.productId === item.productId)

    if (existingItemIndex > -1) {
      currentCart[existingItemIndex].quantity += item.quantity
    } else {
      currentCart.push(item)
    }

    return await this.updateCart(docId, currentCart)
  }

  async removeFromCart(docId: string, productId: string) {
    const user = await this.getUser(docId)
    const currentCart: CartItem[] = user.cart ? JSON.parse(user.cart) : []
    const updatedCart = currentCart.filter((item) => item.productId !== productId)

    return await this.updateCart(docId, updatedCart)
  }

  // Delete user by ID
  async deleteUser(docId: string) {
    return await this.databases.deleteDocument(AppwriteConf.appwriteBase, AppwriteConf.userCollid, docId)
  }
}

class AuthService {
  private client: Client
  private account: Account

  constructor() {
    this.client = new Client().setEndpoint(AppwriteConf.appwriteEndpoint).setProject(AppwriteConf.projectId)

    this.account = new Account(this.client)
  }

  // Sign up with email and password
  async signUpWithEmail(email: string, password: string, name: string) {
    try {
      const response = await this.account.create(ID.unique(), email, password, name)
      return response
    } catch (error) {
      console.error("Error signing up with email:", error)
      throw error
    }
  }

  // Login with email and password
  async loginWithEmail(email: string, password: string) {
    try {
      const session = await this.account.createEmailSession(email, password)
      return session
    } catch (error) {
      console.error("Error logging in with email:", error)
      throw error
    }
  }

  // Send email OTP
  async sendEmailOTP(email: string) {
    try {
      const token = await this.account.createMagicURLSession(ID.unique(), email)
      return token
    } catch (error) {
      console.error("Error sending email OTP:", error)
      throw error
    }
  }

  // Login with email OTP
  async loginWithEmailOTP(userId: string, secret: string) {
    try {
      const session = await this.account.updateMagicURLSession(userId, secret)
      return session
    } catch (error) {
      console.error("Error verifying email OTP:", error)
      throw error
    }
  }

  // Send phone OTP
  async sendPhoneOTP(phone: string) {
    try {
      const token = await this.account.createPhoneToken(ID.unique(), phone)
      return token
    } catch (error) {
      console.error("Error sending phone OTP:", error)
      throw error
    }
  }

  // Login with phone OTP
  async loginWithPhoneOTP(userId: string, secret: string) {
    try {
      const session = await this.account.createSession(userId, secret)
      return session
    } catch (error) {
      console.error("Error logging in with phone OTP:", error)
      throw error
    }
  }

  // OAuth2 login (Google)
  async loginWithGoogle() {
    try {
      this.account.createOAuth2Session("google", AppwriteConf.redirectURI)
    } catch (error) {
      console.error("Error with Google OAuth:", error)
      throw error
    }
  }

  // Get current session
  async getSession() {
    try {
      const session = await this.account.get()
      return session
    } catch (error) {
      console.error("Error fetching session:", error)
      throw error
    }
  }

  // Logout
  async logout() {
    try {
      await this.account.deleteSession("current")
      console.log("User logged out")
    } catch (error) {
      console.error("Error logging out:", error)
      throw error
    }
  }
}

const Userbase = new UserService()
const Authbase = new AuthService()
export { Authbase }
export default Userbase
