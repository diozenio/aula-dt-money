// stores/useTransactionStore.ts
import { create } from "zustand";
import { Transaction } from "@/types/Transaction";

interface TransactionState {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
}

const mockTransactions: Transaction[] = [
  {
    title: "Desenvolvimento de site",
    amount: 12000,
    category: "Venda",
    date: "13/04/2021",
    type: "income",
  },
  {
    title: "Hamburguer",
    amount: 59,
    category: "Alimentação",
    date: "10/04/2021",
    type: "outcome",
  },
  {
    title: "Aluguel do apartamento",
    amount: 1200,
    category: "Casa",
    date: "27/03/2021",
    type: "outcome",
  },
  {
    title: "Computador",
    amount: 5400,
    category: "Venda",
    date: "15/03/2021",
    type: "income",
  },
];

export const useTransactions = create<TransactionState>((set) => ({
  transactions: mockTransactions,
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [...state.transactions, transaction],
    })),
}));
