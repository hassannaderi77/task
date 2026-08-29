import { useQuery } from "@tanstack/react-query";

import { getHistory } from "../api/services/historyService";

export function useUserHistory(userId) {
  return useQuery({
    queryKey: ["userHistory", userId],
    queryFn: () => getHistory(userId),
    enabled: Boolean(userId),
  });
}