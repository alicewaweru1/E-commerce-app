# LunaCart

A React-based e-commerce storefront built with Vite, React Router, Tailwind CSS, and the Context API.

## Features

- Home page with featured products
- Product catalog with search and filtering
- Dynamic product detail pages
- Cart management with quantity updates
- Protected checkout page for authenticated users
- Login page that redirects signed-in users
- Responsive, modern UI with Tailwind styling

## Project structure

- `src/components/` — reusable UI components such as the navbar, search filters, product card, and cart item
- `src/pages/` — route-specific pages for the homepage, products, product details, cart, login, and checkout
- `src/context/StoreContext.jsx` — global state for products, cart, user authentication, and filters

## Technical stack

- React 19
- React Router DOM
- Tailwind CSS 4
- Vite

## Setup

```bash
npm install
```

## Run locally

```bash
npm run dev
```

## Build for production

```bash
npm run build
```

## Data source

Product data is fetched from `https://fakestoreapi.com/products`.

## Notes

- The checkout page is protected and redirects unauthenticated users to `/login`.
- The login page redirects authenticated users to `/checkout`.
- Search and category filters are controlled by React state.
