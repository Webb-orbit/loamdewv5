import Orderbase, { type OrderItem } from "./order_api"

class OrderActions {
  async createOrder(products: string[], count: OrderItem[], userid: string) {
    try {
      const create = await Orderbase.createOrder(products, userid, count)
      return { status: "success", response: create }
    } catch (error: any) {
      return { status: error?.code || "error", response: error }
    }
  }

  async deleteOrder(orderid: string) {
    try {
      const deleted = await Orderbase.deleteOrder(orderid)
      return { status: "success", response: deleted }
    } catch (error: any) {
      return { status: error?.code || "error", response: error }
    }
  }

  async getUserOrders(userid: string) {
    try {
      const orders = await Orderbase.getOrdersByUser(userid)
      return { status: "success", response: orders }
    } catch (error: any) {
      return { status: error?.code || "error", response: error }
    }
  }

  async updateOrderStatus(orderid: string, progress: string, trackingid?: string) {
    try {
      const updated = await Orderbase.updateOrderStatus(orderid, progress, trackingid)
      return { status: "success", response: updated }
    } catch (error: any) {
      return { status: error?.code || "error", response: error }
    }
  }

  async getAllOrders() {
    try {
      const orders = await Orderbase.getAllOrders()
      return { status: "success", response: orders }
    } catch (error: any) {
      return { status: error?.code || "error", response: error }
    }
  }
}

const orderbust = new OrderActions()
export default orderbust
