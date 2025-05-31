export interface Header {
  name: string
  text: string
  displayProperty?: string
}

interface Master {
  id?: number
  name: string
}


export interface Product extends Master {
  price: number
  remaining: number
}


export interface OrderDetail {
  productId: number,
  price: number,
  quantity: number
  amount: number,
  isValid: boolean
}