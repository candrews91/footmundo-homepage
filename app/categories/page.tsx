import { Suspense } from "react"

interface WordPressCategory {
  id: number
  name: string
  slug: string
  count: number
}

async function fetchCategories() {
  try {
    const response = await fetch("https://www.footmundo.co.uk/api/wordpress?endpoint=categories&per_page=100", {
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch categories")
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

async function CategoryList() {
  const categories: WordPressCategory[] = await fetchCategories()

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Available WordPress Categories</h1>
      <div className="bg-card rounded-lg border p-6">
        <p className="text-muted-foreground mb-4">
          These are all the categories available on footmundo.co.uk. Use the slug values in your code.
        </p>
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.id} className="border-b pb-4 last:border-b-0">
              <div className="font-semibold text-lg">{category.name}</div>
              <div className="text-sm text-muted-foreground">
                Slug: <code className="bg-muted px-2 py-1 rounded">{category.slug}</code>
              </div>
              <div className="text-sm text-muted-foreground">Posts: {category.count}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function CategoriesPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-12">Loading categories...</div>}>
      <CategoryList />
    </Suspense>
  )
}
