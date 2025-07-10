export type TransactionType = "INCOME" | "OUTCOME";

export interface Transaction {
  title: string;
  price: number;
  category: string;
  data: string;
  type: TransactionType;
}
