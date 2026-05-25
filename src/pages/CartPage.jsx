import { Link } from 'react-router-dom'
import CartItem from '../components/CartItem'
import { useStore } from '../context/StoreContext'

export default function CartPage() {
  const { cart, subtotal, cartCount } = useStore()

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 to-slate-800 p-6">
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Cart</p>
        <h1 className="mt-3 text-3xl font-bold text-white">Your items ({cartCount})</h1>
      </div>

      {cart.length === 0 ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 text-center text-slate-200">
          <p className="text-lg font-semibold text-white">Your cart is empty.</p>
          <p className="mt-2">Add a few products to begin your shopping journey.</p>
          <Link to="/products" className="mt-4 inline-block text-emerald-300">
            Explore products
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-4">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <aside className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="text-xl font-bold text-white">Order summary</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-200">
              <div className="flex justify-between">
                <span>Items</span>
                <span>{cartCount}</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>
            <Link
              to="/checkout"
              className="mt-6 inline-flex w-full justify-center rounded-full bg-emerald-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Proceed to checkout
            </Link>
          </aside>
        </div>
      )}
    </div>
  )
}
