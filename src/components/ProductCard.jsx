import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

export default function ProductCard({ product }) {
  const { addToCart } = useStore()

  return (
    <article className="flex h-full flex-col rounded-3xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg shadow-slate-950/40 transition duration-200 hover:-translate-y-1 hover:border-emerald-400">
      <div className="flex h-48 items-center justify-center rounded-2xl bg-white/5 p-3">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-40 w-full object-contain"
        />
      </div>

      <div className="mt-4 flex flex-1 flex-col gap-3">
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">{product.category}</p>
        <h3 className="text-base font-semibold text-white">{product.title}</h3>
        <p className="text-sm text-slate-300 line-clamp-3">{product.description}</p>

        <div className="mt-auto flex items-center justify-between gap-4">
          <div>
            <p className="text-lg font-bold text-white">${product.price.toFixed(2)}</p>
            <p className="text-sm text-amber-300">★ {product.rating.rate}</p>
          </div>

          <div className="flex flex-col gap-2">
            <Link
              to={`/products/${product.id}`}
              className="rounded-full border border-slate-700 px-3 py-2 text-center text-sm font-semibold text-slate-100 transition hover:border-emerald-400"
            >
              Details
            </Link>
            <button
              type="button"
              onClick={() => addToCart(product)}
              className="rounded-full bg-emerald-500 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
