import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const StoreContext = createContext()

const readStorage = (key, fallback) => {
  if (typeof window === 'undefined') return fallback

  try {
    const value = window.localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

export function StoreProvider({ children }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [cart, setCart] = useState(() => readStorage('cart', []))
  const [user, setUser] = useState(() => readStorage('user', null))
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('featured')

  useEffect(() => {
    window.localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    if (user) {
      window.localStorage.setItem('user', JSON.stringify(user))
    } else {
      window.localStorage.removeItem('user')
    }
  }, [user])

  useEffect(() => {
    const controller = new AbortController()

    const loadProducts = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await fetch('https://fakestoreapi.com/products', {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('Unable to fetch products')
        }

        const data = await response.json()
        setProducts(data)
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message)
        }
      } finally {
        setLoading(false)
      }
    }

    loadProducts()

    return () => controller.abort()
  }, [])

  const categories = useMemo(() => {
    const categorySet = new Set(products.map((product) => product.category))
    return ['all', ...Array.from(categorySet)]
  }, [products])

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    const bySearch = products.filter((product) => {
      if (!normalizedSearch) return true
      return (
        product.title.toLowerCase().includes(normalizedSearch) ||
        product.description.toLowerCase().includes(normalizedSearch)
      )
    })

    const byCategory =
      selectedCategory === 'all'
        ? bySearch
        : bySearch.filter((product) => product.category === selectedCategory)

    const sorted = [...byCategory]

    if (sortBy === 'price-low') {
      sorted.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      sorted.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'rating') {
      sorted.sort((a, b) => b.rating.rate - a.rating.rate)
    }

    return sorted
  }, [products, searchTerm, selectedCategory, sortBy])

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id)

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }

      return [...currentCart, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (productId, amount) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + amount } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const removeFromCart = (productId) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== productId))
  }

  const clearCart = () => setCart([])

  const login = (name, email) => {
    setUser({ name, email })
  }

  const logout = () => {
    setUser(null)
  }

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  const value = {
    products,
    loading,
    error,
    cart,
    cartCount,
    subtotal,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    categories,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    user,
    login,
    logout,
    filteredProducts,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const context = useContext(StoreContext)

  if (!context) {
    throw new Error('useStore must be used inside StoreProvider')
  }

  return context
}
