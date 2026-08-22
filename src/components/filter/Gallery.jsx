import React from "react";

function Gallery({ cameraRef, galleryRef, check, setImages }) {
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 0) {
      setImages((prev) => [...prev, ...files]);
    }
  };

  const boxStyle = `
    flex cursor-pointer flex-col items-center justify-center
    rounded-3xl border-2 border-dashed p-8
    transition-all duration-300
  `;

  return (
    <div className="mt-8 grid gap-5 md:grid-cols-2">

      <div
        className="
        rounded-3xl border border-slate-800
        bg-linear-to-br from-slate-900 to-slate-950
        p-5 shadow-xl
        "
      >
        <h3 className="mb-4 text-right text-lg font-bold text-white" dir="rtl">
          انتخاب از گالری
        </h3>

        <label
          className={`
          ${boxStyle}
          ${
            check
              ? "border-slate-600 bg-slate-800/50 hover:border-blue-500 hover:bg-blue-500/10"
              : "cursor-not-allowed border-slate-800 bg-slate-900 opacity-40"
          }
          `}
        >
          <span className="mb-3 text-5xl">
            🖼️
          </span>

          <span className="text-sm font-semibold text-slate-200">
            انتخاب تصاویر
          </span>

          <span className="mt-2 text-xs text-slate-500">
            JPG / PNG
          </span>

          <input
            disabled={!check}
            ref={galleryRef}
            className="hidden"
            type="file"
            accept="image/"
            multiple
            onChange={handleImageChange}
          />
        </label>
      </div>


     
      <div
        className="
        rounded-3xl border border-slate-800
        bg-gradient-to-br from-slate-900 to-slate-950
        p-5 shadow-xl
        "
      >
        <h3 className="mb-4 text-right text-lg font-bold text-white" dir="rtl">
          دوربین
        </h3>

        <label
          className={`
          ${boxStyle}

          ${
            check
              ? "border-slate-600 bg-slate-800/50 hover:border-blue-500 hover:bg-blue-500/10"
              : "cursor-not-allowed border-slate-800 bg-slate-900 opacity-40"
          }
          `}
        >
          <span className="mb-3 text-5xl">
            📷
          </span>

          <span className="text-sm font-semibold text-slate-200">
            گرفتن عکس جدید
          </span>

          <span className="mt-2 text-xs text-slate-500">
            باز کردن دوربین دستگاه
          </span>

          <input
            disabled={!check}
            ref={cameraRef}
            className="hidden"
            type="file"
            accept="image/"
            capture="environment"
            onChange={handleImageChange}
          />
        </label>
      </div>

    </div>
  );
}

export default Gallery;