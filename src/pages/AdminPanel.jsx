function AdminPanel() {
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
        p-5 text-white
        sm:p-8
      "
    >
      {/* Background glow */}
      <div
        className="
          pointer-events-none absolute
          -right-32 -top-32
          h-80 w-80
          rounded-full
          bg-purple-600/15
          blur-[110px]
        "
      />

      <div
        className="
          pointer-events-none absolute
          -bottom-32 -left-32
          h-80 w-80
          rounded-full
          bg-fuchsia-600/10
          blur-[110px]
        "
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div
          className="
            relative overflow-hidden
            rounded-3xl
            border border-purple-500/20
            bg-gradient-to-br
            from-[#160d2b]
            via-[#1d1038]
            to-[#0d0718]
            p-6
            shadow-2xl
            shadow-purple-950/30
            sm:p-8
          "
        >
          {/* Header gradient line */}
          <div
            className="
              absolute left-0 right-0 top-0
              h-[2px]
              bg-gradient-to-r
              from-purple-600
              via-fuchsia-500
              to-purple-600
            "
          />

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span
                  className="
                    flex h-12 w-12
                    items-center justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-purple-500
                    to-fuchsia-600
                    text-xl
                    shadow-lg
                    shadow-purple-500/25
                  "
                >
                  🛠️
                </span>

                <div>
                  <h1
                    className="
                      text-3xl font-black
                      text-transparent
                      bg-gradient-to-r
                      from-purple-200
                      via-fuchsia-300
                      to-purple-300
                      bg-clip-text
                    "
                  >
                    پنل مدیریت
                  </h1>

                  <div className="mt-1 h-1 w-20 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500" />
                </div>
              </div>

              <p className="text-sm text-slate-400">
                به پنل مدیریت خوش آمدید.
              </p>
            </div>

            <div
              className="
                rounded-2xl
                border border-purple-500/20
                bg-gradient-to-r
                from-purple-500/10
                to-fuchsia-500/10
                px-4 py-3
                text-center
              "
            >
              <p className="text-xs text-slate-500">
                وضعیت سیستم
              </p>

              <div className="mt-1 flex items-center justify-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

                <span className="text-sm font-semibold text-emerald-300">
                  فعال
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div
            className="
              group relative overflow-hidden
              rounded-3xl
              border border-purple-500/15
              bg-gradient-to-br
              from-purple-500/[0.08]
              via-[#1d1038]
              to-[#0d0718]
              p-6
              shadow-xl shadow-purple-950/20
              transition-all duration-300
              hover:-translate-y-1
              hover:border-purple-400/30
              hover:shadow-2xl
              hover:shadow-purple-950/30
            "
          >
            <div
              className="
                mb-5 flex h-12 w-12
                items-center justify-center
                rounded-2xl
                bg-gradient-to-br
                from-purple-500/20
                to-fuchsia-500/10
                text-xl
              "
            >
              👥
            </div>

            <p className="text-sm text-slate-400">
              کاربران
            </p>

            <p className="mt-2 text-2xl font-black text-white">
              مدیریت کاربران
            </p>
          </div>

          <div
            className="
              group relative overflow-hidden
              rounded-3xl
              border border-purple-500/15
              bg-gradient-to-br
              from-fuchsia-500/[0.06]
              via-[#1d1038]
              to-[#0d0718]
              p-6
              shadow-xl shadow-purple-950/20
              transition-all duration-300
              hover:-translate-y-1
              hover:border-fuchsia-400/30
              hover:shadow-2xl
              hover:shadow-fuchsia-950/30
            "
          >
            <div
              className="
                mb-5 flex h-12 w-12
                items-center justify-center
                rounded-2xl
                bg-gradient-to-br
                from-fuchsia-500/20
                to-purple-500/10
                text-xl
              "
            >
              🖼️
            </div>

            <p className="text-sm text-slate-400">
              تصاویر
            </p>

            <p className="mt-2 text-2xl font-black text-white">
              مدیریت تصاویر
            </p>
          </div>

          <div
            className="
              group relative overflow-hidden
              rounded-3xl
              border border-purple-500/15
              bg-gradient-to-br
              from-violet-500/[0.06]
              via-[#1d1038]
              to-[#0d0718]
              p-6
              shadow-xl shadow-purple-950/20
              transition-all duration-300
              hover:-translate-y-1
              hover:border-violet-400/30
              hover:shadow-2xl
              hover:shadow-violet-950/30
            "
          >
            <div
              className="
                mb-5 flex h-12 w-12
                items-center justify-center
                rounded-2xl
                bg-gradient-to-br
                from-violet-500/20
                to-purple-500/10
                text-xl
              "
            >
              ⚙️
            </div>

            <p className="text-sm text-slate-400">
              تنظیمات
            </p>

            <p className="mt-2 text-2xl font-black text-white">
              تنظیمات سیستم
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;