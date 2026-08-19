import React from "react";

function Numberone({ firstSelect, setFirstSelect }) {
  return (
    <div
      className="
      mt-8 rounded-3xl border border-slate-800 
      bg-gradient-to-br from-slate-900 to-slate-950 
      p-5 shadow-2xl shadow-black/20
      sm:p-7
      "
      dir="rtl"
    >
      <label className="mb-3 block text-right text-sm font-semibold text-slate-200">
        انتخاب گزینه اول
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
          value={firstSelect}
          onChange={(e) => setFirstSelect(e.target.value)}
        >
          <option value="" disabled>
            یکی از موارد زیر را انتخاب کنید
          </option>

          <option value="1">گزینه ۱</option>
          <option value="2">گزینه ۲</option>
          <option value="3">گزینه ۳</option>
          <option value="4">گزینه ۴</option>
        </select>

        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          ▼
        </span>
      </div>
    </div>
  );
}

export default Numberone;