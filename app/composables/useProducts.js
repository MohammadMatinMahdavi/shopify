import { novaProducts, getProductBySlug } from '~/data/products'

function normalizeSearch(value = '') {
  return String(value)
    .trim()
    .toLocaleLowerCase('fa-IR')
    .replace(/ي/g, 'ی')
    .replace(/ك/g, 'ک')
}

export function filterAndSortProducts(products, filters = {}) {
  const search = normalizeSearch(filters.search)
  const category = String(filters.category || '')
  const sort = String(filters.sort || 'newest')

  const filtered = products.filter((product) => {
    const matchesCategory = !category || product.categorySlug === category
    const searchableText = normalizeSearch([
      product.name,
      product.categoryLabel,
      product.description,
      product.colorName,
    ].join(' '))
    const matchesSearch = !search || searchableText.includes(search)
    return matchesCategory && matchesSearch
  })

  return filtered.sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price
    if (sort === 'price-desc') return b.price - a.price
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
}

export const useProducts = () => ({
  products: novaProducts,
  getProductBySlug,
  filterAndSortProducts,
})
