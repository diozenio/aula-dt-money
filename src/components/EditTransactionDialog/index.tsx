"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit } from "lucide-react";
import { useUpdateTransaction } from "@/hooks/useUpdateTransaction";
import { Transaction } from "@/types/Transaction";

interface EditTransactionDialogProps {
  transaction: Transaction;
}

export function EditTransactionDialog({
  transaction,
}: EditTransactionDialogProps) {
  const [title, setTitle] = useState(transaction.title);
  const [category, setCategory] = useState(transaction.category);
  const [price, setPrice] = useState(transaction.price.toString());

  const { mutate: updateTransaction } = useUpdateTransaction();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parsedPrice = parseFloat(price.replace(",", "."));
    if (isNaN(parsedPrice)) return;

    updateTransaction({
      id: transaction.id,
      title,
      category,
      price: parsedPrice,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-blue-600 p-0">
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Editar transação</DialogTitle>
            <DialogDescription>
              Altere os dados da transação abaixo e clique em salvar.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 mt-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Categoria</Label>
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Preço</Label>
              <Input
                id="price"
                type="text"
                inputMode="decimal"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit">Salvar alterações</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
