function ErrorMessage({
  message = "خطایی در دریافت اطلاعات رخ داده است.",
}) {
  return (
    <div
      dir="rtl"
      className="
        group relative overflow-hidden
        rounded-3xl
        border border-red-500/20
        bg-gradient-to-br
        from-[#1d0b25]
        via-[#1d1038]
        to-[#0d0718]
        p-6
        text-center
        shadow-2xl
        shadow-red-950/20
        transition-all duration-300
        hover:border-red-400/30
        hover:shadow-red-950/30
      "
    >
      {/* Decorative gradients */}
      <div
        className="
          pointer-events-none absolute
          -right-16 -top-16
          h-32 w-32
          rounded-full
          bg-red-500/10
          blur-3xl
          transition-all duration-500
          group-hover:bg-red-500/20
        "
      />

      <div
        className="
          pointer-events-none absolute
          -bottom-16 -left-16
          h-32 w-32
          rounded-full
          bg-purple-600/10
          blur-3xl
        "
      />

      {/* Error icon */}
      <div
        className="
          relative mx-auto mb-4
          flex h-14 w-14
          items-center justify-center
          rounded-2xl
          border border-red-400/20
          bg-gradient-to-br
          from-red-500/20
          to-purple-500/10
          text-2xl
          shadow-lg
          shadow-red-950/20
          transition-transform duration-300
          group-hover:scale-105
          group-hover:-rotate-2
        "
      >
        ⚠️
      </div>

      <p
        className="
          relative
          text-sm font-semibold
          leading-7
          text-red-300
          transition-colors duration-300
          group-hover:text-red-200
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
          via-red-500
          to-purple-500
          transition-all duration-500
          group-hover:w-1/3
        "
      />
    </div>
  );
}

export default ErrorMessage;