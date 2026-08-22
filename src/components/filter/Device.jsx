import React from "react";

function Device({ device, setDevice }) {
  const devices = [
    {
      value: "background",
      title: "پس‌زمینه",
      icon: "🖼️",
      description: "تغییر، حذف یا اصلاح پس‌زمینه",
    },
    {
      value: "quality",
      title: "کیفیت تصویر",
      icon: "✨",
      description: "افزایش کیفیت و وضوح تصویر",
    },
    {
      value: "appearance",
      title: "ظاهر تصویر",
      icon: "🎨",
      description: "تغییر رنگ، نور یا ظاهر کلی تصویر",
    },
    {
      value: "object",
      title: "جزئیات تصویر",
      icon: "🔧",
      description: "تغییر یا حذف عناصر موجود در تصویر",
    },
  ];

  return (
    <div
      className="
        rounded-3xl border border-slate-800
        bg-linear-to-br from-slate-900 to-slate-950
        p-5 shadow-2xl shadow-black/20
      "
      dir="rtl"
    >
      <h3 className="mb-5 text-right text-lg font-bold text-white">
        هدف اصلی ویرایش
      </h3>

      <div className="flex flex-col gap-3">
        {devices.map((item) => (
          <label
            key={item.value}
            className={`
              flex cursor-pointer items-center gap-4
              rounded-2xl border p-4
              transition-all duration-300
              ${
                device === item.value
                  ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/10"
                  : "border-slate-700 bg-slate-800/50 hover:border-slate-500"
              }
            `}
          >
            <input
              className="hidden"
              type="radio"
              name="editTarget"
              value={item.value}
              checked={device === item.value}
              onChange={(e) => setDevice(e.target.value)}
            />

            <span className="text-2xl">{item.icon}</span>

            <div className="flex flex-col">
              <span
                className={`
                  text-sm font-semibold
                  ${
                    device === item.value
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

            {device === item.value && (
              <span className="mr-auto text-blue-400">✓</span>
            )}
          </label>
        ))}
      </div>
    </div>
  );
}

export default Device;