import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tag } from "lucide-react";

interface CouponFormProps {
  onApply: (code: string) => Promise<void>;
}

export function CouponForm({ onApply }: CouponFormProps) {
  const [couponCode, setCouponCode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onApply(couponCode);
    setCouponCode("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Aplicar Cupom</CardTitle>
        <CardDescription>Digite o código do cupom de desconto</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex gap-4">
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
  );
}
