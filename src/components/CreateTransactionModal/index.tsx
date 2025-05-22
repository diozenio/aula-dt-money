"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Input } from "@/components/Input";
import { useRef, useState } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import { Transaction, TransactionType } from "@/types/Transaction";
import Image from "next/image";
import { cn } from "@/lib/utils";

const NUMBER_REGEX = /^\d+(\.\d+)?$/;

export function CreateTransactionModal() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<TransactionType>();
  const { addTransaction } = useTransactions();

  const handleSubmit = () => {
    const form = formRef.current;
    if (form) {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      if (
        data.name &&
        data.amount &&
        data.category &&
        transactionType &&
        String(data.amount).match(NUMBER_REGEX)
      ) {
        const transaction: Transaction = {
          title: String(data.name),
          amount: Number(data.amount),
          category: String(data.category),
          type: transactionType,
          date: new Date().toLocaleDateString("pt-BR"),
        };

        addTransaction(transaction);
        form.reset();
        setTransactionType(undefined);
        setIsOpen(false);
      }
    }
  };

  const handleTransactionType = (type: TransactionType) => {
    if (transactionType === type) {
      setTransactionType(undefined);
    } else {
      setTransactionType(type);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="bg-button text-white px-8 py-3 rounded-md hover:opacity-80">
          Nova transação
        </button>
      </DialogTrigger>
      <DialogContent className="bg-[#F0F2F5]">
        <DialogHeader className="mt-8">
          <DialogTitle className="font-semibold text-2xl text-type-1">
            Cadastrar transação
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-8 grid-cols-2 w-full">
          <form
            ref={formRef}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="w-full contents"
          >
            <Input placeholder="Nome" name="name" />
            <Input placeholder="Preço" pattern={NUMBER_REGEX} name="amount" />
            <button
              type="button"
              className={cn(
                "bg-transparent h-16 rounded-sm border-input-border border-2 flex items-center justify-center gap-2 hover:opacity-80 cursor-pointer transition-all duration-300 ease-in-out",
                transactionType === "income" && "border-income"
              )}
              onClick={() => handleTransactionType("income")}
            >
              <Image src={"/income.png"} width={32} height={32} alt="Entrada" />
              Entrada
            </button>
            <button
              type="button"
              className={cn(
                "bg-transparent h-16 rounded-sm border-input-border border-2 flex items-center justify-center gap-2 hover:opacity-80 cursor-pointer transition-all duration-300 ease-in-out",
                transactionType === "outcome" && "border-outcome"
              )}
              onClick={() => handleTransactionType("outcome")}
            >
              <Image
                src={"/outcome.png"}
                width={32}
                height={32}
                alt="Entrada"
              />
              Saída
            </button>

            <Input placeholder="Categoria" name="category" />
          </form>
        </div>
        <DialogFooter>
          <button
            onClick={handleSubmit}
            className="bg-green text-white h-16 rounded-sm hover:opacity-80 w-full font-semibold cursor-pointer transition-all duration-300 ease-in-out"
          >
            Cadastrar
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
