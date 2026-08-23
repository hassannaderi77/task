function Loading({
  text = "در حال دریافت اطلاعات...",
}) {
  return (
    <div
      dir="rtl"
      className="
        flex items-center justify-center
        py-12
      "
    >
      <div
        className="
          group relative overflow-hidden
          rounded-3xl
          border border-purple-500/20
          bg-gradient-to-br
          from-[#160d2b]
          via-[#1d1038]
          to-[#0d0718]
          px-10 py-8
          text-center
          shadow-2xl
          shadow-purple-950/30
        "
      >
        {/* Glow */}
        <div
          className="
            pointer-events-none absolute
            -right-12 -top-12
            h-28 w-28
            rounded-full
            bg-purple-600/20
            blur-3xl
          "
        />

        <div className="relative">
          {/* Spinner */}
          <div
            className="
              relative mx-auto mb-5
              h-14 w-14
              animate-spin
              rounded-full
              border-[4px]
              border-purple-500/10
              border-t-purple-400
              border-r-fuchsia-500
              shadow-lg
              shadow-purple-500/20
            "
          >
            <div
              className="
                absolute inset-[6px]
                rounded-full
                bg-gradient-to-br
                from-purple-500/20
                to-fuchsia-500/10
                blur-sm
              "
            />
          </div>

          {/* Loading dots */}
          <div className="mb-3 flex justify-center gap-1.5">
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

          <p
            className="
              text-sm font-medium
              text-slate-300
              transition-colors duration-300
              group-hover:text-purple-200
            "
          >
            {text}
          </p>
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
            via-purple-500
            to-transparent
          "
        />
      </div>
    </div>
  );
}

export default Loading;