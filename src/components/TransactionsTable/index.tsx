"use client";
import { useTransactions } from "@/hooks/useTransactions";
import { cn } from "@/lib/utils";
import { Transaction } from "@/types/Transaction";

function TableHead() {
  return (
    <thead>
      <tr>
        <th className="font-normal text-type-2 pb-5 pl-8">Título</th>
        <th className="font-normal text-type-2 pb-5">Preço</th>
        <th className="font-normal text-type-2 pb-5">Categoria</th>
        <th className="font-normal text-type-2 pb-5 pr-8">Data</th>
      </tr>
    </thead>
  );
}

function TransactionRow({ amount, category, date, title, type }: Transaction) {
  const amountColor = type === "outcome" ? "text-outcome" : "text-income";

  return (
    <tr className="h-16">
      <td className="bg-white rounded-l-sm pl-8 text-type-1">{title}</td>
      <td className={cn(`bg-white`, amountColor)}>
        {type == "income" ? "" : "-"}{" "}
        {amount.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </td>
      <td className="bg-white text-type-2">{category}</td>
      <td className="bg-white rounded-r-sm pr-8 w-0 whitespace-nowrap text-type-2">
        {date}
      </td>
    </tr>
  );
}

export function TransactionsTable() {
  const { transactions } = useTransactions();

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
          {transactions?.map((transaction, index) => (
            <TransactionRow
              key={`${transaction.title}-${index}`}
              {...transaction}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
