const PREFIX = 'nova-cart:v1'

function key(owner = 'guest') { return `${PREFIX}:${owner || 'guest'}` }

function normalize(item) {
  if (!item || (item.id == null && !item.slug)) return null
  return {
    id: item.id ?? item.slug,
    slug: item.slug || String(item.id),
    name: String(item.name || 'محصول NOVA'),
    price: Math.max(0, Number(item.price) || 0),
    image: String(item.image || ''),
    category: String(item.category || ''),
    categoryLabel: String(item.categoryLabel || item.category || ''),
    color: String(item.color || '#e7e3db'),
    colorName: String(item.colorName || ''),
    quantity: Math.max(1, Math.floor(Number(item.quantity) || 1)),
  }
}

// Swap this storage adapter for API-backed load/save methods when a backend is added.
// Server-side order creation must always validate price, availability and discounts again.
export function loadCart(owner = 'guest') {
  if (!import.meta.client) return []
  try {
    const raw = localStorage.getItem(key(owner))
    const value = raw ? JSON.parse(raw) : []
    return Array.isArray(value) ? value.map(normalize).filter(Boolean) : []
  } catch { return [] }
}

export function clearStoredCart(owner = 'guest') {
  if (!import.meta.client) return
  try { localStorage.removeItem(key(owner)) } catch {}
}

export function saveCart(owner = 'guest', items = []) {
  if (!import.meta.client) return
  try { localStorage.setItem(key(owner), JSON.stringify(items.map(normalize).filter(Boolean))) }
  catch (error) { console.warn('NOVA cart could not be persisted in this browser.', error) }
}

export function mergeCartItems(primary = [], incoming = []) {
  const merged = new Map()
  for (const raw of [...primary, ...incoming]) {
    const item = normalize(raw)
    if (!item) continue
    const id = String(item.id)
    const existing = merged.get(id)
    if (existing) existing.quantity += item.quantity
    else merged.set(id, item)
  }
  return [...merged.values()]
}
