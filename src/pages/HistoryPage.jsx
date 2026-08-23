import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../context/authContext";

import Loading from "../components/ui/Loading";

import ErrorMessage from "../components/ui/ErrorMessage";

import { getHistory } from "../api/services/historyService";

function HistoryPage() {
  const { user } = useContext(AuthContext);

  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user?.id) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError("");

        const data = await getHistory(user.id);
        setHistory(data);
      } catch (error) {
        console.error("Get history error:", error);
        setError("دریافت تاریخچه با مشکل مواجه شد");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [user?.id]);

  if (isLoading) {
    return (
      <div
        dir="rtl"
        className="
          flex min-h-screen
          items-center justify-center
          bg-gradient-to-br
          from-[#08040f]
          via-[#160d2b]
          to-[#0d0718]
          px-4
          text-white
        "
      >
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div
        dir="rtl"
        className="
          min-h-screen
          bg-gradient-to-br
          from-[#08040f]
          via-[#160d2b]
          to-[#0d0718]
          px-4 py-10
          text-white
        "
      >
        <div className="mx-auto max-w-4xl">
          <ErrorMessage message={error} />
        </div>
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      className="
        relative min-h-screen
        overflow-hidden
        bg-gradient-to-br
        from-[#08040f]
        via-[#160d2b]
        to-[#0d0718]
        px-3 py-8
        text-white
        sm:px-5
        sm:py-10
      "
    >
      {/* Background glows */}
      <div
        className="
          pointer-events-none absolute
          -right-40 -top-40
          h-80 w-80
          rounded-full
          bg-purple-600/15
          blur-[110px]
        "
      />

      <div
        className="
          pointer-events-none absolute
          -bottom-40 -left-40
          h-80 w-80
          rounded-full
          bg-fuchsia-600/10
          blur-[110px]
        "
      />

      {/* Main Container */}
      <div className="relative mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div
            className="
              mx-auto mb-4
              flex h-16 w-16
              items-center justify-center
              rounded-2xl
              border border-purple-400/20
              bg-gradient-to-br
              from-purple-500/20
              via-violet-500/10
              to-fuchsia-500/10
              text-3xl
              shadow-lg
              shadow-purple-950/30
              transition-all duration-500
              hover:scale-105
            "
          >
            🕘
          </div>

          <h1
            className="
              bg-gradient-to-r
              from-purple-200
              via-fuchsia-300
              to-purple-300
              bg-clip-text
              text-3xl
              font-black
              text-transparent
              sm:text-4xl
            "
          >
            تاریخچه ویرایش تصاویر
          </h1>

          <p className="mt-2 text-xs text-slate-400 sm:text-sm">
            تصاویر ویرایش شده قبلی خود را مشاهده کنید
          </p>

          <div
            className="
              mx-auto mt-4
              h-1 w-20
              rounded-full
              bg-gradient-to-r
              from-purple-500
              via-fuchsia-500
              to-purple-500
            "
          />
        </div>

        {/* Empty State */}
        {history.length === 0 && (
          <div
            className="
              relative overflow-hidden
              rounded-3xl
              border border-purple-500/20
              bg-gradient-to-br
              from-[#160d2b]/90
              via-[#1d1038]/80
              to-[#0d0718]/90
              p-7
              text-center
              shadow-xl
              shadow-purple-950/40
              backdrop-blur-xl
              sm:p-10
            "
          >
            <div
              className="
                mx-auto mb-4
                flex h-16 w-16
                items-center justify-center
                rounded-2xl
                bg-gradient-to-br
                from-purple-500/20
                to-fuchsia-500/10
                text-3xl
              "
            >
              🖼️
            </div>

            <h2 className="text-xl font-bold text-purple-100 sm:text-2xl">
              هنوز تاریخی ثبت نشده است
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              بعد از ویرایش اولین تصویر، نتیجه اینجا نمایش داده می‌شود.
            </p>
          </div>
        )}

        {/* History */}
        {history.length > 0 && (
          <div className="space-y-6">
            {history.map((item, index) => (
              <div
                key={item._id || index}
                className="
                  group relative overflow-hidden
                  rounded-3xl
                  border border-purple-500/20
                  bg-gradient-to-br
                  from-[#160d2b]/90
                  via-[#1d1038]/80
                  to-[#0d0718]/90
                  p-4
                  shadow-xl
                  shadow-purple-950/30
                  backdrop-blur-xl
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:border-purple-400/30
                  hover:shadow-purple-900/40
                  sm:p-5
                "
              >
                {/* Top gradient */}
                <div
                  className="
                    absolute left-0 right-0 top-0
                    h-[2px]
                    bg-gradient-to-r
                    from-transparent
                    via-purple-500
                    to-fuchsia-500
                  "
                />

                {/* Header */}
                <div
                  className="
                    mb-4
                    flex flex-col gap-2
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                  "
                >
                  <h2
                    className="
                      bg-gradient-to-r
                      from-purple-200
                      to-fuchsia-300
                      bg-clip-text
                      text-lg
                      font-black
                      text-transparent
                    "
                  >
                    ویرایش تصویر {history.length - index}
                  </h2>

                  <span
                    className="
                      w-fit
                      rounded-lg
                      border border-purple-500/20
                      bg-gradient-to-r
                      from-purple-500/10
                      to-fuchsia-500/10
                      px-3 py-1.5
                      text-[11px]
                      text-purple-200
                    "
                  >
                    {new Date(item.createdAt).toLocaleString("fa-IR")}
                  </span>
                </div>

                {/* Images */}
                <div
                  className="
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-4
                    sm:flex-row
                    sm:items-start
                  "
                >
                  {/* Before */}
                  <div
                    className="
                      w-full
                      max-w-[240px]
                      overflow-hidden
                      rounded-xl
                      border border-purple-500/10
                      bg-black/20
                      p-2
                    "
                  >
                    <h3
                      className="
                        mb-2
                        text-center
                        text-sm
                        font-bold
                        text-slate-300
                      "
                    >
                      تصویر اولیه
                    </h3>

                    <img
                      src={`http://localhost:5000${item.beforeImage}`}
                      alt="Before"
                      className="
                        aspect-video
                        w-full
                        rounded-lg
                        object-cover
                        transition-transform duration-500
                        group-hover:scale-[1.01]
                      "
                    />
                  </div>

                  {/* After */}
                  <div
                    className="
                      w-full
                      max-w-[240px]
                      overflow-hidden
                      rounded-xl
                      border border-purple-400/20
                      bg-gradient-to-br
                      from-purple-500/[0.05]
                      to-fuchsia-500/[0.03]
                      p-2
                      shadow-md
                      shadow-purple-950/20
                    "
                  >
                    <h3
                      className="
                        mb-2
                        text-center
                        text-sm
                        font-bold
                        text-purple-200
                      "
                    >
                      نتیجه ویرایش
                    </h3>

                    <img
                      src={item.afterImage}
                      alt="After"
                      className="
                        aspect-video
                        w-full
                        rounded-lg
                        object-cover
                        transition-transform duration-500
                        group-hover:scale-[1.01]
                      "
                    />
                  </div>
                </div>

                {/* Information */}
                <div
                  className="
                    mt-4
                    grid gap-3
                    sm:grid-cols-2
                    lg:grid-cols-3
                  "
                >
                  <Info
                    title="نوع ویرایش"
                    value={item.firstSelect}
                  />

                  <Info
                    title="میزان تغییر"
                    value={item.secondSelect}
                  />

                  <Info
                    title="دستگاه"
                    value={item.device}
                  />

                  <Info
                    title="درخواست"
                    value={item.request}
                  />

                  <Info
                    title="برند"
                    value={item.brand}
                  />

                  {item.description && (
                    <Info
                      title="توضیحات"
                      value={item.description}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Info({ title, value }) {
  return (
    <div
      className="
        rounded-xl
        border border-purple-500/10
        bg-gradient-to-br
        from-white/[0.04]
        to-purple-500/[0.03]
        p-3
        transition-all duration-300
        hover:-translate-y-0.5
        hover:border-purple-400/20
        hover:bg-purple-500/[0.06]
      "
    >
      <span className="text-xs text-slate-400">
        {title}
      </span>

      <p className="mt-1.5 break-words text-sm font-bold text-purple-50">
        {value || "-"}
      </p>
    </div>
  );
}

export default HistoryPage;