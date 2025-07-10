"use client";

import { useTransactions } from "@/hooks/useTransactions";
import { Card } from "../Card";

export function CardContainer() {
  const { data: transactions } = useTransactions();

  const summary = transactions?.reduce(
    (acc, transaction) => {
      if (transaction.type === "INCOME") {
        acc.income += transaction.price;
        acc.total += transaction.price;
      } else {
        acc.outcome += transaction.price;
        acc.total -= transaction.price;
      }
      return acc;
    },
    { income: 0, outcome: 0, total: 0 }
  ) || {
    income: 0,
    outcome: 0,
    total: 0,
  };

  return (
    <div className="flex justify-between">
      <Card title="Entradas" value={summary.income} type="income" />
      <Card title="Saídas" value={summary.outcome} type="outcome" />
      <Card title="Total" value={summary.total} type="total" />
    </div>
  );
}
