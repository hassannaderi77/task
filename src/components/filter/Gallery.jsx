import React from "react";

function Gallery({ cameraRef, galleryRef, check, setImages }) {
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    const imageFiles = files.filter((file) =>
      file.type.startsWith("image/")
    );

    if (imageFiles.length > 0) {
      setImages((prev) => [...prev, ...imageFiles]);
    }

    e.target.value = "";
  };

  const boxStyle = `
    group
    flex cursor-pointer flex-col items-center justify-center
    rounded-3xl border-2 border-dashed p-8
    transition-all duration-300 ease-out
  `;

  return (
    <div className="mt-8 grid gap-5 md:grid-cols-2">
      {/* Gallery */}
      <div
        className="
          group/card relative overflow-hidden
          rounded-3xl
          border border-purple-500/20
          bg-gradient-to-br from-[#160d2b] via-[#1d1038] to-[#0d0718]
          p-5
          shadow-xl shadow-purple-950/20
          transition-all duration-300
          hover:border-purple-400/30
          hover:shadow-2xl hover:shadow-purple-950/30
        "
      >
        {/* Decorative gradient */}
        <div
          className="
            pointer-events-none absolute
            -right-16 -top-16
            h-36 w-36
            rounded-full
            bg-purple-600/15
            blur-3xl
            transition-all duration-500
            group-hover/card:bg-purple-500/25
          "
        />

        <h3
          className="
            relative z-10 mb-4
            flex items-center justify-between
            text-right text-lg font-bold text-white
          "
          dir="rtl"
        >
          <span className="flex items-center gap-2">
            <span
              className="
                flex h-9 w-9 items-center justify-center
                rounded-xl
                bg-gradient-to-br from-purple-500 to-fuchsia-600
                text-sm
                shadow-lg shadow-purple-500/20
              "
            >
              🖼️
            </span>

            انتخاب از گالری
          </span>
        </h3>

        <label
          className={`
            relative z-10
            ${boxStyle}

            ${
              check
                ? `
                  border-purple-500/30
                  bg-gradient-to-br
                  from-purple-500/[0.06]
                  to-fuchsia-500/[0.03]

                  hover:border-purple-400/70
                  hover:bg-purple-500/[0.10]
                  hover:shadow-lg
                  hover:shadow-purple-900/20
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
              mb-4 flex h-20 w-20
              items-center justify-center
              rounded-3xl
              bg-gradient-to-br
              from-purple-500/20
              to-fuchsia-500/10
              text-5xl
              shadow-inner
              transition-all duration-300
              group-hover:scale-110
              group-hover:rotate-2
            "
          >
            🖼️
          </span>

          <span
            className="
              text-sm font-semibold
              text-slate-200
              transition-colors duration-300
              group-hover:text-purple-200
            "
          >
            انتخاب تصاویر
          </span>

          <span className="mt-2 text-xs text-slate-500">
            JPG / PNG / WEBP
          </span>

          {check && (
            <span
              className="
                mt-4 rounded-full
                border border-purple-500/20
                bg-gradient-to-r
                from-purple-500/10
                to-fuchsia-500/10
                px-4 py-1.5
                text-[11px]
                text-purple-300
              "
            >
              کلیک کنید
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
          rounded-3xl
          border border-purple-500/20
          bg-gradient-to-br from-[#160d2b] via-[#1d1038] to-[#0d0718]
          p-5
          shadow-xl shadow-purple-950/20
          transition-all duration-300
          hover:border-purple-400/30
          hover:shadow-2xl hover:shadow-purple-950/30
        "
      >
        {/* Decorative gradient */}
        <div
          className="
            pointer-events-none absolute
            -left-16 -bottom-16
            h-36 w-36
            rounded-full
            bg-fuchsia-600/10
            blur-3xl
            transition-all duration-500
            group-hover/card:bg-fuchsia-500/20
          "
        />

        <h3
          className="
            relative z-10 mb-4
            flex items-center justify-between
            text-right text-lg font-bold text-white
          "
          dir="rtl"
        >
          <span className="flex items-center gap-2">
            <span
              className="
                flex h-9 w-9 items-center justify-center
                rounded-xl
                bg-gradient-to-br from-fuchsia-500 to-purple-600
                text-sm
                shadow-lg shadow-fuchsia-500/20
              "
            >
              📷
            </span>

            دوربین
          </span>
        </h3>

        <label
          className={`
            relative z-10
            ${boxStyle}

            ${
              check
                ? `
                  border-purple-500/30
                  bg-gradient-to-br
                  from-purple-500/[0.06]
                  to-fuchsia-500/[0.03]

                  hover:border-fuchsia-400/70
                  hover:bg-fuchsia-500/[0.08]
                  hover:shadow-lg
                  hover:shadow-fuchsia-900/20
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
              mb-4 flex h-20 w-20
              items-center justify-center
              rounded-3xl
              bg-gradient-to-br
              from-fuchsia-500/20
              to-purple-500/10
              text-5xl
              shadow-inner
              transition-all duration-300
              group-hover:scale-110
              group-hover:-rotate-2
            "
          >
            📷
          </span>

          <span
            className="
              text-sm font-semibold
              text-slate-200
              transition-colors duration-300
              group-hover:text-purple-200
            "
          >
            گرفتن عکس جدید
          </span>

          <span className="mt-2 text-xs text-slate-500">
            باز کردن دوربین دستگاه
          </span>

          {check && (
            <span
              className="
                mt-4 rounded-full
                border border-fuchsia-500/20
                bg-gradient-to-r
                from-fuchsia-500/10
                to-purple-500/10
                px-4 py-1.5
                text-[11px]
                text-fuchsia-300
              "
            >
              استفاده از دوربین
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