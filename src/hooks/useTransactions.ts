import { useQuery } from "@tanstack/react-query";
import { Transaction } from "@/types/Transaction";

export function useTransactions() {
  return useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/transaction"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }

      return response.json();
    },
  });
}
