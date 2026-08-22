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
        نوع ویرایش تصویر
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
            نوع ویرایش را انتخاب کنید
          </option>

          <option value="background_remove">
            حذف پس‌زمینه
          </option>

          <option value="background_change">
            تغییر پس‌زمینه
          </option>

          <option value="object_remove">
            حذف یک شیء از تصویر
          </option>

          <option value="object_add">
            اضافه کردن شیء به تصویر
          </option>
        </select>

        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          ▼
        </span>
      </div>
    </div>
  );
}

export default Numberone;