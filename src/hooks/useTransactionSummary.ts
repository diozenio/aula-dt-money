import { useQuery } from "@tanstack/react-query";

interface SummaryResponse {
  income: number;
  outcome: number;
  total: number;
}

export function useTransactionSummary() {
  const url = process.env.NEXT_PUBLIC_API_URL + "/transaction/summary";

  return useQuery<SummaryResponse>({
    queryKey: ["transaction-summary"],
    queryFn: async () => {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Erro ao buscar resumo de transações");
      return res.json();
    },
  });
}
