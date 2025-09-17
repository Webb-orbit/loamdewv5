# ACME STORE - E-commerce Application

A modern e-commerce application built with Next.js 14, TypeScript, and Appwrite backend services.

## Features

- 🛍️ Product catalog with categories
- 🛒 Shopping cart functionality
- 👤 User authentication (Email/Password, Phone OTP, OAuth2)
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS
- 🔐 Secure backend with Appwrite

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Appwrite account (cloud or self-hosted)

## Setup Instructions

### 1. Clone and Install Dependencies

\`\`\`bash
npm install
# or
yarn install
\`\`\`

### 2. Environment Variables

1. Copy the environment template:
\`\`\`bash
cp .env.example .env.local
\`\`\`

2. Update `.env.local` with your Appwrite configuration:
\`\`\`env
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_appwrite_project_id
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_BASE_ID=your_database_id
NEXT_PUBLIC_ORDER_COLLECTION_ID=your_order_collection_id
NEXT_PUBLIC_PRODUCT_COLLECTION_ID=your_product_collection_id
NEXT_PUBLIC_USER_COLL_ID=your_user_collection_id
NEXT_PUBLIC_REDIRECT_URI=http://localhost:3000/auth/callback
\`\`\`

### 3. Appwrite Backend Setup

#### Create Appwrite Project
1. Go to [Appwrite Console](https://cloud.appwrite.io)
2. Create a new project
3. Copy the Project ID to your `.env.local`

#### Create Database and Collections

1. **Create Database:**
   - Go to Databases → Create Database
   - Copy the Database ID to `NEXT_PUBLIC_BASE_ID`

2. **Create Collections:**

   **Users Collection:**
   - Name: `users`
   - Attributes:
     - `name` (string, required)
     - `address` (string)
     - `ordercount` (integer, default: 0)
     - `cart` (string, array) - JSON string of cart items
     - `zipcode` (integer)
     - `oauthid` (string)

   **Products Collection:**
   - Name: `products`
   - Attributes:
     - `name` (string, required)
     - `description` (string)
     - `price` (float, required)
     - `category` (string)
     - `image` (string) - URL to product image
     - `stock` (integer, default: 0)

   **Orders Collection:**
   - Name: `orders`
   - Attributes:
     - `userId` (string, required)
     - `products` (string, array) - JSON string of ordered products
     - `total` (float, required)
     - `status` (string, default: "pending")
     - `createdAt` (datetime)

3. **Set Permissions:**
   - For each collection, configure read/write permissions
   - Recommended: Users can read/write their own documents

#### Configure Authentication (Optional)
1. Go to Auth → Settings
2. Enable desired authentication methods:
   - Email/Password
   - Phone (for OTP)
   - OAuth2 providers (Google, etc.)

### 4. Run the Application

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

\`\`\`
├── app/                    # Next.js App Router
│   ├── auth/              # Authentication pages
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout process
│   ├── collections/       # Product categories
│   └── libapi/           # Appwrite API services
├── components/            # Reusable UI components
├── lib/                  # Utilities and contexts
└── hooks/                # Custom React hooks
\`\`\`

## API Services

- `app/libapi/auth.ts` - User authentication and management
- `app/libapi/oauth.ts` - OAuth2 and session management
- `app/libapi/product_api.ts` - Product data operations
- `app/libapi/appwriteconfig.ts` - Appwrite configuration

## Technologies Used

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **Backend:** Appwrite (BaaS)
- **State Management:** Redux Toolkit, React Context
- **UI Components:** Custom components with shadcn/ui
- **Authentication:** Appwrite Auth (Email, Phone, OAuth2)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
