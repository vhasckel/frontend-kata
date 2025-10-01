import { useState, useCallback } from "react";
import { cartService } from "@/lib/services";
import { CartItem, CartSummary } from "@/lib/schemas";
import { toast } from "sonner";

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartSummary, setCartSummary] = useState<CartSummary | null>(null);
  const [loading, setLoading] = useState(true);

  const loadCart = useCallback(async (showLoading: boolean = true) => {
    try {
      if (showLoading) setLoading(true);
      const [items, summary] = await Promise.all([
        cartService.getCart(),
        cartService.getCartSummary(),
      ]);
      setCartItems(items);
      setCartSummary(summary);
    } catch (error) {
      console.error("Error loading cart:", error);
    } finally {
      if (showLoading) setLoading(false);
    }
  }, []);

  const addToCart = useCallback(
    async (productId: number) => {
      try {
        await cartService.addToCart({
          produto: { id: productId },
          quantidade: 1,
        });
        await loadCart(false);
        toast.success("Produto adicionado ao carrinho!");
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error("Erro ao adicionar produto ao carrinho");
      }
    },
    [loadCart]
  );

  const removeFromCart = useCallback(
    async (productId: number) => {
      try {
        await cartService.removeFromCart(productId);
        await loadCart(false);
        toast.success("Produto removido do carrinho!");
      } catch (error) {
        console.error("Error removing from cart:", error);
        toast.error("Erro ao remover produto do carrinho");
      }
    },
    [loadCart]
  );

  const applyCoupon = useCallback(
    async (couponCode: string) => {
      try {
        await cartService.applyCoupon({ codigoCupom: couponCode });
        await loadCart(false);
        toast.success(`Cupom "${couponCode}" aplicado com sucesso!`);
      } catch (error) {
        console.error("Error applying coupon:", error);
        toast.error("Erro ao aplicar cupom");
        throw error;
      }
    },
    [loadCart]
  );

  return {
    cartItems,
    cartSummary,
    loading,
    loadCart,
    addToCart,
    removeFromCart,
    applyCoupon,
  };
}
