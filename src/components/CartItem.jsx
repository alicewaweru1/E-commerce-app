import { useStore } from '../context/StoreContext'

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useStore()

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-4 sm:flex sm:items-center sm:justify-between">
      <div className="flex gap-4">
        <img src={item.image} alt={item.title} className="h-24 w-24 rounded-2xl object-contain" />
        <div>
          <p className="font-semibold text-white">{item.title}</p>
          <p className="text-sm text-slate-300">${item.price.toFixed(2)} each</p>
          <p className="mt-2 text-sm text-emerald-300">
            Subtotal: ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3 sm:mt-0">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => updateQuantity(item.id, -1)}
            className="rounded-full border border-slate-700 px-3 py-1 text-lg text-white"
          >
            −
          </button>
          <span className="min-w-8 text-center text-white">{item.quantity}</span>
          <button
            type="button"
            onClick={() => updateQuantity(item.id, 1)}
            className="rounded-full border border-slate-700 px-3 py-1 text-lg text-white"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={() => removeFromCart(item.id)}
          className="rounded-full border border-rose-500 px-3 py-2 text-sm font-semibold text-rose-200"
        >
          Remove
        </button>
      </div>
    </div>
  )
}
