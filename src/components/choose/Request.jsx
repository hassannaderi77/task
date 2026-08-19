import React from "react";

function Request({ request, setRequest }) {
  const requests = [
    {
      value: "repair",
      title: "Repair",
      icon: "🛠️",
      description: "تعمیر دستگاه",
    },
    {
      value: "replace",
      title: "Replace",
      icon: "🔄",
      description: "تعویض قطعه یا دستگاه",
    },
    {
      value: "check",
      title: "Check",
      icon: "🔍",
      description: "بررسی و عیب‌یابی",
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
        نوع درخواست
      </h3>

      <div className="flex flex-col gap-3">
        {requests.map((item) => (
          <label
            key={item.value}
            className={`
            flex cursor-pointer items-center gap-4
            rounded-2xl border p-4
            transition-all duration-300

            ${
              request === item.value
                ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/10"
                : "border-slate-700 bg-slate-800/50 hover:border-slate-500"
            }
            `}
          >
            <input
              className="hidden"
              type="radio"
              name="request"
              value={item.value}
              checked={request === item.value}
              onChange={(e) => setRequest(e.target.value)}
            />

            <span className="text-2xl">
              {item.icon}
            </span>

            <div className="flex flex-col">
              <span
                className={`
                text-sm font-semibold
                ${
                  request === item.value
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

            {request === item.value && (
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

export default Request;

