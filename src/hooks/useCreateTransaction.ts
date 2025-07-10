import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Transaction } from "@/types/Transaction";

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (transaction: Omit<Transaction, "data">) => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/transaction",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(transaction),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create transaction");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
}
