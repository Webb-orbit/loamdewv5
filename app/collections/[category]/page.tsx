import { SimpleHeader } from "@/components/simple-header"
import { CollectionGrid } from "@/components/collection-grid"

interface CollectionPageProps {
  params: {
    category: string
  }
}

export default function CollectionPage({ params }: CollectionPageProps) {
  const categoryName = params.category.charAt(0).toUpperCase() + params.category.slice(1)

  return (
    <div className="min-h-screen bg-black">
      <SimpleHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{categoryName}</h1>
          <p className="text-gray-400">Browse our {params.category} collection</p>
        </div>
        <CollectionGrid category={params.category} />
      </main>
    </div>
  )
}
