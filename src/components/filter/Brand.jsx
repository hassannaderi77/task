import React from "react";

function Brand({ brand, setBrand }) {
  const brands = [
    {
      value: "product",
      title: "محصول",
      icon: "📦",
      description: "تصویر یک محصول یا کالا",
    },
    {
      value: "person",
      title: "شخص",
      icon: "👤",
      description: "تصویر شخص یا پرتره",
    },
    {
      value: "object",
      title: "شیء",
      icon: "🔹",
      description: "تصویر یک شیء یا وسیله",
    },
  ];

  return (
    <div
      className="
        relative overflow-hidden rounded-3xl
        border border-purple-500/20
        bg-gradient-to-br from-[#160d2b] via-[#1d1038] to-[#0d0718]
        p-5
        shadow-2xl shadow-purple-950/30
      "
      dir="rtl"
    >
      {/* Decorative gradient */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-purple-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-16 h-36 w-36 rounded-full bg-fuchsia-600/10 blur-3xl" />

      <h3
        className="
          relative mb-5 flex items-center gap-2
          text-right text-lg font-bold text-white
        "
      >
        <span
          className="
            flex h-9 w-9 items-center justify-center
            rounded-xl
            bg-gradient-to-br from-purple-500 to-fuchsia-600
            text-sm
            shadow-lg shadow-purple-500/20
          "
        >
          ✨
        </span>

        نوع تصویر
      </h3>

      <div className="relative flex flex-col gap-3">
        {brands.map((item) => (
          <label
            key={item.value}
            className={`
              group relative flex cursor-pointer items-center gap-4
              overflow-hidden rounded-2xl border p-4
              transition-all duration-300 ease-out

              ${
                brand === item.value
                  ? `
                    border-purple-400/70
                    bg-gradient-to-r from-purple-600/20 via-purple-500/10 to-fuchsia-500/10
                    shadow-lg shadow-purple-900/30
                    scale-[1.01]
                  `
                  : `
                    border-purple-500/10
                    bg-white/[0.03]
                    hover:-translate-y-0.5
                    hover:border-purple-400/40
                    hover:bg-purple-500/[0.07]
                    hover:shadow-lg hover:shadow-purple-950/20
                  `
              }
            `}
          >
            {/* Active gradient line */}
            {brand === item.value && (
              <span
                className="
                  absolute right-0 top-0 h-full w-1
                  bg-gradient-to-b from-purple-400 via-fuchsia-500 to-purple-700
                "
              />
            )}

            <input
              className="hidden"
              type="radio"
              name="imageType"
              value={item.value}
              checked={brand === item.value}
              onChange={(e) => setBrand(e.target.value)}
            />

            <span
              className={`
                flex h-12 w-12 shrink-0 items-center justify-center
                rounded-2xl text-2xl
                transition-all duration-300
                ${
                  brand === item.value
                    ? "bg-gradient-to-br from-purple-500/30 to-fuchsia-500/20 shadow-lg shadow-purple-500/20"
                    : "bg-purple-500/5 group-hover:bg-purple-500/10"
                }
              `}
            >
              {item.icon}
            </span>

            <div className="flex min-w-0 flex-1 flex-col">
              <span
                className={`
                  text-sm font-semibold transition-colors duration-300
                  ${
                    brand === item.value
                      ? "text-purple-300"
                      : "text-slate-200 group-hover:text-purple-200"
                  }
                `}
              >
                {item.title}
              </span>

              <span
                className="
                  mt-1 text-xs leading-5
                  text-slate-400 transition-colors duration-300
                  group-hover:text-slate-300
                "
              >
                {item.description}
              </span>
            </div>

            {brand === item.value && (
              <span
                className="
                  mr-auto flex h-7 w-7 shrink-0
                  items-center justify-center
                  rounded-full
                  bg-gradient-to-br from-purple-500 to-fuchsia-600
                  text-sm font-bold text-white
                  shadow-lg shadow-purple-500/30
                  animate-[pulse_2s_ease-in-out_infinite]
                "
              >
                ✓
              </span>
            )}
          </label>
        ))}
      </div>
    </div>
  );
}

export default Brand;