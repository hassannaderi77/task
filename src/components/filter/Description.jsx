import React from "react";

function Description({ description, setDescription }) {
  return (
    <div className="mt-6" dir="rtl">
      <div className="mb-3 flex items-center justify-between">
        <label
          className="
            text-sm font-medium
            text-purple-200
          "
        >
          توضیحات اضافی
        </label>

        <span
          className="
            rounded-lg
            border border-purple-500/20
            bg-gradient-to-r from-purple-500/10 to-fuchsia-500/10
            px-2.5 py-1
            text-xs font-medium
            text-purple-300
          "
        >
          {description.length}/500
        </span>
      </div>

      <div
        className="
          group relative overflow-hidden
          rounded-2xl
          border border-purple-500/20
          bg-gradient-to-br from-[#160d2b] via-[#1b1033] to-[#0d0718]
          shadow-lg shadow-purple-950/20
          transition-all duration-300
          focus-within:border-purple-400/60
          focus-within:shadow-xl
          focus-within:shadow-purple-900/30
        "
      >
        {/* Decorative gradient */}
        <div
          className="
            pointer-events-none absolute
            -right-12 -top-12
            h-24 w-24
            rounded-full
            bg-purple-600/10
            blur-3xl
            transition-all duration-500
            group-focus-within:bg-purple-500/20
          "
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={500}
          rows={4}
          placeholder="اگر توضیح خاصی برای ویرایش تصویر دارید اینجا بنویسید..."
          className="
            relative z-10
            min-h-[120px]
            w-full
            resize-none
            bg-transparent
            px-5 py-4
            text-sm leading-7
            text-white
            placeholder:text-slate-500
            outline-none
            transition-all duration-300

            focus:placeholder:text-purple-400/50
          "
        />

        {/* Bottom gradient line */}
        <div
          className="
            absolute bottom-0 left-0 right-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-purple-500/40
            to-transparent
            opacity-0
            transition-opacity duration-300
            group-focus-within:opacity-100
          "
        />
      </div>
    </div>
  );
}

export default Description;