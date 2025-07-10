import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Transaction } from "@/types/Transaction";

export function useUpdateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...data
    }: Partial<Transaction> & { id: string }) => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + `/transaction/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao editar transação");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["transaction-summary"] });
    },
  });
}
