"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Store, ShoppingCart } from "lucide-react";
import { ProductForm } from "@/components/products/ProductForm";
import { ProductList } from "@/components/products/ProductList";
import { CouponForm } from "@/components/cart/CouponForm";
import { CartSummary } from "@/components/cart/CartSummary";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { CartItems } from "@/components/cart/CartItems";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"products" | "cart">("products");
  const {
    products,
    loading: productsLoading,
    loadProducts,
    createProduct,
    availableCategories,
  } = useProducts();

  const {
    cartItems,
    cartSummary,
    loading: cartLoading,
    loadCart,
    addToCart,
    removeFromCart,
    applyCoupon,
    incrementQuantity,
    decrementQuantity,
  } = useCart();

  const loading = productsLoading || cartLoading;

  useEffect(() => {
    loadProducts();
    loadCart();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-3xl font-bold text-gray-900">
              KATA E-commerce
            </h1>
          </div>
          <p className="text-gray-600">
            Dashboard de gerenciamento de produtos e carrinho
          </p>
        </div>

        <div className="flex gap-4 mb-8">
          <Button
            variant={activeTab === "products" ? "default" : "outline"}
            onClick={() => setActiveTab("products")}
          >
            <Store className="w-4 h-4 mr-2" />
            Catálogo
          </Button>
          <Button
            variant={activeTab === "cart" ? "default" : "outline"}
            onClick={() => setActiveTab("cart")}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Carrinho ({cartItems.length})
          </Button>
        </div>

        {activeTab === "products" && (
          <div className="space-y-6">
            <ProductForm
              onSubmit={createProduct}
              availableCategories={availableCategories}
            />
            <ProductList products={products} onAddToCart={addToCart} />
          </div>
        )}

        {activeTab === "cart" && (
          <div className="space-y-6">
            <CartItems
              items={cartItems}
              onRemove={removeFromCart}
              onIncrement={incrementQuantity}
              onDecrement={decrementQuantity}
            />
            {cartItems.length > 0 && (
              <>
                <CouponForm onApply={applyCoupon} />
                {cartSummary && <CartSummary summary={cartSummary} />}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
