import { CreateProduct, Product } from "@/lib/schemas";
import { productService } from "@/lib/services";
import { toTitleCase } from "@/lib/utils";
import { useCallback, useState } from "react";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await productService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createProduct = useCallback(
    async (productData: CreateProduct) => {
      try {
        const formattedData = {
          ...productData,
          nome: toTitleCase(productData.nome),
        };
        const newProduct = await productService.createProduct(formattedData);
        setProducts((prev) => [...prev, newProduct]);
        return newProduct;
      } catch (error) {
        console.error("Erro ao criar produto:", error);
        await loadProducts();
        throw error;
      }
    },
    [loadProducts]
  );

  const availableCategories = Array.from(
    new Set(
      products.map((p) => p.categoria).filter((c): c is string => Boolean(c))
    )
  );

  return {
    products,
    loading,
    createProduct,
    availableCategories,
    loadProducts,
  };
}
