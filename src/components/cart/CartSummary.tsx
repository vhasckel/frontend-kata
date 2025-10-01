import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CartSummary as CartSummaryType } from "@/lib/schemas";

interface CartSummaryProps {
  summary: CartSummaryType;
}

export function CartSummary({ summary }: CartSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumo da Compra</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>R$ {summary.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Cupom:</span>
            <span className="text-blue-600">{summary.cupom}</span>
          </div>
          <div className="flex justify-between">
            <span>Desconto:</span>
            <span className="text-green-600">
              -R$ {summary.desconto.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Frete:</span>
            <span>R$ {summary.frete.toFixed(2)}</span>
          </div>
          <hr />
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>R$ {summary.total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
