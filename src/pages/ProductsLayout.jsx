import { Outlet } from 'react-router-dom'

export default function ProductsLayout() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 to-slate-800 p-6">
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Catalog</p>
        <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Browse your favorite products</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-300 sm:text-base">
          Search, filter, and explore products with instant cart updates and a smooth shopping experience.
        </p>
      </div>

      <Outlet />
    </div>
  )
}
