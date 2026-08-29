import { useQuery } from "@tanstack/react-query";

const getDailyStats = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/history/stats/daily`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch daily request stats");
  }

  const data = await response.json();

  return data.stats || [];
};

export function useDailyStats(enabled = true) {
  return useQuery({
    queryKey: ["dailyStats"],
    queryFn: getDailyStats,
    enabled,
  });
}