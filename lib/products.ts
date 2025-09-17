import Productbase from "@/app/libapi/product_api"

export interface Product {
  $id: string
  name: string
  shortdes: string
  description: string
  photos: string // JSON string array from Appwrite
  dimension: string // JSON string array from Appwrite
  amount: number
  discount?: number
  instock: boolean
  category?: string // Derived from shortdes or separate field
  colors?: string[] // Can be derived from dimension or separate field
  price?: string // Formatted from amount
}

// Convert Appwrite document to Product interface
export function convertToProduct(doc: any): Product {
  const photos = typeof doc.photos === "string" ? JSON.parse(doc.photos) : doc.photos || []
  const dimensions = typeof doc.dimension === "string" ? JSON.parse(doc.dimension) : doc.dimension || []

  return {
    $id: doc.$id,
    name: doc.name,
    shortdes: doc.shortdes,
    description: doc.description,
    photos: photos,
    dimension: dimensions,
    amount: doc.amount,
    discount: doc.discount,
    instock: doc.instock,
    category: doc.category || "general",
    price: `$${doc.amount.toFixed(2)} USD`,
  }
}

// Get all products from Appwrite
export async function getAllProducts(): Promise<Product[]> {
  try {
    const response = await Productbase.getAllProducts()
    return response.documents.map(convertToProduct)
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

// Get products by category
export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const products = await getAllProducts()
    return products.filter(
      (product) =>
        product.category?.toLowerCase() === category.toLowerCase() ||
        product.shortdes?.toLowerCase().includes(category.toLowerCase()),
    )
  } catch (error) {
    console.error("Error fetching products by category:", error)
    return []
  }
}

// Get single product
export async function getProductById(id: string): Promise<Product | null> {
  try {
    const doc = await Productbase.getProduct(id)
    return convertToProduct(doc)
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

// Get in-stock products
export async function getInStockProducts(): Promise<Product[]> {
  try {
    const response = await Productbase.getInStockProducts()
    return response.documents.map(convertToProduct)
  } catch (error) {
    console.error("Error fetching in-stock products:", error)
    return []
  }
}
