import React from "react";

function Description({description, setDescription}) {
  return (
    <div className="mt-6">
      <label className="mb-2 block text-sm font-bold text-slate-300">
        توضیحات اضافی
      </label>

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="اگر توضیح خاصی برای ویرایش تصویر دارید اینجا بنویسید..."
        rows={4}
        className="
      w-full
      resize-none
      rounded-2xl
      border
      border-slate-800
      bg-slate-950
      px-5
      py-4
      text-sm
      text-white
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
