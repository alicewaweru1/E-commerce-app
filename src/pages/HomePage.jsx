import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

export default function HomePage() {
  const { products, loading, error, filteredProducts } = useStore()

  const featured = filteredProducts.length ? filteredProducts.slice(0, 3) : products.slice(0, 3)

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 p-8 sm:p-10">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-300">New season drop</p>
          <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
            Discover premium products with a fast, modern shopping flow.
          </h1>
          <p className="mt-4 text-base text-slate-200 sm:text-lg">
            Browse products, search the catalog, manage your cart, and check out securely with a protected login flow.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/products"
              className="rounded-full bg-emerald-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Shop products
            </Link>
            <Link
              to="/cart"
              className="rounded-full border border-slate-700 px-5 py-3 font-semibold text-white transition hover:border-emerald-400"
            >
              View cart
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          { label: 'Products', value: products.length },
          { label: 'Categories', value: new Set(products.map((item) => item.category)).size },
          { label: 'Fast checkout', value: 'Protected' },
        ].map((item) => (
          <div key={item.label} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
            <p className="text-sm text-slate-300">{item.label}</p>
            <p className="mt-2 text-2xl font-bold text-white">{item.value}</p>
          </div>
        ))}
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Featured picks</h2>
          <Link to="/products" className="text-sm font-semibold text-emerald-300">
            View all
          </Link>
        </div>

        {loading ? (
          <p className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 text-slate-200">Loading products...</p>
        ) : error ? (
          <p className="rounded-3xl border border-rose-500/40 bg-rose-950/30 p-6 text-rose-200">{error}</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featured.map((product) => (
              <article
                key={product.id}
                className="rounded-3xl border border-slate-800 bg-slate-900/80 p-4"
              >
                <img src={product.image} alt={product.title} className="mx-auto h-40 object-contain" />
                <h3 className="mt-4 text-lg font-semibold text-white">{product.title}</h3>
                <p className="mt-2 text-sm text-slate-300">${product.price.toFixed(2)}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
