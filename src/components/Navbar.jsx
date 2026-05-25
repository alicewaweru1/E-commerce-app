import { Link, NavLink } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

const linkClasses = ({ isActive }) =>
  isActive
    ? 'rounded-full bg-slate-800 px-3 py-2 text-sm font-semibold text-white'
    : 'rounded-full px-3 py-2 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white'

export default function Navbar() {
  const { cartCount, user, logout } = useStore()

  return (
    <header className="border-b border-slate-800 bg-slate-950/95">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <Link to="/" className="text-lg font-bold tracking-tight text-white">
            LunaCart
          </Link>
          <p className="text-sm text-slate-400">Modern shopping made simple</p>
        </div>

        <nav className="flex flex-wrap items-center gap-2">
          <NavLink to="/" className={linkClasses}>Home</NavLink>
          <NavLink to="/products" className={linkClasses}>Products</NavLink>
          <NavLink to="/cart" className={linkClasses}>
            Cart ({cartCount})
          </NavLink>
          <NavLink to="/checkout" className={linkClasses}>Checkout</NavLink>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3 text-sm text-slate-200">
              <span>Hello, {user.name}</span>
              <button
                type="button"
                onClick={logout}
                className="rounded-full border border-slate-700 px-3 py-2 font-semibold text-slate-100 transition hover:border-rose-500 hover:text-rose-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
