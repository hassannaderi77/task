function EmptyState({
  message = "اطلاعاتی برای نمایش وجود ندارد.",
}) {
  return (
    <div
      dir="rtl"
      className="
        group relative overflow-hidden
        rounded-3xl
        border border-purple-500/20
        bg-gradient-to-br
        from-[#160d2b]
        via-[#1d1038]
        to-[#0d0718]
        p-10
        text-center
        shadow-2xl
        shadow-purple-950/30
        transition-all duration-500
        hover:border-purple-400/30
        hover:shadow-purple-900/40
      "
    >
      {/* Decorative gradients */}
      <div
        className="
          pointer-events-none absolute
          -right-20 -top-20
          h-40 w-40
          rounded-full
          bg-purple-600/15
          blur-3xl
          transition-all duration-700
          group-hover:bg-purple-500/25
        "
      />

      <div
        className="
          pointer-events-none absolute
          -bottom-20 -left-20
          h-40 w-40
          rounded-full
          bg-fuchsia-600/10
          blur-3xl
          transition-all duration-700
          group-hover:bg-fuchsia-500/20
        "
      />

      {/* Icon */}
      <div
        className="
          relative mx-auto mb-5
          flex h-20 w-20
          items-center justify-center
          rounded-3xl
          border border-purple-400/20
          bg-gradient-to-br
          from-purple-500/20
          via-purple-500/10
          to-fuchsia-500/10
          text-4xl
          shadow-xl
          shadow-purple-950/30
          transition-all duration-500
          group-hover:scale-110
          group-hover:-rotate-2
        "
      >
        📭

        {/* Glow */}
        <span
          className="
            pointer-events-none absolute inset-0
            rounded-3xl
            bg-gradient-to-br
            from-purple-500/10
            to-fuchsia-500/10
            opacity-0
            blur-xl
            transition-opacity duration-500
            group-hover:opacity-100
          "
        />
      </div>

      {/* Message */}
      <p
        className="
          relative
          mx-auto max-w-md
          text-sm font-medium
          leading-7
          text-slate-400
          transition-colors duration-300
          group-hover:text-slate-300
        "
      >
        {message}
      </p>

      {/* Bottom gradient */}
      <div
        className="
          absolute bottom-0 left-1/2
          h-[2px] w-0
          -translate-x-1/2
          rounded-full
          bg-gradient-to-r
          from-purple-500
          via-fuchsia-500
          to-purple-500
          transition-all duration-500
          group-hover:w-1/3
        "
      />
    </div>
  );
}

export default EmptyState;