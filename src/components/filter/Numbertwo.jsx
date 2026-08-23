import React from "react";

function Numbertwo({ secondSelect, setSecondSelect }) {
  return (
    <div
      className="
        relative mt-5 overflow-hidden
        rounded-3xl
        border border-purple-500/20
        bg-gradient-to-br
        from-[#160d2b]
        via-[#1d1038]
        to-[#0d0718]
        p-5
        shadow-2xl shadow-purple-950/30
        sm:p-7
      "
      dir="rtl"
    >
      {/* Decorative gradients */}
      <div
        className="
          pointer-events-none absolute
          -right-16 -top-16
          h-36 w-36
          rounded-full
          bg-fuchsia-600/10
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none absolute
          -bottom-20 -left-16
          h-40 w-40
          rounded-full
          bg-purple-600/10
          blur-3xl
        "
      />

      <label
        className="
          relative mb-3 block
          text-right text-sm font-bold
          text-purple-100
        "
      >
        میزان تغییر تصویر
      </label>

      <div className="relative">
        <select
          className="
            w-full appearance-none
            rounded-2xl
            border border-purple-500/20
            bg-gradient-to-r
            from-purple-950/60
            via-purple-900/40
            to-fuchsia-950/40
            px-5 py-4
            pl-12
            text-right text-sm
            font-medium
            text-white
            outline-none

            transition-all duration-300

            hover:border-purple-400/40
            hover:shadow-lg
            hover:shadow-purple-950/20

            focus:border-fuchsia-400/70
            focus:ring-4
            focus:ring-fuchsia-500/15
            focus:shadow-xl
            focus:shadow-fuchsia-900/30

            sm:text-base
          "
          value={secondSelect}
          onChange={(e) => setSecondSelect(e.target.value)}
        >
          <option value="" disabled className="bg-[#160d2b] text-slate-400">
            میزان تغییر را انتخاب کنید
          </option>

          <option value="minimal" className="bg-[#160d2b] text-white">
            تغییر جزئی
          </option>

          <option value="moderate" className="bg-[#160d2b] text-white">
            تغییر متوسط
          </option>

          <option value="strong" className="bg-[#160d2b] text-white">
            تغییر قابل توجه
          </option>

          <option value="creative" className="bg-[#160d2b] text-white">
            ویرایش خلاقانه
          </option>
        </select>

        <span
          className="
            pointer-events-none
            absolute left-4 top-1/2
            flex h-8 w-8
            -translate-y-1/2
            items-center justify-center
            rounded-lg
            bg-gradient-to-br
            from-fuchsia-500/20
            to-purple-500/10
            text-xs
            text-fuchsia-300
            transition-all duration-300
          "
        >
          ▼
        </span>
      </div>
    </div>
  );
}

export default Numbertwo;
