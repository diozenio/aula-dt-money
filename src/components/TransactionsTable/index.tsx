"use client";

import { useDeleteTransaction } from "@/hooks/useDeleteTransaction";
import { useTransactions } from "@/hooks/useTransactions";
import { useUpdateTransaction } from "@/hooks/useUpdateTransaction";
import { cn } from "@/lib/utils";
import { Transaction } from "@/types/Transaction";

import { EditTransactionDialog } from "../EditTransactionDialog";
import { DeleteTransactionDialog } from "../DeleteTransactionDialog";

function TableHead() {
  return (
    <thead>
      <tr>
        <th className="font-normal text-type-2 pb-5 pl-8">Título</th>
        <th className="font-normal text-type-2 pb-5">Preço</th>
        <th className="font-normal text-type-2 pb-5">Categoria</th>
        <th className="font-normal text-type-2 pb-5">Data</th>
        <th className="font-normal text-type-2 pb-5 pr-8">Ações</th>
      </tr>
    </thead>
  );
}

export function TransactionRow(transaction: Transaction) {
  const amountColor =
    transaction.type === "OUTCOME" ? "text-outcome" : "text-income";

  return (
    <tr className="h-16">
      <td className="bg-white rounded-l-sm pl-8 text-type-1">
        {transaction.title}
      </td>
      <td className={cn(`bg-white`, amountColor)}>
        {transaction.type === "INCOME" ? "" : "-"}{" "}
        {transaction.price.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </td>
      <td className="bg-white text-type-2">{transaction.category}</td>
      <td className="bg-white text-type-2">
        {new Date(transaction.data).toLocaleDateString("pt-BR")}
      </td>
      <td className="bg-white rounded-r-sm space-x-2 flex items-center h-16">
        <EditTransactionDialog transaction={transaction} />

        <DeleteTransactionDialog transaction={transaction} />
      </td>
    </tr>
  );
}

export function TransactionsTable() {
  const { data: transactions, isLoading } = useTransactions();

  if (isLoading) {
    return (
      <div className="mt-16 w-full text-center">
        <p className="text-type-2">Carregando transações...</p>
      </div>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="mt-16 w-full text-center">
        <p className="text-type-2">Nenhuma transação encontrada.</p>
      </div>
    );
  }

  return (
    <div className="mt-16 w-full">
      <table className="w-full text-left border-separate border-spacing-y-2">
        <TableHead />
        <tbody>
          {transactions?.map((transaction) => (
            <TransactionRow key={transaction.id} {...transaction} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
