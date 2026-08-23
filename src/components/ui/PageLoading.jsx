function PageLoading() {
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
        text-white
      "
    >
      {/* Background gradients */}
      <div
        className="
          pointer-events-none absolute
          -right-32 -top-32
          h-72 w-72
          rounded-full
          bg-purple-600/20
          blur-[100px]
          animate-pulse
        "
      />

      <div
        className="
          pointer-events-none absolute
          -bottom-32 -left-32
          h-72 w-72
          rounded-full
          bg-fuchsia-600/15
          blur-[100px]
          animate-pulse
        "
      />

      {/* Loading Card */}
      <div
        className="
          relative overflow-hidden
          rounded-3xl
          border border-purple-500/20
          bg-gradient-to-br
          from-purple-950/50
          via-[#1d1038]/70
          to-[#0d0718]/80
          px-12 py-10
          text-center
          shadow-2xl
          shadow-purple-950/40
          backdrop-blur-xl
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
            to-transparent
          "
        />

        <div className="relative">
          {/* Spinner */}
          <div
            className="
              relative mx-auto mb-6
              h-16 w-16
              animate-spin
              rounded-full
              border-[4px]
              border-purple-500/10
              border-t-purple-400
              border-r-fuchsia-500
              shadow-xl
              shadow-purple-500/20
            "
          >
            <div
              className="
                absolute inset-2
                rounded-full
                bg-gradient-to-br
                from-purple-500/20
                to-fuchsia-500/10
                blur-md
              "
            />
          </div>

          {/* Logo */}
          <div
            className="
              mx-auto mb-4
              flex h-12 w-12
              items-center justify-center
              rounded-2xl
              bg-gradient-to-br
              from-purple-500
              to-fuchsia-600
              text-xl
              shadow-lg
              shadow-purple-500/25
              animate-[pulse_2s_ease-in-out_infinite]
            "
          >
            ✨
          </div>

          <p
            className="
              text-sm font-semibold
              text-slate-300
              transition-colors duration-300
            "
          >
            در حال بارگذاری صفحه...
          </p>

          {/* Loading dots */}
          <div className="mt-4 flex justify-center gap-1.5">
            <span
              className="
                h-1.5 w-1.5 rounded-full
                bg-purple-400
                animate-[pulse_1.2s_ease-in-out_infinite]
              "
            />

            <span
              className="
                h-1.5 w-1.5 rounded-full
                bg-fuchsia-400
                animate-[pulse_1.2s_ease-in-out_0.2s_infinite]
              "
            />

            <span
              className="
                h-1.5 w-1.5 rounded-full
                bg-purple-300
                animate-[pulse_1.2s_ease-in-out_0.4s_infinite]
              "
            />
          </div>
        </div>

        {/* Bottom gradient */}
        <div
          className="
            absolute bottom-0 left-1/2
            h-[2px] w-1/2
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

export default PageLoading;