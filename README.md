# KATA E-commerce Frontend

Dashboard para gerenciamento de produtos e carrinho de compras, construído com Next.js e integrado à API KATA E-commerce.

## Tecnologias

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS v4** - Estilização utilitária
- **shadcn/ui** - Componentes de interface elegantes
- **Zod** - Validação de schemas e dados
- **Lucide React** - Ícones modernos

## Funcionalidades

### Dashboard de Produtos

- ✅ Listar todos os produtos disponíveis
- ✅ Criar novos produtos com validação
- ✅ Visualizar detalhes (ID, nome, preço, categoria)
- ✅ Adicionar produtos ao carrinho

### Carrinho de Compras

- ✅ Visualizar itens no carrinho
- ✅ Remover itens do carrinho
- ✅ Aplicar cupons de desconto
- ✅ Resumo completo (subtotal, desconto, frete, total)

## Instalação e Execução

1. **Instalar dependências:**

```bash
cd kata-frontend
npm install
```

2. **Configurar variáveis de ambiente:**

```bash
# O projeto está configurado para usar http://localhost:3000 por padrão
# Para alterar, configure NEXT_PUBLIC_API_URL no next.config.js
```

3. **Executar em desenvolvimento:**

```bash
npm run dev
```

4. **Acessar a aplicação:**

```
http://localhost:3001
```

### Estrutura de Pastas

```
src/
├── hooks/
│   ├── useProducts.ts
│   └── useCart.ts
├── components/
│   ├── products/
│   │   ├── ProductForm.tsx
│   │   └── ProductList.tsx
│   └── cart/
│       ├── CartItems.tsx
│       ├── CouponForm.tsx
│       └── CartSummary.tsx
└── app/
    └── page.tsx
```

### Validação com Zod

Todos os dados são validados usando schemas Zod:

- **ProductSchema** - Validação de produtos
- **CreateProductSchema** - Validação para criação de produtos
- **CartItemSchema** - Validação de itens do carrinho
- **AddToCartSchema** - Validação para adicionar ao carrinho
- **ApplyCouponSchema** - Validação de cupons
- **CartSummarySchema** - Validação do resumo do carrinho

## Integração com Backend

A aplicação se conecta com a API KATA E-commerce através dos endpoints:

- `GET /api/produtos` - Listar produtos
- `POST /api/produtos` - Criar produto
- `GET /api/carrinho` - Listar carrinho
- `POST /api/carrinho` - Adicionar ao carrinho
- `DELETE /api/carrinho/:id` - Remover do carrinho
- `POST /api/carrinho/cupom` - Aplicar cupom
- `GET /api/carrinho/resumo` - Resumo do carrinho

## Scripts Disponíveis

```bash
npm run dev          # Executar em desenvolvimento
npm run build        # Build para produção
npm run start        # Executar build de produção
npm run lint         # Executar ESLint
```
