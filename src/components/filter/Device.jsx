import React from "react";

function Device({ device, setDevice }) {
  const devices = [
    {
      value: "mobile",
      title: "Mobile",
      icon: "📱",
    },
    {
      value: "tablet",
      title: "Tablet",
      icon: "📲",
    },
    {
      value: "laptop",
      title: "Laptop",
      icon: "💻",
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
        نوع دستگاه
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
              name="device"
              value={item.value}
              checked={device === item.value}
              onChange={(e) => setDevice(e.target.value)}
            />

            <span className="text-2xl">
              {item.icon}
            </span>

            <span
              className={`
              text-sm font-semibold
              ${
                device === item.value
                  ? "text-blue-400"
                  : "text-slate-300"
              }
              `}
            >
              {item.title}
            </span>

            {device === item.value && (
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

export default Device;