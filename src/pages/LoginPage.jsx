import { useEffect, useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

export default function LoginPage() {
  const { user, login } = useStore()
  const location = useLocation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (user) {
      setError('')
    }
  }, [user])

  if (user) {
    const redirectTo = location.state?.from || '/checkout'
    return <Navigate to={redirectTo} replace />
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!name.trim() || !email.trim()) {
      setError('Please enter both your name and email.')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }

    setError('')
    login(name.trim(), email.trim())
  }

  return (
    <div className="mx-auto max-w-xl rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/40">
      <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Secure access</p>
      <h1 className="mt-3 text-3xl font-bold text-white">Login to continue</h1>
      <p className="mt-3 text-slate-200">
        Sign in to unlock the checkout page and complete your order.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <label className="block text-sm font-semibold text-slate-200">
          Full name
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Alex Johnson"
            className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-emerald-400"
          />
        </label>

        <label className="block text-sm font-semibold text-slate-200">
          Email address
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="alex@example.com"
            className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-emerald-400"
          />
        </label>

        {error ? <p className="text-sm text-rose-300">{error}</p> : null}

        <button
          type="submit"
          className="w-full rounded-full bg-emerald-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400"
        >
          Login and continue
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-300">
        Want to keep browsing? <Link to="/products" className="text-emerald-300">Return to products</Link>
      </p>
    </div>
  )
}
