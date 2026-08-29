import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getHistory,
  deleteHistory,
} from "../api/services/historyService";

export function useHistory(userId) {
  const queryClient = useQueryClient();

  const historyQuery = useQuery({
    queryKey: ["history", userId],
    queryFn: () => getHistory(userId),
    enabled: Boolean(userId),
  });

  const deleteMutation = useMutation({
    mutationFn: ({ historyId, userId }) =>
      deleteHistory(historyId, userId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["history", userId],
      });
    },
  });

  return {
    historyQuery,
    deleteMutation,
  };
}