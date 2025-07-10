import { useQuery } from "@tanstack/react-query";
import { Transaction } from "@/types/Transaction";

interface TransactionResponse {
  data: Transaction[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export function useTransactions(page: number = 1) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL + "/transaction";

  return useQuery<TransactionResponse>({
    queryKey: ["transactions", page],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}?page=${page}`);

      if (!res.ok) {
        throw new Error("Erro ao buscar transações");
      }

      return res.json();
    },
  });
}
