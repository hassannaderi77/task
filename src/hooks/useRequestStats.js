import { useQuery } from "@tanstack/react-query";

const getRequestStats = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/history/stats/today`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch request stats");
  }

  const data = await response.json();

  return data.stats || [];
};

export function useRequestStats(enabled = true) {
  return useQuery({
    queryKey: ["requestStats", "today"],
    queryFn: getRequestStats,
    enabled,
  });
}