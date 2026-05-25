import SearchFilters from '../components/SearchFilters'
import ProductCard from '../components/ProductCard'
import { useStore } from '../context/StoreContext'

export default function ProductsPage() {
  const { filteredProducts, loading, error } = useStore()

  return (
    <div className="space-y-6">
      <SearchFilters />

      {loading ? (
        <p className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 text-slate-200">
          Loading products...
        </p>
      ) : error ? (
        <p className="rounded-3xl border border-rose-500/40 bg-rose-950/30 p-6 text-rose-200">
          {error}
        </p>
      ) : filteredProducts.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 text-slate-200">
          No products match your search. Try a different category or keyword.
        </p>
      )}
    </div>
  )
}
