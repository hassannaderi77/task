
import React from "react";

import {
  FiImage,
  FiZap,
  FiDroplet,
  FiTool,
  FiTarget,
  FiCheck,
  FiChevronDown,
} from "react-icons/fi";

function Device({ device, setDevice }) {
  const devices = [
    {
      value: "background",
      title: "پس‌زمینه",
      icon: FiImage,
      description: "تغییر، حذف یا اصلاح پس‌زمینه",
    },
    {
      value: "quality",
      title: "کیفیت تصویر",
      icon: FiZap,
      description: "افزایش کیفیت و وضوح تصویر",
    },
    {
      value: "appearance",
      title: "ظاهر تصویر",
      icon: FiDroplet,
      description: "تغییر رنگ، نور یا ظاهر کلی تصویر",
    },
    {
      value: "object",
      title: "جزئیات تصویر",
      icon: FiTool,
      description: "تغییر یا حذف عناصر موجود در تصویر",
    },
  ];

  const selectedDevice = devices.find(
    (item) => item.value === device
  );

  return (
    <div
      className="
        relative overflow-hidden
        rounded-3xl
        border border-purple-500/20
        bg-gradient-to-br
        from-[#160d2b]
        via-[#1d1038]
        to-[#0d0718]
        p-5
        shadow-2xl shadow-purple-950/30
      "
      dir="rtl"
    >
      {/* Decorative gradients */}
      <div
        className="
          pointer-events-none absolute
          -left-16 -top-16
          h-36 w-36
          rounded-full
          bg-purple-600/15
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none absolute
          -bottom-20 -right-16
          h-40 w-40
          rounded-full
          bg-fuchsia-600/10
          blur-3xl
        "
      />

      {/* ===================================================== */}
      {/* DESKTOP TITLE */}
      {/* ===================================================== */}

      <h3
        className="
          relative mb-5
          hidden
          items-center gap-2
          text-right text-lg
          font-medium text-white
          md:flex
        "
      >
        <span
          className="
            flex h-9 w-9
            items-center justify-center
            rounded-xl
            bg-gradient-to-br
            from-purple-500
            to-fuchsia-600
            text-sm
            shadow-lg shadow-purple-500/20
          "
        >
          <FiTarget />
        </span>

        هدف اصلی ویرایش
      </h3>

      {/* ===================================================== */}
      {/* MOBILE ACCORDION */}
      {/* ===================================================== */}

      <details className="group relative md:hidden">
        <summary
          className="
            flex
            cursor-pointer
            list-none
            items-center
            gap-3
            rounded-2xl
            border border-purple-500/20
            bg-white/[0.03]
            p-3
            transition-all
            duration-300
            hover:border-purple-400/40
            [&::-webkit-details-marker]:hidden
          "
        >
          {/* Target icon */}
          <span
            className="
              flex h-11 w-11
              shrink-0
              items-center justify-center
              rounded-xl
              bg-gradient-to-br
              from-purple-500
              to-fuchsia-600
              text-base
              text-white
              shadow-lg shadow-purple-500/20
            "
          >
            <FiTarget />
          </span>

          {/* Text */}
          <div className="min-w-0 flex-1">
            <span className="block text-xs text-slate-400">
              هدف اصلی ویرایش
            </span>

            <span
              className="
                mt-1
                block
                truncate
                text-sm
                font-semibold
                text-purple-200
              "
            >
              {selectedDevice?.title || "انتخاب کنید"}
            </span>
          </div>

          {/* Selected check */}
          {selectedDevice && (
            <span
              className="
                flex h-7 w-7
                shrink-0
                items-center justify-center
                rounded-full
                bg-gradient-to-br
                from-purple-500
                to-fuchsia-600
                text-sm
                text-white
                shadow-lg
                shadow-purple-500/20
              "
            >
              <FiCheck />
            </span>
          )}

          {/* Chevron */}
          <span
            className="
              flex h-8 w-8
              shrink-0
              items-center justify-center
              rounded-lg
              bg-purple-500/10
              text-purple-300
              transition-transform
              duration-300
              group-open:rotate-180
            "
          >
            <FiChevronDown />
          </span>
        </summary>

        {/* Mobile options */}
        <div
          className="
            mt-3
            space-y-2
            overflow-hidden
            rounded-2xl
            border border-purple-500/10
            bg-black/10
            p-2
          "
        >
          {devices.map((item) => {
            const Icon = item.icon;
            const isSelected = device === item.value;

            return (
              <label
                key={item.value}
                className={`
                  group relative
                  flex cursor-pointer
                  items-center gap-3
                  overflow-hidden
                  rounded-xl
                  border p-3
                  transition-all
                  duration-300
                  ease-out

                  ${
                    isSelected
                      ? `
                        scale-[1.01]
                        border-purple-400/60
                        bg-gradient-to-r
                        from-purple-600/20
                        to-fuchsia-500/10
                        shadow-lg
                        shadow-purple-900/20
                      `
                      : `
                        border-purple-500/10
                        bg-white/[0.02]
                        hover:border-purple-400/30
                        hover:bg-purple-500/[0.05]
                      `
                  }
                `}
              >
                {/* Active indicator */}
                {isSelected && (
                  <span
                    className="
                      absolute
                      right-0
                      top-0
                      h-full
                      w-1
                      bg-gradient-to-b
                      from-purple-400
                      via-fuchsia-500
                      to-purple-700
                    "
                  />
                )}

                {/* Radio */}
                <input
                  className="hidden"
                  type="radio"
                  name="editTarget"
                  value={item.value}
                  checked={isSelected}
                  onChange={(e) => setDevice(e.target.value)}
                />

                {/* Icon */}
                <span
                  className={`
                    flex h-10 w-10
                    shrink-0
                    items-center justify-center
                    rounded-xl
                    text-lg
                    transition-all
                    duration-300

                    ${
                      isSelected
                        ? `
                          scale-105
                          bg-purple-500/20
                          text-purple-200
                          shadow-md
                          shadow-purple-500/10
                        `
                        : `
                          bg-purple-500/5
                          text-slate-400
                        `
                    }
                  `}
                >
                  <Icon />
                </span>

                {/* Text */}
                <div className="min-w-0 flex-1">
                  <span
                    className={`
                      block
                      text-sm
                      font-semibold
                      transition-colors
                      duration-300

                      ${
                        isSelected
                          ? "text-purple-300"
                          : "text-slate-200"
                      }
                    `}
                  >
                    {item.title}
                  </span>

                  <span
                    className="
                      mt-1
                      block
                      text-xs
                      leading-5
                      text-slate-400
                    "
                  >
                    {item.description}
                  </span>
                </div>

                {/* Check */}
                {isSelected && (
                  <span
                    className="
                      flex h-6 w-6
                      shrink-0
                      items-center justify-center
                      rounded-full
                      bg-gradient-to-br
                      from-purple-500
                      to-fuchsia-600
                      text-xs
                      text-white
                      shadow-md
                      shadow-purple-500/20
                    "
                  >
                    <FiCheck />
                  </span>
                )}
              </label>
            );
          })}
        </div>
      </details>

      {/* ===================================================== */}
      {/* DESKTOP OPTIONS */}
      {/* ===================================================== */}

      <div className="relative hidden flex-col gap-3 md:flex">
        {devices.map((item) => {
          const Icon = item.icon;
          const isSelected = device === item.value;

          return (
            <label
              key={item.value}
              className={`
                group relative
                flex cursor-pointer
                items-center gap-4
                overflow-hidden
                rounded-2xl
                border p-4
                transition-all
                duration-300
                ease-out

                ${
                  isSelected
                    ? `
                      scale-[1.01]
                      border-purple-400/70
                      bg-gradient-to-r
                      from-purple-600/20
                      via-purple-500/10
                      to-fuchsia-500/10
                      shadow-lg
                      shadow-purple-900/30
                    `
                    : `
                      border-purple-500/10
                      bg-white/[0.03]
                      hover:-translate-y-0.5
                      hover:border-purple-400/40
                      hover:bg-purple-500/[0.07]
                      hover:shadow-lg
                      hover:shadow-purple-950/20
                    `
                }
              `}
            >
              {/* Active indicator */}
              {isSelected && (
                <span
                  className="
                    absolute
                    right-0
                    top-0
                    h-full
                    w-1
                    bg-gradient-to-b
                    from-purple-400
                    via-fuchsia-500
                    to-purple-700
                  "
                />
              )}

              {/* Radio input */}
              <input
                className="hidden"
                type="radio"
                name="editTarget"
                value={item.value}
                checked={isSelected}
                onChange={(e) => setDevice(e.target.value)}
              />

              {/* Icon */}
              <span
                className={`
                  flex h-12 w-12
                  shrink-0
                  items-center justify-center
                  rounded-2xl
                  text-2xl
                  transition-all
                  duration-300

                  ${
                    isSelected
                      ? `
                        scale-105
                        bg-gradient-to-br
                        from-purple-500/30
                        to-fuchsia-500/20
                        text-purple-200
                        shadow-lg
                        shadow-purple-500/20
                      `
                      : `
                        bg-purple-500/5
                        text-slate-400
                        group-hover:bg-purple-500/10
                        group-hover:text-purple-300
                        group-hover:scale-105
                      `
                  }
                `}
              >
                <Icon />
              </span>

              {/* Text */}
              <div className="flex min-w-0 flex-1 flex-col">
                <span
                  className={`
                    text-sm
                    font-semibold
                    transition-colors
                    duration-300

                    ${
                      isSelected
                        ? "text-purple-300"
                        : "text-slate-200 group-hover:text-purple-200"
                    }
                  `}
                >
                  {item.title}
                </span>

                <span
                  className="
                    mt-1
                    text-xs
                    leading-5
                    text-slate-400
                    transition-colors
                    duration-300
                    group-hover:text-slate-300
                  "
                >
                  {item.description}
                </span>
              </div>

              {/* Selected check */}
              {isSelected && (
                <span
                  className="
                    mr-auto
                    flex h-7 w-7
                    shrink-0
                    items-center justify-center
                    rounded-full
                    bg-gradient-to-br
                    from-purple-500
                    to-fuchsia-600
                    text-sm
                    font-medium
                    text-white
                    shadow-lg
                    shadow-purple-500/30
                  "
                >
                  <FiCheck />
                </span>
              )}
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default Device;

