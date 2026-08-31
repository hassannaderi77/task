import React from "react";
import { FiTool } from "react-icons/fi";

function HeadersPanelAdmin() {
  return (
    <div
      className="
            relative overflow-hidden
            rounded-3xl
            border border-purple-500/20
            bg-linear-to-br
            from-[#160d2b]
            via-[#1d1038]
            to-[#0d0718]
            p-6
            shadow-2xl
            shadow-purple-950/30
            sm:p-8
          "
    >
      {/* Header gradient line */}
      <div
        className="
              absolute left-0 right-0 top-0
              h-0.5
              bg-linear-to-r
              from-purple-600
              via-fuchsia-500
              to-purple-600
            "
      />

      <div
        className="
              flex flex-col gap-5
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
      >
        <div>
          <div className="mb-3 flex items-center gap-3">
            {/* Admin icon */}
            <span
              className="
                    flex h-12 w-12
                    items-center justify-center
                    rounded-2xl
                    bg-linear-to-br
                    from-purple-500
                    to-fuchsia-600
                    text-xl
                    shadow-lg
                    shadow-purple-500/25
                  "
            >
              <FiTool />
            </span>

            <div>
              <h1
                className="
                      text-3xl font-medium
                      text-transparent
                      bg-linear-to-r
                      from-purple-200
                      via-fuchsia-300
                      to-purple-300
                      bg-clip-text
                    "
              >
                Hi Hasan
              </h1>

              <div
                className="
                      mt-1 h-1 w-20
                      rounded-full
                      bg-linear-to-r
                      from-purple-500
                      to-fuchsia-500
                    "
              />
            </div>
          </div>

          <p className="text-sm text-slate-400">
            مدیریت کاربران، تصاویر و تنظیمات سیستم
          </p>
        </div>

        {/* System status */}
        <div
          className="
                rounded-2xl
                border border-purple-500/20
                bg-linear-to-r
                from-purple-500/10
                to-fuchsia-500/10
                px-4 py-3
                text-center
              "
        >
          <p className="text-xs text-slate-500">وضعیت سیستم</p>

          <div className="mt-1 flex items-center justify-center gap-2">
            <span
              className="
                    h-2 w-2
                    animate-pulse
                    rounded-full
                    bg-emerald-400
                  "
            />

            <span className="text-sm font-semibold text-emerald-300">فعال</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeadersPanelAdmin;
