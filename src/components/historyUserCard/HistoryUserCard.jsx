import React from "react";
import { FiCheck, FiCopy, FiDownload, FiImage, FiX } from "react-icons/fi";
import Loading from "../ui/Loading";

function HistoryUserCard({
  selectedUser,
  onCloseHistory,
  isLoadingHistory,
  historyError,
  userHistory,
  setPreviewImage,
  downloadImage,
  handleCopy,
  copiedItem,
}) {
  const API_URL = import.meta.env.VITE_API_URL.replace(/\/api\/?$/, "");

  const editTypeLabels = {
    background_remove: {
      title: "حذف پس‌زمینه",
      description: "حذف پس‌زمینه از تصویر",
    },

    background_change: {
      title: "تغییر پس‌زمینه",
      description: "تغییر یا جایگزینی پس‌زمینه تصویر",
    },

    object_remove: {
      title: "حذف شیء",
      description: "حذف یک شیء از تصویر",
    },

    object_add: {
      title: "اضافه کردن شیء",
      description: "اضافه کردن یک شیء جدید به تصویر",
    },
  };

  const editIntensityLabels = {
    minimal: {
      title: "حداقلی",
    },
    moderate: {
      title: "متوسط",
    },
    strong: {
      title: "زیاد",
    },
    creative: {
      title: "خلاقانه",
    },
  };

  const editStyleLabels = {
    natural: {
      title: "طبیعی",
      description: "تغییرات طبیعی و حفظ ظاهر اصلی تصویر",
    },
    professional: {
      title: "حرفه‌ای",
      description: "بهبود کیفیت و ظاهر تصویر با نتیجه حرفه‌ای",
    },
    creative: {
      title: "خلاقانه",
      description: "اعمال تغییرات خلاقانه بر اساس درخواست کاربر",
    },
  };

  const imageTypeLabels = {
    product: {
      title: "محصول",
      description: "تصویر یک محصول یا کالا",
    },
    person: {
      title: "شخص",
      description: "تصویر شخص یا پرتره",
    },
    object: {
      title: "شیء",
      description: "تصویر یک شیء یا وسیله",
    },
  };

  return (
    <div
      className="
            border-t
            border-fuchsia-500/10
            bg-black/10
            p-4
            sm:p-6
          "
    >
      {/* History Header */}
      <div
        className="
              mb-6
              flex flex-col gap-4
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
      >
        <div>
          <div className="flex items-center gap-3">
            <div
              className="
                    flex h-10 w-10
                    items-center justify-center
                    rounded-xl
                    bg-fuchsia-500/10
                    text-fuchsia-300
                  "
            >
              <FiImage size={20} />
            </div>

            <div>
              <h2 className="text-xl font-black text-fuchsia-100">
                تاریخچه کاربر
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                {selectedUser.name || "-"} {selectedUser.family || ""}
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onCloseHistory}
          className="
                flex w-fit items-center gap-2
                rounded-xl
                border border-purple-500/20
                bg-purple-500/10
                px-4 py-2
                text-sm
                text-purple-200
                transition
                hover:bg-purple-500/20
              "
        >
          <FiX size={16} />
          بستن تاریخچه
        </button>
      </div>

      {/* History Loading */}
      {isLoadingHistory && (
        <div className="flex justify-center py-12">
          <Loading />
        </div>
      )}

      {/* History Error */}
      {!isLoadingHistory && historyError && (
        <div
          className="
                rounded-2xl
                border border-red-500/20
                bg-red-500/5
                p-5
                text-center
                text-sm
                text-red-300
              "
        >
          {historyError}
        </div>
      )}

      {/* Empty History */}
      {!isLoadingHistory && !historyError && userHistory.length === 0 && (
        <div className="py-10 text-center">
          <div className="flex justify-center text-fuchsia-400">
            <FiImage size={42} />
          </div>

          <p className="mt-4 font-medium text-purple-100">
            این کاربر هنوز تصویری ویرایش نکرده است
          </p>

          <p className="mt-2 text-sm text-slate-500">
            تاریخچه ویرایش‌های کاربر در این بخش نمایش داده می‌شود.
          </p>
        </div>
      )}

      {/* History Items */}
      {!isLoadingHistory && !historyError && userHistory.length > 0 && (
        <div
          className="
                  grid gap-5
                  sm:grid-cols-2
                  lg:grid-cols-3
                "
        >
          {userHistory.map((item) => {
            const beforeUrl = `${API_URL}${item.beforeImage}`;
            const afterUrl = `${API_URL}${item.afterImage}`;

            const editType = editTypeLabels[item.firstSelect] || {
              title: item.firstSelect || "-",
              description: "",
            };

            const editIntensity = editIntensityLabels[item.secondSelect] || {
              title: item.secondSelect || "-",
            };

            const editStyle = editStyleLabels[item.request] || {
              title: item.request || "-",
              description: "",
            };

            const imageType = imageTypeLabels[item.brand] || {
              title: item.brand || "-",
              description: "",
            };

            return (
              <div
                key={item._id}
                className="
                        overflow-hidden
                        rounded-2xl
                        border border-purple-500/15
                        bg-white/[0.03]
                        shadow-lg
                        shadow-purple-950/10
                      "
              >
                {/* Images */}
                <div className="grid grid-cols-2 gap-2 p-2">
                  {/* Before */}
                  <div>
                    <p className="mb-2 text-center text-[11px] text-slate-500">
                      اولیه
                    </p>

                    <div className="group relative overflow-hidden rounded-xl">
                      <img
                        src={beforeUrl}
                        alt="Before"
                        onClick={() => setPreviewImage(beforeUrl)}
                        className="
                                      aspect-square
                                      w-full
                                      cursor-zoom-in
                                      rounded-xl
                                      object-cover
                                      transition-transform duration-300
                                      hover:scale-[1.02]
                                    "
                      />

                      {/* Download Button */}
                      <button
                        type="button"
                        onClick={() =>
                          downloadImage(beforeUrl, `before-${item._id}.jpg`)
                        }
                        title="دانلود تصویر اولیه"
                        className="
                                absolute
                                bottom-2
                                right-2
                                flex
                                h-9 w-9
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-white/20
                                bg-black/60
                                text-white
                                shadow-lg
                                backdrop-blur-md
                                transition-all
                                duration-300
                                hover:scale-110
                                hover:bg-purple-600
                                active:scale-95
                              "
                      >
                        <FiDownload size={17} />
                      </button>
                    </div>
                  </div>

                  {/* After */}
                  <div>
                    <p className="mb-2 text-center text-[11px] text-fuchsia-300">
                      نتیجه
                    </p>

                    <div className="group relative overflow-hidden rounded-xl">
                      <img
                        src={afterUrl}
                        alt="After"
                        onClick={() => setPreviewImage(afterUrl)}
                        className="
                                        aspect-square
                                        w-full
                                        cursor-zoom-in
                                        rounded-xl
                                        object-cover
                                        transition-transform duration-300
                                        hover:scale-[1.02]
                                      "
                      />

                      {/* Download Button */}
                      <button
                        type="button"
                        onClick={() =>
                          downloadImage(afterUrl, `after-${item._id}.jpg`)
                        }
                        title="دانلود تصویر نتیجه"
                        className="
                                absolute
                                bottom-2
                                right-2
                                flex
                                h-9 w-9
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-white/20
                                bg-black/60
                                text-white
                                shadow-lg
                                backdrop-blur-md
                                transition-all
                                duration-300
                                hover:scale-110
                                hover:bg-fuchsia-600
                                active:scale-95
                              "
                      >
                        <FiDownload size={17} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* History Information */}
                <div className="px-4 pb-4">
                  <div
                    className="
                            flex items-center
                            justify-between
                            gap-2
                          "
                  >
                    <span className="text-xs text-slate-500">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString("fa-IR")
                        : "-"}
                    </span>

                    <span
                      className="
                              rounded-lg
                              border border-purple-500/20
                              bg-purple-500/10
                              px-2 py-1
                              text-[11px]
                              text-purple-200
                            "
                    >
                      ویرایش
                    </span>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div
                      className="
                                  rounded-xl
                                  border border-purple-500/10
                                  bg-white/[0.02]
                                  px-3 py-2.5
                                "
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs font-medium text-slate-500">
                          نوع ویرایش تصویر
                        </span>

                        <span
                          className="
        rounded-lg
        border border-purple-400/20
        bg-purple-500/10
        px-2.5 py-1
        text-xs font-medium
        text-purple-200
      "
                        >
                          {editTypeLabels[item.firstSelect]?.title ||
                            item.firstSelect ||
                            "-"}
                        </span>
                      </div>
                    </div>
                    {/* هدف اصلی ویرایش */}
                    <div
                      className="
                                    rounded-xl
                                    border border-purple-500/10
                                    bg-white/[0.02]
                                    px-3 py-2.5
                                  "
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs font-medium text-slate-500">
                          هدف اصلی ویرایش
                        </span>

                        <span
                          className="
                                          rounded-lg
                                          border border-purple-400/20
                                          bg-purple-500/10
                                          px-2.5 py-1
                                          text-xs font-medium
                                          text-purple-200
                                        "
                        >
                          {item.device === "background"
                            ? "پس‌زمینه"
                            : item.device === "quality"
                              ? "کیفیت تصویر"
                              : item.device === "appearance"
                                ? "ظاهر تصویر"
                                : item.device === "object"
                                  ? "جزئیات تصویر"
                                  : item.device || "-"}
                        </span>
                      </div>
                    </div>

                    {/* میزان تغییر */}
                    <div
                      className="
                                    rounded-xl
                                    border border-fuchsia-500/10
                                    bg-white/[0.02]
                                    px-3 py-2.5
                                  "
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs font-medium text-slate-500">
                          میزان تغییر
                        </span>

                        <span
                          className="
                                    rounded-lg
                                    border border-fuchsia-400/20
                                    bg-fuchsia-500/10
                                    px-2.5 py-1
                                    text-xs font-medium
                                    text-fuchsia-200
                                  "
                        >
                          {item.secondSelect === "minimal"
                            ? "حداقلی"
                            : item.secondSelect === "strong"
                              ? "قوی"
                              : item.secondSelect === "creative"
                                ? "خلاقانه"
                                : item.secondSelect || "-"}
                        </span>
                      </div>
                    </div>

                    {/* سبک ویرایش */}
                    <div
                      className="
                              rounded-xl
                              border border-violet-500/10
                              bg-white/[0.02]
                              px-3 py-2.5
                            "
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs font-medium text-slate-500">
                          سبک ویرایش
                        </span>

                        <span
                          className="
                                rounded-lg
                                border border-violet-400/20
                                bg-violet-500/10
                                px-2.5 py-1
                                text-xs font-medium
                                text-violet-200
                              "
                        >
                          {item.request === "natural"
                            ? "طبیعی"
                            : item.request === "professional"
                              ? "حرفه‌ای"
                              : item.request === "creative"
                                ? "خلاقانه"
                                : item.request || "-"}
                        </span>
                      </div>
                    </div>

                    {/* نوع تصویر */}
                    <div
                      className="
                                    rounded-xl
                                    border border-purple-500/10
                                    bg-white/[0.02]
                                    px-3 py-2.5
                                  "
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs font-medium text-slate-500">
                          نوع تصویر
                        </span>

                        <span
                          className="
                                        rounded-lg
                                        border border-purple-400/20
                                        bg-purple-500/10
                                        px-2.5 py-1
                                        text-xs font-medium
                                        text-purple-200
                                      "
                        >
                          {item.brand === "object"
                            ? "شیء"
                            : item.brand === "product"
                              ? "محصول"
                              : item.brand === "person"
                                ? "شخص"
                                : item.brand || "-"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {item.description && (
                    <div
                      className="
                                          mt-4
                                          rounded-xl
                                          border border-purple-500/10
                                          bg-purple-500/[0.03]
                                          p-3
                                        "
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-[11px] text-slate-500">توضیحات</p>

                        <button
                          type="button"
                          onClick={() =>
                            handleCopy(
                              item.description,
                              "description",
                              item._id,
                            )
                          }
                          title="کپی"
                          aria-label="کپی توضیحات"
                          className="
                                      inline-flex
                                      h-7 w-7
                                      shrink-0
                                      items-center
                                      justify-center
                                      rounded-lg
                                      border border-purple-400/20
                                      bg-purple-500/10
                                      text-purple-300
                                      transition-all duration-200
                                      hover:border-purple-400/30
                                      hover:bg-purple-500/20
                                      hover:text-white
                                      active:scale-95
                                    "
                        >
                          {copiedItem === `${item._id}-description` ? (
                            <FiCheck size={14} />
                          ) : (
                            <FiCopy size={14} />
                          )}
                        </button>
                      </div>

                      <p
                        className="
                                    mt-1
                                    break-words
                                    text-xs
                                    leading-6
                                    text-slate-300
                                  "
                      >
                        {item.description}
                      </p>
                    </div>
                  )}
                  {item.generatedPrompt && (
                    <div
                      className="
                                    mt-4
                                    rounded-xl
                                    border border-fuchsia-500/10
                                    bg-fuchsia-500/[0.03]
                                    p-3
                                  "
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-[11px] text-slate-500">
                          پرامپت تولید شده
                        </p>

                        <button
                          type="button"
                          onClick={() =>
                            handleCopy(item.generatedPrompt, "prompt", item._id)
                          }
                          title="کپی"
                          aria-label="کپی پرامپت تولید شده"
                          className="
                                            inline-flex
                                            h-7 w-7
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-lg
                                            border border-fuchsia-400/20
                                            bg-fuchsia-500/10
                                            text-fuchsia-300
                                            transition-all duration-200
                                            hover:border-fuchsia-400/30
                                            hover:bg-fuchsia-500/20
                                            hover:text-white
                                            active:scale-95
                                          "
                        >
                          {copiedItem === `${item._id}-prompt` ? (
                            <FiCheck size={14} />
                          ) : (
                            <FiCopy size={14} />
                          )}
                        </button>
                      </div>

                      <p
                        className="
                                        mt-1
                                        break-words
                                        text-xs
                                        leading-6
                                        text-slate-300
                                      "
                      >
                        {item.generatedPrompt}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default HistoryUserCard;
