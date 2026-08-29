import React, { useMemo, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import {
  FiBarChart2,
  FiX,
  FiSend,
  FiTrendingUp,
  FiClock,
  FiActivity,
  FiAlertTriangle,
  FiCalendar,
} from "react-icons/fi";

import Loading from "../ui/Loading";

function ChartManagement({
  hourlyStats = [],
  dailyStats = [],
  isLoadingRequests,
  requestsError,
  onClose,
}) {
  const [viewMode, setViewMode] = useState("hour");

  // =========================
  // Hourly chart data
  // =========================

  const hourlyChartData = useMemo(() => {
    const statsMap = new Map(
      hourlyStats.map((item) => [item.hour, Number(item.requests || 0)]),
    );

    return Array.from({ length: 24 }, (_, hour) => {
      const formattedHour = `${String(hour).padStart(2, "0")}:00`;

      return {
        label: formattedHour,
        requests: statsMap.get(formattedHour) || 0,
      };
    });
  }, [hourlyStats]);

  // =========================
  // Daily chart data
  // =========================

  const dailyChartData = useMemo(() => {
    return dailyStats.map((item) => ({
      label: item.date,
      requests: Number(item.requests || 0),
    }));
  }, [dailyStats]);

  // =========================
  // Current chart data
  // =========================

  const chartData = viewMode === "hour" ? hourlyChartData : dailyChartData;

  const currentStats = viewMode === "hour" ? hourlyStats : dailyStats;

  // =========================
  // Total requests
  // =========================

  const totalRequests = useMemo(() => {
    return currentStats.reduce(
      (total, item) => total + Number(item.requests || 0),
      0,
    );
  }, [currentStats]);

  // =========================
  // Maximum requests
  // =========================

  const maxRequests = useMemo(() => {
    if (!currentStats.length) return 0;

    return Math.max(...currentStats.map((item) => Number(item.requests || 0)));
  }, [currentStats]);

  // =========================
  // Busiest period
  // =========================

  const busiestPeriod = useMemo(() => {
    if (!currentStats.length) return "-";

    const busiest = currentStats.reduce((prev, current) =>
      Number(current.requests || 0) > Number(prev.requests || 0)
        ? current
        : prev,
    );

    return viewMode === "hour" ? busiest.hour : busiest.date;
  }, [currentStats, viewMode]);

  // =========================
  // Average
  // =========================

  const averageRequests = useMemo(() => {
    if (!currentStats.length) return 0;

    return (totalRequests / currentStats.length).toFixed(1);
  }, [currentStats, totalRequests]);

  return (
    <div
      className="
        relative mt-6 overflow-hidden
        rounded-[28px]
        border border-purple-500/20
        bg-gradient-to-br
        from-[#160d2b]
        via-[#1b0f34]
        to-[#0b0614]
        p-5
        shadow-2xl
        shadow-purple-950/40
        sm:p-7
      "
    >
      {/* Decorative glow */}

      <div
        className="
          pointer-events-none absolute
          -right-24 -top-24
          h-64 w-64
          rounded-full
          bg-purple-600/10
          blur-[100px]
        "
      />

      <div
        className="
          pointer-events-none absolute
          -bottom-24 -left-24
          h-64 w-64
          rounded-full
          bg-fuchsia-600/10
          blur-[100px]
        "
      />

      {/* Top gradient line */}

      <div
        className="
          absolute left-0 right-0 top-0
          h-[2px]
          bg-gradient-to-r
          from-transparent
          via-purple-500
          to-transparent
        "
      />

      <div className="relative">
        {/* =========================
            Header
        ========================= */}

        <div
          className="
            mb-7 flex flex-col gap-5
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div className="flex items-center gap-4">
            <div
              className="
                flex h-14 w-14 shrink-0
                items-center justify-center
                rounded-2xl
                border border-purple-400/20
                bg-gradient-to-br
                from-purple-500/20
                to-fuchsia-500/10
                text-2xl
                text-purple-300
                shadow-lg
                shadow-purple-950/30
              "
            >
              <FiBarChart2 className="h-7 w-7" />
            </div>

            <div>
              <h2
                className="
                  bg-gradient-to-r
                  from-purple-200
                  via-fuchsia-300
                  to-purple-300
                  bg-clip-text
                  text-xl
                  font-medium
                  text-transparent
                  sm:text-2xl
                "
              >
                آمار درخواست‌ها
              </h2>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                تعداد درخواست‌های پردازش شده در بازه‌های زمانی
              </p>
            </div>
          </div>

          {/* Close */}

          <button
            type="button"
            onClick={onClose}
            className="
              self-start
              rounded-xl
              border border-white/5
              bg-white/[0.03]
              px-4 py-2
              text-xs font-semibold
              text-slate-400
              transition
              hover:border-red-400/20
              hover:bg-red-500/10
              hover:text-red-300
              sm:self-auto
            "
          >
            <span className="flex items-center gap-2">
              بستن
              <FiX className="h-4 w-4" />
            </span>
          </button>
        </div>

        {/* =========================
            View mode selector
        ========================= */}

        {!isLoadingRequests && !requestsError && (
          <div className="mb-7 flex justify-center">
            <div
              className="
                flex w-full max-w-md
                rounded-2xl
                border border-white/5
                bg-black/20
                p-1
              "
            >
              <button
                type="button"
                onClick={() => setViewMode("hour")}
                className={`
                  flex flex-1
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  px-4 py-3
                  text-sm
                  font-semibold
                  transition
                  ${
                    viewMode === "hour"
                      ? "bg-purple-500/20 text-purple-300 shadow-lg"
                      : "text-slate-500 hover:bg-white/[0.03] hover:text-slate-300"
                  }
                `}
              >
                <FiClock className="h-4 w-4" />
                ساعتی
              </button>

              <button
                type="button"
                onClick={() => setViewMode("day")}
                className={`
                  flex flex-1
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  px-4 py-3
                  text-sm
                  font-semibold
                  transition
                  ${
                    viewMode === "day"
                      ? "bg-purple-500/20 text-purple-300 shadow-lg"
                      : "text-slate-500 hover:bg-white/[0.03] hover:text-slate-300"
                  }
                `}
              >
                <FiCalendar className="h-4 w-4" />
                روزانه
              </button>
            </div>
          </div>
        )}

        {/* =========================
            Stats
        ========================= */}

        {!isLoadingRequests && !requestsError && (
          <div
            className="
              mb-7 grid grid-cols-2 gap-3
              lg:grid-cols-4
            "
          >
            {/* Total */}

            <div
              className="
                rounded-2xl
                border border-purple-500/15
                bg-white/[0.025]
                p-4
                transition
                hover:border-purple-500/30
                hover:bg-purple-500/[0.04]
              "
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs text-slate-500">مجموع درخواست‌ها</span>

                <span
                  className="
                    flex h-8 w-8
                    items-center justify-center
                    rounded-xl
                    bg-purple-500/10
                    text-purple-300
                  "
                >
                  <FiSend className="h-4 w-4" />
                </span>
              </div>

              <p className="text-2xl font-medium text-white">{totalRequests}</p>

              <p className="mt-1 text-[11px] text-slate-600">
                {viewMode === "hour"
                  ? "درخواست‌های امروز"
                  : "درخواست‌های بازه نمایش داده شده"}
              </p>
            </div>

            {/* Max */}

            <div
              className="
                rounded-2xl
                border border-fuchsia-500/15
                bg-white/[0.025]
                p-4
                transition
                hover:border-fuchsia-500/30
                hover:bg-fuchsia-500/[0.04]
              "
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs text-slate-500">بیشترین درخواست</span>

                <span
                  className="
                    flex h-8 w-8
                    items-center justify-center
                    rounded-xl
                    bg-fuchsia-500/10
                    text-fuchsia-300
                  "
                >
                  <FiTrendingUp className="h-4 w-4" />
                </span>
              </div>

              <p className="text-2xl font-medium text-white">{maxRequests}</p>

              <p className="mt-1 text-[11px] text-slate-600">
                در {viewMode === "hour" ? "یک ساعت" : "یک روز"}
              </p>
            </div>

            {/* Busiest */}

            <div
              className="
                rounded-2xl
                border border-violet-500/15
                bg-white/[0.025]
                p-4
                transition
                hover:border-violet-500/30
                hover:bg-violet-500/[0.04]
              "
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  {viewMode === "hour" ? "شلوغ‌ترین ساعت" : "شلوغ‌ترین روز"}
                </span>

                <span
                  className="
                    flex h-8 w-8
                    items-center justify-center
                    rounded-xl
                    bg-violet-500/10
                    text-violet-300
                  "
                >
                  {viewMode === "hour" ? (
                    <FiClock className="h-4 w-4" />
                  ) : (
                    <FiCalendar className="h-4 w-4" />
                  )}
                </span>
              </div>

              <p className="truncate text-2xl font-medium text-white">
                {busiestPeriod}
              </p>

              <p className="mt-1 text-[11px] text-slate-600">بیشترین فعالیت</p>
            </div>

            {/* Average */}

            <div
              className="
                rounded-2xl
                border border-purple-500/15
                bg-white/[0.025]
                p-4
                transition
                hover:border-purple-500/30
                hover:bg-purple-500/[0.04]
              "
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs text-slate-500">میانگین</span>

                <span
                  className="
                    flex h-8 w-8
                    items-center justify-center
                    rounded-xl
                    bg-purple-500/10
                    text-purple-300
                  "
                >
                  <FiActivity className="h-4 w-4" />
                </span>
              </div>

              <p className="text-2xl font-medium text-white">
                {averageRequests}
              </p>

              <p className="mt-1 text-[11px] text-slate-600">
                درخواست در {viewMode === "hour" ? "ساعت" : "روز"}
              </p>
            </div>
          </div>
        )}

        {/* =========================
            Loading
        ========================= */}

        {isLoadingRequests && (
          <div
            className="
              flex min-h-[380px]
              items-center justify-center
            "
          >
            <Loading />
          </div>
        )}

        {/* =========================
            Error
        ========================= */}

        {!isLoadingRequests && requestsError && (
          <div
            className="
              flex min-h-[250px]
              items-center justify-center
            "
          >
            <div
              className="
                w-full
                rounded-2xl
                border border-red-500/20
                bg-red-500/10
                p-5
                text-center
              "
            >
              <div className="flex justify-center text-3xl text-red-400">
                <FiAlertTriangle className="h-8 w-8" />
              </div>

              <p className="mt-3 text-sm font-semibold text-red-300">
                {requestsError}
              </p>
            </div>
          </div>
        )}

        {/* =========================
            Chart
        ========================= */}

        {!isLoadingRequests && !requestsError && chartData.length > 0 && (
          <div
            className="
                rounded-3xl
                border border-white/[0.05]
                bg-black/10
                p-3
                sm:p-5
              "
          >
            {/* Chart header */}

            <div className="mb-4 flex items-center justify-between px-2">
              <div>
                <p className="text-sm font-medium text-slate-300">
                  {viewMode === "hour" ? "فعالیت ساعتی" : "فعالیت روزانه"}
                </p>

                <p className="mt-1 text-[11px] text-slate-600">
                  {viewMode === "hour"
                    ? "۲۴ ساعت امروز"
                    : "تعداد درخواست‌ها در روزهای مختلف"}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-purple-400" />

                <span className="text-[11px] text-slate-500">درخواست</span>
              </div>
            </div>

            {/* Chart */}

            <div className="h-[320px] w-full sm:h-[380px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{
                    top: 15,
                    right: 5,
                    left: -15,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid
                    vertical={false}
                    strokeDasharray="4 4"
                    stroke="rgba(148,163,184,0.08)"
                  />

                  <XAxis
                    dataKey="label"
                    interval={viewMode === "hour" ? 2 : "preserveStartEnd"}
                    tick={{
                      fill: "#64748b",
                      fontSize: viewMode === "hour" ? 9 : 11,
                    }}
                    axisLine={false}
                    tickLine={false}
                    tickMargin={8}
                  />

                  <YAxis
                    allowDecimals={false}
                    tick={{
                      fill: "#64748b",
                      fontSize: 10,
                    }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip
                    cursor={{
                      fill: "rgba(168,85,247,0.05)",
                    }}
                    contentStyle={{
                      background: "#12091f",
                      border: "1px solid rgba(168,85,247,0.25)",
                      borderRadius: "14px",
                      boxShadow: "0 15px 40px rgba(0,0,0,0.35)",
                    }}
                    labelStyle={{
                      color: "#c4b5fd",
                      fontWeight: 700,
                      marginBottom: 5,
                    }}
                    itemStyle={{
                      color: "#e9d5ff",
                      fontSize: 13,
                    }}
                    formatter={(value) => [`${value} درخواست`, "تعداد"]}
                  />

                  <Bar
                    dataKey="requests"
                    radius={[7, 7, 3, 3]}
                    animationDuration={900}
                    maxBarSize={viewMode === "hour" ? 28 : 45}
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.requests === maxRequests && entry.requests > 0
                            ? "#d946ef"
                            : "#9333ea"
                        }
                        fillOpacity={entry.requests === 0 ? 0.15 : 0.85}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* =========================
            Empty
        ========================= */}

        {!isLoadingRequests && !requestsError && chartData.length === 0 && (
          <div
            className="
                flex min-h-[320px]
                flex-col items-center
                justify-center
                rounded-3xl
                border border-dashed
                border-purple-500/15
                bg-black/10
                text-center
              "
          >
            <div
              className="
                  flex h-20 w-20
                  items-center justify-center
                  rounded-3xl
                  bg-purple-500/10
                  text-purple-300
                "
            >
              <FiBarChart2 className="h-10 w-10" />
            </div>

            <p className="mt-5 font-medium text-slate-300">
              هنوز درخواستی ثبت نشده است
            </p>

            <p className="mt-2 text-xs text-slate-600">
              با ثبت اولین درخواست، آمار اینجا نمایش داده می‌شود
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChartManagement;
