import { Client, Databases, ID, Query } from "appwrite"
import AppwriteConf from "./appwriteconfig"

export interface ProductDocument {
  name: string
  shortdes: string
  description: string
  photos: string // Array stored as string in Appwrite
  dimension: string
  amount: number
  discount?: number
  instock: boolean
}

class ProductService {
   client: Client
   databases: Databases

  constructor() {
    this.client = new Client().setEndpoint(AppwriteConf.appwriteEndpoint).setProject(AppwriteConf.projectId)

    this.databases = new Databases(this.client)
  }

  async createProduct(product: ProductDocument) {
    return await this.databases.createDocument(
      AppwriteConf.appwriteBase,
      AppwriteConf.productCollid,
      ID.unique(),
      product,
    )
  }

  // Get single product
  async getProduct(docId: string) {
    return await this.databases.getDocument(AppwriteConf.appwriteBase, AppwriteConf.productCollid, docId)
  }

  // Get all products
  async getAllProducts() {
    return await this.databases.listDocuments(AppwriteConf.appwriteBase, AppwriteConf.productCollid,[])
  }

  async getInStockProducts() {
    return await this.databases.listDocuments(AppwriteConf.appwriteBase, AppwriteConf.productCollid, [
      Query.equal("instock", true),
    ])
  }

  async searchProducts(searchTerm: string) {
    return await this.databases.listDocuments(AppwriteConf.appwriteBase, AppwriteConf.productCollid, [
      Query.search("name", searchTerm),
    ])
  }

  async updateProduct(docId: string, product: Partial<ProductDocument>) {
    return await this.databases.updateDocument(AppwriteConf.appwriteBase, AppwriteConf.productCollid, docId, product)
  }

  async deleteProduct(docId: string) {
    return await this.databases.deleteDocument(AppwriteConf.appwriteBase, AppwriteConf.productCollid, docId)
  }

  async updateStock(docId: string, instock: boolean) {
    return await this.databases.updateDocument(AppwriteConf.appwriteBase, AppwriteConf.productCollid, docId, {
      instock,
    })
  }
}

const Productbase = new ProductService()
export default Productbase
