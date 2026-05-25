import { Link, useNavigate, useParams } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products, addToCart } = useStore()

  const product = products.find((item) => item.id === Number(id))

  if (!product) {
    return (
      <div className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 text-slate-200">
        <p>Product not found.</p>
        <Link to="/products" className="text-emerald-300">Back to products</Link>
      </div>
    )
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-6">
        <img src={product.image} alt={product.title} className="mx-auto h-80 object-contain" />
      </div>

      <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-6">
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">{product.category}</p>
        <h1 className="mt-3 text-3xl font-bold text-white">{product.title}</h1>
        <p className="mt-4 text-lg text-slate-200">{product.description}</p>
        <div className="mt-5 flex items-center justify-between">
          <p className="text-2xl font-bold text-white">${product.price.toFixed(2)}</p>
          <p className="text-amber-300">★ {product.rating.rate} ({product.rating.count} reviews)</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              addToCart(product)
              navigate('/cart')
            }}
            className="rounded-full bg-emerald-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400"
          >
            Add to cart
          </button>
          <Link
            to="/products"
            className="rounded-full border border-slate-700 px-5 py-3 font-semibold text-white transition hover:border-emerald-400"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
