"use client";
import { useTransactions } from "@/hooks/useTransactions";
import { Card } from "../Card";

export function CardContainer() {
  const { transactions } = useTransactions();

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "income") {
        acc.income += transaction.amount;
        acc.total += transaction.amount;
      } else {
        acc.outcome += transaction.amount;
        acc.total -= transaction.amount;
      }
      return acc;
    },
    { income: 0, outcome: 0, total: 0 }
  );

  return (
    <div className="flex justify-between">
      <Card title="Entradas" value={summary.income} type="income" />
      <Card title="Saídas" value={summary.outcome} type="outcome" />
      <Card title="Total" value={summary.total} type="total" />
    </div>
  );
}
