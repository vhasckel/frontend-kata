import { 
  Product, 
  CreateProduct, 
  CreateProductResponse,
  CartItem, 
  CartResponse,
  CartSummaryResponse,
  AddToCart, 
  ApplyCoupon, 
  CartSummary,
  ProductSchema,
  CreateProductSchema,
  CreateProductResponseSchema,
  CartResponseSchema,
  CartSummaryResponseSchema,
  AddToCartSchema,
  ApplyCouponSchema
} from './schemas'
import { API_BASE_URL } from './config'

class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message)
    this.name = 'ApiError'
  }
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
  schema?: { parse: (data: unknown) => T }
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  const response = await fetch(url, {
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
    },
    ...options,
  })

  if (!response.ok) {
    throw new ApiError(`HTTP ${response.status}: ${response.statusText}`, response.status)
  }

  const data = await response.json()
  
  if (schema) {
    return schema.parse(data)
  }
  
  return data
}

export const productService = {
  async getProducts(): Promise<Product[]> {
    const products = await apiRequest<Product[]>('/api/produtos')
    return products.map(product => ProductSchema.parse(product))
  },

  async getProduct(id: number): Promise<Product> {
    const product = await apiRequest<Product>(`/api/produtos/${id}`)
    return ProductSchema.parse(product)
  },

  async createProduct(productData: CreateProduct): Promise<Product> {
    const validatedData = CreateProductSchema.parse(productData)
    const response = await apiRequest<CreateProductResponse>('/api/produtos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedData),
    })
    const validatedResponse = CreateProductResponseSchema.parse(response)
    return validatedResponse.produto
  },
}

export const cartService = {
  async getCart(userId: string = 'user-123'): Promise<CartItem[]> {
    const response = await apiRequest<CartResponse>('/api/carrinho', {
      headers: {
        'x-user-id': userId,
      },
    })
    const validatedResponse = CartResponseSchema.parse(response)
    return validatedResponse.carrinho.produtos
  },

  async addToCart(cartData: AddToCart, userId: string = 'user-123'): Promise<void> {
    const validatedData = AddToCartSchema.parse(cartData)
    await apiRequest('/api/carrinho', {
      method: 'POST',
      headers: {
        'x-user-id': userId,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedData),
    })
  },

  async removeFromCart(productId: number, userId: string = 'user-123'): Promise<void> {
    await apiRequest(`/api/carrinho/${productId}`, {
      method: 'DELETE',
      headers: {
        'x-user-id': userId,
      },
    })
  },

  async applyCoupon(couponData: ApplyCoupon, userId: string = 'user-123'): Promise<void> {
    const validatedData = ApplyCouponSchema.parse(couponData)
    await apiRequest('/api/carrinho/cupom', {
      method: 'POST',
      headers: {
        'x-user-id': userId,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedData),
    })
  },

  async getCartSummary(userId: string = 'user-123'): Promise<CartSummary> {
    const response = await apiRequest<CartSummaryResponse>('/api/carrinho/resumo', {
      headers: {
        'x-user-id': userId,
      },
    })
    const validatedResponse = CartSummaryResponseSchema.parse(response)
    return validatedResponse.resumo
  },
}

export { ApiError }
