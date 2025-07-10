export type TransactionType = "INCOME" | "OUTCOME";

export interface Transaction {
  id: string;
  title: string;
  price: number;
  category: string;
  data: string;
  type: TransactionType;
}
