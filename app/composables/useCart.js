
import { computed } from 'vue'

export const useCart = () => {
  const items = useState('nova-cart-items', () => [])

  const count = computed(() =>
    items.value.reduce((total, item) => total + item.quantity, 0)
  )

  const addItem = (product) => {
    const existing = items.value.find(item => item.id === product.id)

    if (existing) {
      existing.quantity += 1
    } else {
      items.value.push({
        ...product,
        quantity: 1
      })
    }
  }

  return {
    items,
    count,
    addItem
  }
}
