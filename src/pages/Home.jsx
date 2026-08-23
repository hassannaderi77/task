import { useNavigate } from "react-router-dom";

import {
  FiSend,
  FiShoppingBag,
  FiPackage,
} from "react-icons/fi";

function Home() {
  const navigate = useNavigate();

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
        px-4 py-10
        text-white
      "
    >
      {/* Background glows */}
      <div
        className="
          pointer-events-none absolute
          -right-32 -top-32
          h-80 w-80
          rounded-full
          bg-purple-600/20
          blur-[110px]
          animate-pulse
        "
      />

      <div
        className="
          pointer-events-none absolute
          -bottom-32 -left-32
          h-80 w-80
          rounded-full
          bg-fuchsia-600/15
          blur-[110px]
          animate-pulse
        "
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Demo Button */}
        <div className="mb-10 flex justify-center">
          <button
            onClick={() => navigate("/demo")}
            className="
              group relative
              overflow-hidden
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

            <span
              className="
                relative
                flex
                items-center
                gap-2
              "
            >
              <FiSend
                className="
                  text-lg
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                  group-hover:rotate-12
                "
              />

              <span>نسخه دمو</span>
            </span>
          </button>
        </div>

        {/* Header */}
        <div className="mb-10 text-center">
          <div
            className="
              mx-auto mb-5
              flex h-20 w-20
              items-center justify-center
              rounded-3xl
              border border-purple-400/20
              bg-gradient-to-br
              from-purple-500/20
              via-purple-500/10
              to-fuchsia-500/10
              text-purple-200
              shadow-xl
              shadow-purple-950/30
              transition-all duration-500
              hover:scale-110
              hover:rotate-2
            "
          >
            <FiShoppingBag
              className="
                text-4xl
                transition-transform
                duration-500
              "
            />
          </div>

          <h1
            className="
              bg-gradient-to-r
              from-purple-200
              via-fuchsia-300
              to-purple-300
              bg-clip-text
              text-4xl
              font-black
              text-transparent
              sm:text-5xl
            "
          >
            محصولات
          </h1>

          <p className="mt-3 text-slate-400">
            محصولات موجود در فروشگاه
          </p>

          <div
            className="
              mx-auto mt-5
              h-1 w-20
              rounded-full
              bg-gradient-to-r
              from-purple-500
              to-fuchsia-500
            "
          />
        </div>

        {/* Empty Products State */}
        <div
          className="
            group relative
            flex min-h-[360px]
            items-center justify-center
            overflow-hidden
            rounded-[2rem]
            border border-purple-500/20
            bg-gradient-to-br
            from-[#160d2b]/90
            via-[#1d1038]/70
            to-[#0d0718]/90
            shadow-2xl
            shadow-purple-950/30
            backdrop-blur-xl
            transition-all duration-500
            hover:border-purple-400/30
            hover:shadow-purple-950/40
          "
        >
          {/* Decorative glow */}
          <div
            className="
              pointer-events-none absolute
              -right-20 -top-20
              h-44 w-44
              rounded-full
              bg-purple-600/10
              blur-3xl
              transition-all duration-700
              group-hover:bg-purple-500/20
            "
          />

          <div
            className="
              pointer-events-none absolute
              -bottom-20 -left-20
              h-44 w-44
              rounded-full
              bg-fuchsia-600/10
              blur-3xl
            "
          />

          <div className="relative px-6 text-center">
            <div
              className="
                mx-auto mb-6
                flex h-24 w-24
                items-center justify-center
                rounded-3xl
                border border-purple-400/20
                bg-gradient-to-br
                from-purple-500/15
                to-fuchsia-500/10
                text-purple-200
                shadow-xl
                shadow-purple-950/30
                transition-all duration-500
                group-hover:scale-110
                group-hover:-rotate-2
              "
            >
              <FiPackage
                className="
                  text-5xl
                  transition-transform
                  duration-500
                "
              />
            </div>

            <h2
              className="
                bg-gradient-to-r
                from-purple-200
                to-fuchsia-300
                bg-clip-text
                text-2xl
                font-black
                text-transparent
              "
            >
              محصولی موجود نمی‌باشد
            </h2>

            <p
              className="
                mt-3
                text-sm
                leading-7
                text-slate-400
              "
            >
              در حال حاضر محصولی برای نمایش وجود ندارد.
            </p>
          </div>

          {/* Bottom gradient */}
          <div
            className="
              absolute bottom-0 left-1/2
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
      </div>
    </div>
  );
}

export default Home;