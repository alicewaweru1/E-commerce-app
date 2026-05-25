import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

const initialForm = {
  fullName: '',
  address: '',
  city: '',
  cardNumber: '',
}

export default function CheckoutPage() {
  const { cart, subtotal, clearCart, user } = useStore()
  const [form, setForm] = useState(initialForm)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!form.fullName.trim() || !form.address.trim() || !form.city.trim() || !form.cardNumber.trim()) {
      setError('All checkout fields are required.')
      setMessage('')
      return
    }

    setError('')
    setMessage(`Thanks ${user?.name || 'friend'}! Your order is confirmed and your cart has been cleared.`)
    clearCart()
    setForm(initialForm)
  }

  if (cart.length === 0) {
    return (
      <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8 text-center text-slate-200">
        <p className="text-lg font-semibold text-white">Your cart is empty.</p>
        <p className="mt-2">Add products before checking out.</p>
        <Link to="/products" className="mt-4 inline-block text-emerald-300">
          Browse products
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-6">
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Checkout</p>
        <h1 className="mt-3 text-3xl font-bold text-white">Confirm your details</h1>
        <p className="mt-3 text-slate-200">
          Logged in as <span className="font-semibold text-white">{user?.email}</span>
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block text-sm font-semibold text-slate-200">
            Full name
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-emerald-400"
            />
          </label>

          <label className="block text-sm font-semibold text-slate-200">
            Address
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-emerald-400"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-slate-200">
              City
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-emerald-400"
              />
            </label>

            <label className="block text-sm font-semibold text-slate-200">
              Card number
              <input
                name="cardNumber"
                value={form.cardNumber}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-emerald-400"
              />
            </label>
          </div>

          {error ? <p className="text-sm text-rose-300">{error}</p> : null}
          {message ? <p className="text-sm text-emerald-300">{message}</p> : null}

          <button
            type="submit"
            className="w-full rounded-full bg-emerald-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400"
          >
            Place order
          </button>
        </form>
      </div>

      <aside className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-6">
        <h2 className="text-xl font-bold text-white">Order total</h2>
        <p className="mt-2 text-sm text-slate-200">Subtotal: ${subtotal.toFixed(2)}</p>
        <p className="mt-1 text-sm text-slate-200">Shipping: Free</p>
        <p className="mt-4 text-3xl font-bold text-white">${subtotal.toFixed(2)}</p>
        <p className="mt-4 text-sm text-slate-300">
          Your items are protected with a secure checkout flow and only accessible after login.
        </p>
      </aside>
    </div>
  )
}
