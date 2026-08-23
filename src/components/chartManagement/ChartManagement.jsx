import React, { useMemo } from "react";
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
import Loading from "../ui/Loading";

function ChartManagement({
  requestStats = [],
  isLoadingRequests,
  requestsError,
  onClose,
}) {
  // ساخت تمام ساعت‌های روز
  const chartData = useMemo(() => {
    const statsMap = new Map(
      requestStats.map((item) => [item.hour, item.requests])
    );

    return Array.from({ length: 24 }, (_, hour) => {
      const formattedHour = `${String(hour).padStart(2, "0")}:00`;

      return {
        hour: formattedHour,
        requests: statsMap.get(formattedHour) || 0,
      };
    });
  }, [requestStats]);

  // آمار کلی
  const totalRequests = useMemo(() => {
    return requestStats.reduce(
      (total, item) => total + Number(item.requests || 0),
      0
    );
  }, [requestStats]);

  const maxRequests = useMemo(() => {
    if (!requestStats.length) return 0;

    return Math.max(
      ...requestStats.map((item) => Number(item.requests || 0))
    );
  }, [requestStats]);

  const busiestHour = useMemo(() => {
    if (!requestStats.length) return "-";

    const busiest = requestStats.reduce((prev, current) =>
      Number(current.requests) > Number(prev.requests) ? current : prev
    );

    return busiest.hour;
  }, [requestStats]);

  const averageRequests = useMemo(() => {
    if (!requestStats.length) return 0;

    return (totalRequests / requestStats.length).toFixed(1);
  }, [requestStats, totalRequests]);

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
        {/* Header */}
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
                shadow-lg
                shadow-purple-950/30
              "
            >
              📊
            </div>

            <div>
              <h2
                className="
                  text-xl font-black
                  text-transparent
                  bg-gradient-to-r
                  from-purple-200
                  via-fuchsia-300
                  to-purple-300
                  bg-clip-text
                  sm:text-2xl
                "
              >
                آمار درخواست‌های امروز
              </h2>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                تعداد درخواست‌های پردازش شده بر اساس ساعت
              </p>
            </div>
          </div>

          {/* Close button */}
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
            بستن ✕
          </button>
        </div>

        {/* Stats */}
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
                <span className="text-xs text-slate-500">
                  مجموع درخواست‌ها
                </span>

                <span
                  className="
                    flex h-8 w-8
                    items-center justify-center
                    rounded-xl
                    bg-purple-500/10
                    text-sm
                  "
                >
                  🚀
                </span>
              </div>

              <p className="text-2xl font-black text-white">
                {totalRequests}
              </p>

              <p className="mt-1 text-[11px] text-slate-600">
                درخواست امروز
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
                <span className="text-xs text-slate-500">
                  بیشترین درخواست
                </span>

                <span
                  className="
                    flex h-8 w-8
                    items-center justify-center
                    rounded-xl
                    bg-fuchsia-500/10
                    text-sm
                  "
                >
                  🔥
                </span>
              </div>

              <p className="text-2xl font-black text-white">
                {maxRequests}
              </p>

              <p className="mt-1 text-[11px] text-slate-600">
                در یک ساعت
              </p>
            </div>

            {/* Busiest hour */}
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
                  شلوغ‌ترین ساعت
                </span>

                <span
                  className="
                    flex h-8 w-8
                    items-center justify-center
                    rounded-xl
                    bg-violet-500/10
                    text-sm
                  "
                >
                  ⏰
                </span>
              </div>

              <p className="text-2xl font-black text-white">
                {busiestHour}
              </p>

              <p className="mt-1 text-[11px] text-slate-600">
                بیشترین فعالیت
              </p>
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
                <span className="text-xs text-slate-500">
                  میانگین ساعتی
                </span>

                <span
                  className="
                    flex h-8 w-8
                    items-center justify-center
                    rounded-xl
                    bg-purple-500/10
                    text-sm
                  "
                >
                  📈
                </span>
              </div>

              <p className="text-2xl font-black text-white">
                {averageRequests}
              </p>

              <p className="mt-1 text-[11px] text-slate-600">
                درخواست در ساعت
              </p>
            </div>
          </div>
        )}

        {/* Loading */}
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

        {/* Error */}
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
              <div className="text-3xl">⚠️</div>

              <p className="mt-3 text-sm font-semibold text-red-300">
                {requestsError}
              </p>
            </div>
          </div>
        )}

        {/* Chart */}
        {!isLoadingRequests &&
          !requestsError &&
          requestStats.length > 0 && (
            <div
              className="
                rounded-3xl
                border border-white/[0.05]
                bg-black/10
                p-3
                sm:p-5
              "
            >
              <div className="mb-4 flex items-center justify-between px-2">
                <div>
                  <p className="text-sm font-bold text-slate-300">
                    فعالیت ساعتی
                  </p>

                  <p className="mt-1 text-[11px] text-slate-600">
                    ۲۴ ساعت گذشته
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-purple-400" />

                  <span className="text-[11px] text-slate-500">
                    درخواست
                  </span>
                </div>
              </div>

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
                      dataKey="hour"
                      interval={1}
                      tick={{
                        fill: "#64748b",
                        fontSize: 10,
                      }}
                      axisLine={false}
                      tickLine={false}
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
                        boxShadow:
                          "0 15px 40px rgba(0,0,0,0.35)",
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
                      formatter={(value) => [
                        `${value} درخواست`,
                        "تعداد",
                      ]}
                    />

                    <Bar
                      dataKey="requests"
                      radius={[7, 7, 3, 3]}
                      animationDuration={900}
                      maxBarSize={28}
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            entry.requests === maxRequests &&
                            entry.requests > 0
                              ? "#d946ef"
                              : "#9333ea"
                          }
                          fillOpacity={
                            entry.requests === 0 ? 0.15 : 0.85
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

        {/* Empty */}
        {!isLoadingRequests &&
          !requestsError &&
          requestStats.length === 0 && (
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
                  text-4xl
                "
              >
                📊
              </div>

              <p className="mt-5 font-bold text-slate-300">
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