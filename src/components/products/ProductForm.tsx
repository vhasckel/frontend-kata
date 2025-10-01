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
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { CreateProduct } from "@/lib/schemas";
import { cn } from "@/lib/utils";

interface ProductFormProps {
  onSubmit: (product: CreateProduct) => Promise<unknown>;
  availableCategories: string[];
}

export function ProductForm({
  onSubmit,
  availableCategories,
}: ProductFormProps) {
  const [formData, setFormData] = useState<CreateProduct>({
    nome: "",
    preco: 0,
    categoria: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData({ nome: "", preco: 0, categoria: "" });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar Novo Produto</CardTitle>
        <CardDescription>Adicione um novo produto ao catálogo</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <div className="space-y-2">
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) =>
                setFormData({ ...formData, nome: e.target.value })
              }
              placeholder="Nome do produto"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="preco">Preço (R$)</Label>
            <Input
              id="preco"
              type="number"
              value={formData.preco}
              onChange={(e) =>
                setFormData({ ...formData, preco: parseFloat(e.target.value) })
              }
              placeholder="0.00"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="categoria">Categoria</Label>
            <select
              id="categoria"
              value={formData.categoria || ""}
              onChange={(e) =>
                setFormData({ ...formData, categoria: e.target.value })
              }
              className={cn(
                "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2",
                "text-sm ring-offset-background placeholder:text-muted-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "disabled:cursor-not-allowed disabled:opacity-50"
              )}
            >
              <option value="">Selecione uma categoria</option>
              {availableCategories.map((categoria) => (
                <option key={categoria} value={categoria}>
                  {categoria}
                </option>
              ))}
            </select>
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
  );
}
