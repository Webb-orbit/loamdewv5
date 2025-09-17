const AppwriteConf = {
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string,
  appwriteEndpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string,
  appwriteBase: process.env.NEXT_PUBLIC_BASE_ID as string,
  ordercollid: process.env.NEXT_PUBLIC_ORDER_COLLECTION_ID as string,
  productCollid: process.env.NEXT_PUBLIC_PRODUCT_COLLECTION_ID as string,
  userCollid: process.env.NEXT_PUBLIC_USER_COLL_ID as string,
  redirectURI: process.env.NEXT_PUBLIC_REDIRECT_URI as string,
}

export default AppwriteConf
