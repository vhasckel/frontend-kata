'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { productService, cartService } from '@/lib/services'
import { Product, CartItem, CreateProduct, CartSummary } from '@/lib/schemas'
import { Plus, ShoppingCart, Trash2, Tag } from 'lucide-react'
import { EnvironmentToggle } from '@/components/ui/environment-toggle'

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartSummary, setCartSummary] = useState<CartSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'products' | 'cart'>('products')

  // New product form
  const [newProduct, setNewProduct] = useState<CreateProduct>({
    nome: '',
    preco: 0,
    categoria: '',
  })

  // Coupon form
  const [couponCode, setCouponCode] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [productsData, cartData, summaryData] = await Promise.all([
        productService.getProducts(),
        cartService.getCart(),
        cartService.getCartSummary(),
      ])
      setProducts(productsData)
      setCartItems(cartData)
      setCartSummary(summaryData)
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const createdProduct = await productService.createProduct(newProduct)
      setNewProduct({ nome: '', preco: 0, categoria: '' })
      setProducts(prev => [...prev, createdProduct])
    } catch (error) {
      console.error('Erro ao criar produto:', error)
      await loadData()
    }
  }

  const handleAddToCart = async (productId: number) => {
    try {
      await cartService.addToCart({
        produto: { id: productId },
        quantidade: 1,
      })
      const [cartData, summaryData] = await Promise.all([
        cartService.getCart(),
        cartService.getCartSummary(),
      ])
      setCartItems(cartData)
      setCartSummary(summaryData)
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error)
    }
  }

  const handleRemoveFromCart = async (productId: number) => {
    try {
      await cartService.removeFromCart(productId)
      const [cartData, summaryData] = await Promise.all([
        cartService.getCart(),
        cartService.getCartSummary(),
      ])
      setCartItems(cartData)
      setCartSummary(summaryData)
    } catch (error) {
      console.error('Erro ao remover do carrinho:', error)
    }
  }

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await cartService.applyCoupon({ codigoCupom: couponCode })
      setCouponCode('')
      const [cartData, summaryData] = await Promise.all([
        cartService.getCart(),
        cartService.getCartSummary(),
      ])
      setCartItems(cartData)
      setCartSummary(summaryData)
    } catch (error) {
      console.error('Erro ao aplicar cupom:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-3xl font-bold text-gray-900">KATA E-commerce</h1>
            <EnvironmentToggle />
          </div>
          <p className="text-gray-600">Dashboard de gerenciamento de produtos e carrinho</p>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 mb-8">
          <Button
            variant={activeTab === 'products' ? 'default' : 'outline'}
            onClick={() => setActiveTab('products')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Produtos
          </Button>
          <Button
            variant={activeTab === 'cart' ? 'default' : 'outline'}
            onClick={() => setActiveTab('cart')}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Carrinho ({cartItems.length})
          </Button>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Create Product Form */}
            <Card>
              <CardHeader>
                <CardTitle>Criar Novo Produto</CardTitle>
                <CardDescription>Adicione um novo produto ao catálogo</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateProduct} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome</Label>
                    <Input
                      id="nome"
                      value={newProduct.nome}
                      onChange={(e) => setNewProduct({ ...newProduct, nome: e.target.value })}
                      placeholder="Nome do produto"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="preco">Preço (R$)</Label>
                    <Input
                      id="preco"
                      type="number"
                      step="0.01"
                      value={newProduct.preco}
                      onChange={(e) => setNewProduct({ ...newProduct, preco: parseFloat(e.target.value) })}
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="categoria">Categoria</Label>
                    <Input
                      id="categoria"
                      value={newProduct.categoria || ''}
                      onChange={(e) => setNewProduct({ ...newProduct, categoria: e.target.value })}
                      placeholder="Categoria"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button type="submit" className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Criar
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Products List */}
            <Card>
              <CardHeader>
                <CardTitle>Produtos Disponíveis</CardTitle>
                <CardDescription>{products.length} produtos no catálogo</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>Preço</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>{product.id}</TableCell>
                        <TableCell className="font-medium">{product.nome}</TableCell>
                        <TableCell>R$ {product.preco.toFixed(2)}</TableCell>
                        <TableCell>
                          {product.categoria && (
                            <Badge variant="secondary">{product.categoria}</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            onClick={() => handleAddToCart(product.id)}
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Adicionar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Cart Tab */}
        {activeTab === 'cart' && (
          <div className="space-y-6">
            {/* Cart Items */}
            <Card>
              <CardHeader>
                <CardTitle>Itens no Carrinho</CardTitle>
                <CardDescription>{cartItems.length} itens adicionados</CardDescription>
              </CardHeader>
              <CardContent>
                {cartItems.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    Carrinho vazio
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Produto</TableHead>
                        <TableHead>Quantidade</TableHead>
                        <TableHead>Preço Unit.</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cartItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.nome}</TableCell>
                          <TableCell>{item.quantidade}</TableCell>
                          <TableCell>R$ {item.preco.toFixed(2)}</TableCell>
                          <TableCell>R$ {item.total.toFixed(2)}</TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleRemoveFromCart(item.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>

            {/* Coupon Form */}
            {cartItems.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Aplicar Cupom</CardTitle>
                  <CardDescription>Digite o código do cupom de desconto</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleApplyCoupon} className="flex gap-4">
                    <Input
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Código do cupom"
                      className="flex-1"
                    />
                    <Button type="submit">
                      <Tag className="w-4 h-4 mr-2" />
                      Aplicar
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Cart Summary */}
            {cartSummary && (
              <Card>
                <CardHeader>
                  <CardTitle>Resumo da Compra</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>R$ {cartSummary.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cupom:</span>
                      <span className="text-blue-600">{cartSummary.cupom}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Desconto:</span>
                      <span className="text-green-600">-R$ {cartSummary.desconto.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Frete:</span>
                      <span>R$ {cartSummary.frete.toFixed(2)}</span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span>R$ {cartSummary.total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
}