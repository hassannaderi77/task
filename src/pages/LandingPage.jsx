import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

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
        px-4
      "
    >
      {/* Background glow - right */}
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

      {/* Background glow - left */}
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

      {/* Small decorative glow */}
      <div
        className="
          pointer-events-none absolute
          left-1/2 top-1/4
          h-40 w-40
          -translate-x-1/2
          rounded-full
          bg-violet-500/10
          blur-[80px]
        "
      />

      <div
        className="
          group relative
          w-full max-w-3xl
          overflow-hidden
          rounded-[2rem]
          border border-purple-500/20
          bg-gradient-to-br
          from-[#160d2b]/95
          via-[#1d1038]/90
          to-[#0d0718]/95
          p-8
          text-center
          shadow-2xl
          shadow-purple-950/40
          backdrop-blur-2xl
          sm:p-12
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

        {/* Card glow */}
        <div
          className="
            pointer-events-none absolute
            -right-24 -top-24
            h-48 w-48
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
            -bottom-24 -left-24
            h-48 w-48
            rounded-full
            bg-fuchsia-600/10
            blur-3xl
          "
        />

        <div className="relative">
          {/* Icon */}
          <div
            className="
              group/icon mx-auto mb-7
              flex h-24 w-24
              items-center justify-center
              rounded-[2rem]
              border border-purple-400/20
              bg-gradient-to-br
              from-purple-500/20
              via-violet-500/10
              to-fuchsia-500/10
              text-5xl
              shadow-2xl
              shadow-purple-950/30
              transition-all duration-500
              hover:scale-110
              hover:-rotate-3
            "
          >
            <span className="transition-transform duration-500 group-hover/icon:scale-110">
              🚀
            </span>
          </div>

          {/* Heading */}
          <h1
            className="
              text-4xl font-medium
              tracking-tight
              text-transparent
              bg-gradient-to-r
              from-purple-200
              via-fuchsia-300
              to-purple-300
              bg-clip-text
              sm:text-5xl
              md:text-6xl
            "
          >
            Welcome to Modernio
          </h1>

          {/* Underline */}
          <div
            className="
              mx-auto mt-5
              h-1 w-24
              rounded-full
              bg-gradient-to-r
              from-purple-500
              via-fuchsia-500
              to-purple-500
            "
          />

          <p
            className="
              mx-auto mt-6
              max-w-xl
              text-sm leading-8
              text-slate-400
              sm:text-base
            "
          >
            به Modernio خوش آمدید
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            {/* Login */}
            <button
              onClick={() => navigate("/login")}
              className="
                group/button relative
                overflow-hidden
                rounded-2xl
                bg-gradient-to-r
                from-purple-600
                via-violet-600
                to-fuchsia-600
                px-9 py-4
                font-medium
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
                  group-hover/button:left-[130%]
                "
              />

              <span className="relative flex items-center justify-center gap-2">
                <span>ورود</span>
                <span className="transition-transform duration-300 group-hover/button:-translate-x-1">
                  ←
                </span>
              </span>
            </button>

            {/* Register */}
            <button
              onClick={() => navigate("/register")}
              className="
                group/button relative
                overflow-hidden
                rounded-2xl
                border border-purple-500/25
                bg-gradient-to-r
                from-purple-500/[0.08]
                to-fuchsia-500/[0.05]
                px-9 py-4
                font-medium
                text-purple-100
                shadow-lg
                shadow-purple-950/20
                backdrop-blur-md
                transition-all duration-300

                hover:-translate-y-1
                hover:border-purple-400/40
                hover:bg-purple-500/[0.12]
                hover:text-white
                hover:shadow-xl
                hover:shadow-purple-950/30
                active:scale-95
              "
            >
              <span className="relative flex items-center justify-center gap-2">
                <span>ثبت نام</span>
                <span className="transition-transform duration-300 group-hover/button:scale-110">
                  ✨
                </span>
              </span>
            </button>
          </div>

          {/* Bottom hint */}
          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-600">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-purple-500/20" />
            <span>شروع کنید</span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-purple-500/20" />
          </div>
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
  );
}

export default LandingPage;
