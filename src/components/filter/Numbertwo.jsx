import React from "react";

function Numbertwo({ secondSelect, setSecondSelect }) {
  return (
    <div
      className="
        mt-5 rounded-3xl border border-slate-800
        bg-gradient-to-br from-slate-900 to-slate-950
        p-5 shadow-2xl shadow-black/20
        sm:p-7
      "
      dir="rtl"
    >
      <label className="mb-3 block text-right text-sm font-semibold text-slate-200">
        میزان تغییر تصویر
      </label>

      <div className="relative">
        <select
          className="
            w-full appearance-none rounded-2xl
            border border-slate-700
            bg-slate-800/80
            px-5 py-4
            text-right text-sm text-white
            outline-none
            transition-all duration-300
            hover:border-slate-500
            focus:border-blue-500
            focus:ring-4 focus:ring-blue-500/20
            sm:text-base
          "
          value={secondSelect}
          onChange={(e) => setSecondSelect(e.target.value)}
        >
          <option value="" disabled>
            میزان تغییر را انتخاب کنید
          </option>

          <option value="minimal">
            تغییر جزئی
          </option>

          <option value="moderate">
            تغییر متوسط
          </option>

          <option value="strong">
            تغییر قابل توجه
          </option>

          <option value="creative">
            ویرایش خلاقانه
          </option>
        </select>

        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          ▼
        </span>
      </div>
    </div>
  );
}

export default Numbertwo;