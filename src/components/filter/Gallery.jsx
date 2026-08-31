import React from "react";

import { FiImage, FiCamera, FiCheck } from "react-icons/fi";

function Gallery({ cameraRef, galleryRef, check, setImages }) {
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length > 0) {
      setImages((prev) => [...prev, ...imageFiles]);
    }

    e.target.value = "";
  };

  const boxStyle = `
    group
    flex cursor-pointer items-center gap-4
    rounded-2xl border border-dashed
    px-4 py-3
    transition-all duration-300 ease-out
  `;

  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      {/* Gallery */}
      <div
        className="
          group/card relative overflow-hidden
          rounded-2xl
          border border-purple-500/20
          bg-gradient-to-br
          from-[#160d2b]
          via-[#1d1038]
          to-[#0d0718]
          p-3
          shadow-lg shadow-purple-950/15
          transition-all duration-300
          hover:border-purple-400/30
          hover:shadow-xl
        "
      >
        {/* Decorative gradient */}
        <div
          className="
            pointer-events-none absolute
            -right-12 -top-12
            h-28 w-28
            rounded-full
            bg-purple-600/15
            blur-3xl
          "
        />

        <h3
          className="
            relative z-10 mb-2
            flex items-center gap-2
            text-right text-base font-medium text-white
          "
          dir="rtl"
        >
          <span
            className="
              flex h-8 w-8 items-center justify-center
              rounded-xl
              bg-gradient-to-br
              from-purple-500
              to-fuchsia-600
              text-sm
            "
          >
            <FiImage />
          </span>
          انتخاب از گالری
        </h3>

        <label
          className={`
            relative z-10
            ${boxStyle}
            ${
              check
                ? `
                  border-purple-500/30
                  bg-purple-500/[0.04]
                  hover:border-purple-400/60
                  hover:bg-purple-500/[0.08]
                `
                : `
                  cursor-not-allowed
                  border-purple-500/10
                  bg-purple-950/20
                  opacity-40
                `
            }
          `}
        >
          <span
            className="
              flex h-11 w-11 shrink-0
              items-center justify-center
              rounded-2xl
              bg-gradient-to-br
              from-purple-500/20
              to-fuchsia-500/10
              text-xl
              text-purple-300
              transition-transform duration-300
              group-hover:scale-105
            "
          >
            <FiImage />
          </span>

          <span className="flex flex-1 flex-col text-right">
            <span
              className="
                text-sm font-medium
                text-slate-200
                transition-colors
                group-hover:text-purple-200
              "
            >
              انتخاب تصاویر
            </span>

            <span className="mt-1 text-xs text-slate-500">
              JPG / PNG / WEBP
            </span>
          </span>

          {check && (
            <span
              className="
                hidden items-center gap-1
                rounded-full
                border border-purple-500/20
                bg-purple-500/10
                px-3 py-1.5
                text-[10px]
                text-purple-300
                sm:flex
              "
            >
              <FiCheck />
              انتخاب
            </span>
          )}

          <input
            ref={galleryRef}
            disabled={!check}
            className="hidden"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        </label>
      </div>

      {/* Camera */}
      <div
        className="
          group/card relative overflow-hidden
          rounded-2xl
          border border-purple-500/20
          bg-gradient-to-br
          from-[#160d2b]
          via-[#1d1038]
          to-[#0d0718]
          p-3
          shadow-lg shadow-purple-950/15
          transition-all duration-300
          hover:border-purple-400/30
          hover:shadow-xl
        "
      >
        {/* Decorative gradient */}
        <div
          className="
            pointer-events-none absolute
            -left-12 -bottom-12
            h-28 w-28
            rounded-full
            bg-fuchsia-600/10
            blur-3xl
          "
        />

        <h3
          className="
            relative z-10 mb-2
            flex items-center gap-2
            text-right text-base font-medium text-white
          "
          dir="rtl"
        >
          <span
            className="
              flex h-8 w-8 items-center justify-center
              rounded-xl
              bg-gradient-to-br
              from-fuchsia-500
              to-purple-600
              text-sm
            "
          >
            <FiCamera />
          </span>
          دوربین
        </h3>

        <label
          className={`
            relative z-10
            ${boxStyle}
            ${
              check
                ? `
                  border-purple-500/30
                  bg-purple-500/[0.04]
                  hover:border-fuchsia-400/60
                  hover:bg-fuchsia-500/[0.06]
                `
                : `
                  cursor-not-allowed
                  border-purple-500/10
                  bg-purple-950/20
                  opacity-40
                `
            }
          `}
        >
          <span
            className="
              flex h-11 w-11 shrink-0
              items-center justify-center
              rounded-2xl
              bg-gradient-to-br
              from-fuchsia-500/20
              to-purple-500/10
              text-xl
              text-fuchsia-300
              transition-transform duration-300
              group-hover:scale-105
            "
          >
            <FiCamera />
          </span>

          <span className="flex flex-1 flex-col text-right">
            <span
              className="
                text-sm font-medium
                text-slate-200
                transition-colors
                group-hover:text-purple-200
              "
            >
              گرفتن عکس جدید
            </span>

            <span className="mt-1 text-xs text-slate-500">
              باز کردن دوربین دستگاه
            </span>
          </span>

          {check && (
            <span
              className="
                hidden items-center gap-1
                rounded-full
                border border-fuchsia-500/20
                bg-fuchsia-500/10
                px-3 py-1.5
                text-[10px]
                text-fuchsia-300
                sm:flex
              "
            >
              <FiCamera />
              دوربین
            </span>
          )}

          <input
            ref={cameraRef}
            disabled={!check}
            className="hidden"
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImageChange}
          />
        </label>
      </div>
    </div>
  );
}

export default Gallery;
