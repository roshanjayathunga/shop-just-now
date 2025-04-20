export interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  inventory: number
}

export interface CartItem extends Product {
  quantity: number
}
