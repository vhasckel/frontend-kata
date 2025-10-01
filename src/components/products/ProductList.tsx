import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import { Product } from "@/lib/schemas";

interface ProductListProps {
  products: Product[];
  onAddToCart: (productId: number) => void;
}

export function ProductList({ products, onAddToCart }: ProductListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Produtos Disponíveis</CardTitle>
        <CardDescription>
          {products.length} produtos no catálogo
        </CardDescription>
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
                  <Button size="sm" onClick={() => onAddToCart(product.id)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar ao Carrinho
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
