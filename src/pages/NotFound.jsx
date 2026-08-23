import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      dir="rtl"
      className="
        relative flex min-h-screen
        items-center justify-center
        overflow-hidden
        bg-gradient-to-br
        from-[#08040f]
        via-[#160d2b]
        to-[#0d0718]
        px-6
        text-white
      "
    >
      {/* Background glow */}
      <div
        className="
          pointer-events-none absolute
          -right-40 -top-40
          h-96 w-96
          rounded-full
          bg-purple-600/20
          blur-[120px]
          animate-pulse
        "
      />

      <div
        className="
          pointer-events-none absolute
          -bottom-40 -left-40
          h-96 w-96
          rounded-full
          bg-fuchsia-600/15
          blur-[120px]
          animate-pulse
        "
      />

      <div className="relative w-full max-w-2xl text-center">
        {/* 404 */}
        <div className="relative mb-8">
          <div
            className="
              pointer-events-none absolute
              inset-0
              rounded-full
              bg-purple-600/15
              blur-[80px]
              animate-pulse
            "
          />

          <h1
            className="
              relative
              text-[120px]
              font-black
              leading-none
              tracking-tighter
              text-transparent
              bg-gradient-to-b
              from-purple-200
              via-purple-500
              to-fuchsia-600
              bg-clip-text
              drop-shadow-[0_0_35px_rgba(168,85,247,0.25)]
              sm:text-[180px]
            "
          >
            404
          </h1>
        </div>

        {/* Icon */}
        <div
          className="
            mx-auto mb-6
            flex h-16 w-16
            items-center justify-center
            rounded-2xl
            border border-purple-500/20
            bg-gradient-to-br
            from-purple-500/15
            to-fuchsia-500/10
            text-3xl
            shadow-xl
            shadow-purple-950/30
            transition-all duration-500
            hover:scale-110
            hover:rotate-3
          "
        >
          🔍
        </div>

        {/* Title */}
        <h2
          className="
            text-2xl font-black
            text-transparent
            bg-gradient-to-r
            from-purple-200
            via-fuchsia-300
            to-purple-300
            bg-clip-text
            sm:text-3xl
          "
        >
          صفحه موردنظر پیدا نشد
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-400">
          متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا ممکن است
          جابه‌جا شده باشد.
        </p>

        {/* Divider */}
        <div
          className="
            mx-auto mt-7
            h-[2px] w-20
            rounded-full
            bg-gradient-to-r
            from-purple-500
            via-fuchsia-500
            to-purple-500
          "
        />

        {/* Button */}
        <Link
          to="/"
          className="
            group relative mt-8
            inline-flex
            overflow-hidden
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-r
            from-purple-600
            via-violet-600
            to-fuchsia-600
            px-8 py-3.5
            font-bold
            text-white
            shadow-xl
            shadow-purple-600/30
            transition-all duration-300

            hover:-translate-y-1
            hover:shadow-2xl
            hover:shadow-purple-500/40
            active:scale-95
          "
        >
          {/* Shine */}
          <span
            className="
              absolute inset-y-0 -left-full
              w-1/2
              skew-x-[-20deg]
              bg-gradient-to-r
              from-transparent
              via-white/20
              to-transparent
              transition-all duration-700
              group-hover:left-[130%]
            "
          />

          <span className="relative flex items-center gap-2">
            <span>بازگشت به صفحه اصلی</span>

            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
          </span>
        </Link>
      </div>

      {/* Bottom gradient */}
      <div
        className="
          pointer-events-none absolute
          bottom-0 left-1/2
          h-[2px] w-1/3
          -translate-x-1/2
          rounded-full
          bg-gradient-to-r
          from-transparent
          via-fuchsia-500
          to-transparent
        "
      />
    </div>
  );
}

export default NotFound;