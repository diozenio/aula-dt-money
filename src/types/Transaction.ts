export type TransactionType = "income" | "outcome";

export interface Transaction {
  title: string;
  amount: number;
  category: string;
  date: string;
  type: TransactionType;
}
