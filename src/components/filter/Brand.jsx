import React from "react";

function Brand({ brand, setBrand }) {
  const brands = [
    {
      value: "samsung",
      title: "Samsung",
      icon: "📱",
      description: "سامسونگ",
    },
    {
      value: "xiaomi",
      title: "Xiaomi",
      icon: "📲",
      description: "شیائومی",
    },
    {
      value: "nokia",
      title: "Nokia",
      icon: "📞",
      description: "نوکیا",
    },
  ];

  return (
    <div
      className="
      rounded-3xl border border-slate-800
      bg-gradient-to-br from-slate-900 to-slate-950
      p-5 shadow-2xl shadow-black/20
      "
      dir="rtl"
    >
      <h3 className="mb-5 text-right text-lg font-bold text-white">
        برند دستگاه
      </h3>

      <div className="flex flex-col gap-3">
        {brands.map((item) => (
          <label
            key={item.value}
            className={`
            flex cursor-pointer items-center gap-4
            rounded-2xl border p-4
            transition-all duration-300

            ${
              brand === item.value
                ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/10"
                : "border-slate-700 bg-slate-800/50 hover:border-slate-500"
            }
            `}
          >
            <input
              className="hidden"
              type="radio"
              name="brand"
              value={item.value}
              checked={brand === item.value}
              onChange={(e) => setBrand(e.target.value)}
            />

            <span className="text-2xl">
              {item.icon}
            </span>

            <div className="flex flex-col">
              <span
                className={`
                text-sm font-semibold
                ${
                  brand === item.value
                    ? "text-blue-400"
                    : "text-slate-200"
                }
                `}
              >
                {item.title}
              </span>

              <span className="mt-1 text-xs text-slate-400">
                {item.description}
              </span>
            </div>

            {brand === item.value && (
              <span className="mr-auto text-blue-400">
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