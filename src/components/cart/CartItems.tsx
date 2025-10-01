import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Plus, Minus } from "lucide-react";
import { CartItem } from "@/lib/schemas";

interface CartItemsProps {
  items: CartItem[];
  onRemove: (productId: number) => void;
  onIncrement: (productId: number) => void;
  onDecrement: (productId: number) => void;
}

export function CartItems({
  items,
  onRemove,
  onIncrement,
  onDecrement,
}: CartItemsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Itens no Carrinho</CardTitle>
        <CardDescription>{items.length} itens adicionados</CardDescription>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <div className="text-center py-8 text-gray-500">Carrinho vazio</div>
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
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.nome}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onDecrement(item.id)}
                        className="h-7 w-7 p-0"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="min-w-[2ch] text-center font-medium">
                        {item.quantidade}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onIncrement(item.id)}
                        className="h-7 w-7 p-0"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>R$ {item.preco.toFixed(2)}</TableCell>
                  <TableCell>R$ {item.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => onRemove(item.id)}
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
  );
}
