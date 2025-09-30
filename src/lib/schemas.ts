import { z } from 'zod'

export const ProductSchema = z.object({
  id: z.number(),
  nome: z.string(),
  preco: z.number(),
  categoria: z.string().optional(),
})

export const CreateProductSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  preco: z.number().positive('Preço deve ser positivo'),
  categoria: z.string().optional(),
})
export const CartItemSchema = z.object({
  id: z.number(),
  nome: z.string(),
  preco: z.number(),
  categoria: z.string().nullable(),
  quantidade: z.number().positive(),
  total: z.number(),
})

export const AddToCartSchema = z.object({
  produto: z.object({
    id: z.number().positive('ID do produto é obrigatório'),
  }),
  quantidade: z.number().positive('Quantidade deve ser positiva'),
})

export const ApplyCouponSchema = z.object({
  codigoCupom: z.string().min(1, 'Código do cupom é obrigatório'),
})

export const CartSummarySchema = z.object({
  subtotal: z.number(),
  cupom: z.string(),
  desconto: z.number(),
  frete: z.number(),
  total: z.number(),
})

export const CreateProductResponseSchema = z.object({
  mensagem: z.string(),
  produto: ProductSchema,
})

export const CartResponseSchema = z.object({
  mensagem: z.string(),
  carrinho: z.object({
    produtos: z.array(CartItemSchema),
    total: z.number(),
  }),
})

export const CartSummaryResponseSchema = z.object({
  mensagem: z.string(),
  resumo: CartSummarySchema,
})

export const ApiErrorResponseSchema = z.object({
  mensagem: z.string(),
})

export const ApiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  data: z.unknown().optional(),
})

export type Product = z.infer<typeof ProductSchema>
export type CreateProduct = z.infer<typeof CreateProductSchema>
export type CreateProductResponse = z.infer<typeof CreateProductResponseSchema>
export type CartItem = z.infer<typeof CartItemSchema>
export type CartResponse = z.infer<typeof CartResponseSchema>
export type CartSummaryResponse = z.infer<typeof CartSummaryResponseSchema>
export type AddToCart = z.infer<typeof AddToCartSchema>
export type ApplyCoupon = z.infer<typeof ApplyCouponSchema>
export type CartSummary = z.infer<typeof CartSummarySchema>
export type ApiResponse = z.infer<typeof ApiResponseSchema>
