"use client";

import { Card } from "../Card";
import { useTransactionSummary } from "@/hooks/useTransactionSummary";

export function CardContainer() {
  const { data: summary } = useTransactionSummary();

  const income = summary?.income ?? 0;
  const outcome = summary?.outcome ?? 0;
  const total = summary?.total ?? 0;

  return (
    <div className="flex justify-between">
      <Card title="Entradas" value={income} type="income" />
      <Card title="Saídas" value={outcome} type="outcome" />
      <Card title="Total" value={total} type="total" />
    </div>
  );
}
