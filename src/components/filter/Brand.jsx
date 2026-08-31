
import React, { useState } from "react";

import {
  FiPackage,
  FiUser,
  FiBox,
  FiImage,
  FiCheck,
  FiChevronDown,
} from "react-icons/fi";

function Brand({ brand, setBrand }) {
  const [isOpen, setIsOpen] = useState(false);

  const brands = [
    {
      value: "product",
      title: "محصول",
      icon: FiPackage,
      description: "تصویر یک محصول یا کالا",
    },
    {
      value: "person",
      title: "شخص",
      icon: FiUser,
      description: "تصویر شخص یا پرتره",
    },
    {
      value: "object",
      title: "شیء",
      icon: FiBox,
      description: "تصویر یک شیء یا وسیله",
    },
  ];

  const selectedBrand = brands.find((item) => item.value === brand);

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
        shadow-2xl
        shadow-purple-950/30
      "
      dir="rtl"
    >
      {/* Decorative gradient */}
      <div
        className="
          pointer-events-none
          absolute
          -right-16
          -top-16
          h-32
          w-32
          rounded-full
          bg-purple-600/20
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-20
          -left-16
          h-36
          w-36
          rounded-full
          bg-fuchsia-600/10
          blur-3xl
        "
      />

      {/* ========================= */}
      {/* DESKTOP TITLE */}
      {/* ========================= */}

      <div
        className="
          hidden
          sm:flex
          relative
          mb-5
          items-center
          gap-2
          text-right
        "
      >
        <span
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            bg-gradient-to-br
            from-purple-500
            to-fuchsia-600
            text-sm
            shadow-lg
            shadow-purple-500/20
          "
        >
          <FiImage />
        </span>

        <h3 className="text-lg font-medium text-white">
          نوع تصویر
        </h3>
      </div>

      {/* ========================= */}
      {/* MOBILE ACCORDION HEADER */}
      {/* ========================= */}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="
          relative
          flex
          w-full
          items-center
          justify-between
          gap-3
          rounded-2xl
          border
          border-purple-500/20
          bg-white/[0.03]
          px-4
          py-3
          text-right
          transition-all
          duration-300
          hover:border-purple-400/40
          hover:bg-purple-500/[0.07]
          sm:hidden
        "
      >
        <div className="flex min-w-0 items-center gap-3">
          <span
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-gradient-to-br
              from-purple-500
              to-fuchsia-600
              text-sm
              text-white
              shadow-lg
              shadow-purple-500/20
            "
          >
            <FiImage />
          </span>

          <div className="min-w-0">
            <span className="block text-sm font-medium text-white">
              نوع تصویر
            </span>

            <span className="mt-0.5 block truncate text-xs text-purple-300">
              {selectedBrand ? selectedBrand.title : "انتخاب کنید"}
            </span>
          </div>
        </div>

        <span
          className={`
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-lg
            bg-purple-500/10
            text-purple-300
            transition-transform
            duration-300
            ${isOpen ? "rotate-180" : ""}
          `}
        >
          <FiChevronDown />
        </span>
      </button>

      {/* ========================= */}
      {/* OPTIONS */}
      {/* ========================= */}

      <div
        className={`
          relative
          flex
          flex-col
          gap-3
          transition-all
          duration-300
          sm:flex
          ${
            isOpen
              ? "mt-4 max-h-[500px] opacity-100"
              : "max-h-0 overflow-hidden opacity-0 sm:max-h-none sm:overflow-visible sm:opacity-100"
          }
          sm:mt-0
        `}
      >
        {brands.map((item) => {
          const Icon = item.icon;
          const isSelected = brand === item.value;

          return (
            <label
              key={item.value}
              className={`
                group
                relative
                flex
                cursor-pointer
                items-center
                gap-4
                overflow-hidden
                rounded-2xl
                border
                p-4
                transition-all
                duration-300
                ease-out

                ${
                  isSelected
                    ? `
                      border-purple-400/70
                      bg-gradient-to-r
                      from-purple-600/20
                      via-purple-500/10
                      to-fuchsia-500/10
                      shadow-lg
                      shadow-purple-900/30
                      scale-[1.01]
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

                ${
                  isOpen
                    ? "opacity-100"
                    : "pointer-events-none sm:pointer-events-auto"
                }
              `}
            >
              {/* Active gradient line */}
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
                name="imageType"
                value={item.value}
                checked={isSelected}
                onChange={(e) => setBrand(e.target.value)}
              />

              {/* Icon */}
              <span
                className={`
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  text-2xl
                  transition-all
                  duration-300

                  ${
                    isSelected
                      ? `
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
                    font-medium
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
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
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

export default Brand;

