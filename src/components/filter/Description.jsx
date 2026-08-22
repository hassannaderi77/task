import React from "react";

function Description({ description, setDescription }) {
  return (
    <div className="mt-6" dir="rtl">
      <div className="mb-2 flex items-center justify-between">
        <label className="block text-sm font-bold text-slate-300">
          توضیحات اضافی
        </label>

        <span className="text-xs text-slate-500">
          {description.length}/500
        </span>
      </div>

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        maxLength={500}
        rows={4}
        placeholder="اگر توضیح خاصی برای ویرایش تصویر دارید اینجا بنویسید..."
        className="
          w-full
          resize-none
          rounded-2xl
          border border-slate-800
          bg-slate-950
          px-5 py-4
          text-sm text-white
          placeholder:text-slate-500
          outline-none
          transition
          focus:border-blue-500
          focus:ring-4
          focus:ring-blue-500/10
        "
      />
    </div>
  );
}

export default Description;