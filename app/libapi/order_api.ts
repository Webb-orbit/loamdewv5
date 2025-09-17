import { Client, Databases, ID, Query } from "appwrite"
import AppwriteConf from "./appwriteconfig"

export interface OrderDocument {
  products: string // Relationship with products (many-to-many)
  count: string // Array stored as string
  trackingid?: string
  progress?: string
  users: string // Relationship with users (many-to-one)
}

export interface OrderItem {
  productId: string
  quantity: number
  name: string
  amount: number
}

class OrderService {
  private client: Client
  private databases: Databases

  constructor() {
    this.client = new Client().setEndpoint(AppwriteConf.appwriteEndpoint).setProject(AppwriteConf.projectId)

    this.databases = new Databases(this.client)
  }

  // Create a new order
  async createOrder(products: string[], users: string, count: OrderItem[]) {
    return await this.databases.createDocument(AppwriteConf.appwriteBase, AppwriteConf.ordercollid, ID.unique(), {
      products,
      users,
      count: JSON.stringify(count),
      progress: "pending",
      trackingid: "",
    })
  }

  // Get order by ID
  async getOrder(docId: string) {
    return await this.databases.getDocument(AppwriteConf.appwriteBase, AppwriteConf.ordercollid, docId)
  }

  async getOrdersByUser(userId: string) {
    return await this.databases.listDocuments(AppwriteConf.appwriteBase, AppwriteConf.ordercollid, [
      Query.equal("users", userId),
    ])
  }

  async getAllOrders() {
    return await this.databases.listDocuments(AppwriteConf.appwriteBase, AppwriteConf.ordercollid)
  }

  // Update order details (tracking, progress)
  async updateOrder(docId: string, order: Partial<OrderDocument>) {
    return await this.databases.updateDocument(AppwriteConf.appwriteBase, AppwriteConf.ordercollid, docId, order)
  }

  async updateOrderStatus(docId: string, progress: string, trackingid?: string) {
    const updateData: any = { progress }
    if (trackingid) {
      updateData.trackingid = trackingid
    }

    return await this.databases.updateDocument(AppwriteConf.appwriteBase, AppwriteConf.ordercollid, docId, updateData)
  }

  // Delete order by ID
  async deleteOrder(docId: string) {
    return await this.databases.deleteDocument(AppwriteConf.appwriteBase, AppwriteConf.ordercollid, docId)
  }
}

const Orderbase = new OrderService()
export default Orderbase
