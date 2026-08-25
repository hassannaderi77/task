import React from "react";

import Loading from "../ui/Loading";

import { FiDownload, FiImage, FiUsers, FiX } from "react-icons/fi";

function UsersManagement({
  users,
  usersError,
  isLoadingUsers,
  onClose,
  onHistoryClick,
  selectedUser,
  userHistory,
  isLoadingHistory,
  historyError,
  onCloseHistory,
}) {
  const API_URL = import.meta.env.VITE_API_URL.replace(/\/api\/?$/, "");

  const editTypeLabels = {
    background_change: {
      title: "پس‌زمینه",
      description: "تغییر، حذف یا اصلاح پس‌زمینه",
    },
    background_remove: {
      title: "پس‌زمینه",
      description: "تغییر، حذف یا اصلاح پس‌زمینه",
    },
    quality: {
      title: "کیفیت تصویر",
      description: "افزایش کیفیت و وضوح تصویر",
    },
    appearance: {
      title: "ظاهر تصویر",
      description: "تغییر رنگ، نور یا ظاهر کلی تصویر",
    },
    object: {
      title: "جزئیات تصویر",
      description: "تغییر یا حذف عناصر موجود در تصویر",
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

  const downloadImage = async (imageUrl, fileName) => {
    try {
      const response = await fetch(imageUrl);

      if (!response.ok) {
        throw new Error("دانلود تصویر ناموفق بود");
      }

      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = blobUrl;
      link.download = fileName;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download error:", error);

      // اگر fetch به خاطر CORS شکست خورد
      window.open(imageUrl, "_blank");
    }
  };

  return (
    <div
      className="
        mt-6
        overflow-hidden
        rounded-3xl
        border border-purple-500/20
        bg-gradient-to-br
        from-[#160d2b]/95
        via-[#1d1038]/90
        to-[#0d0718]/95
        shadow-2xl
        shadow-purple-950/30
      "
    >
      {/* Users Header */}
      <div
        className="
          flex flex-col gap-4
          border-b border-purple-500/10
          p-5
          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:p-6
        "
      >
        <div>
          <div className="flex items-center gap-3">
            <div
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-xl
                bg-purple-500/10
                text-purple-300
              "
            >
              <FiUsers size={20} />
            </div>

            <div>
              <h2 className="text-xl font-black text-purple-100">
                مدیریت کاربران
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                مشاهده کاربران ثبت شده در سیستم
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
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
          بستن
        </button>
      </div>

      {/* Loading */}
      {isLoadingUsers && (
        <div className="flex justify-center px-5 py-10">
          <Loading />
        </div>
      )}

      {/* Error */}
      {!isLoadingUsers && usersError && (
        <div className="p-5">
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
            {usersError}
          </div>
        </div>
      )}

      {/* Users */}
      {!isLoadingUsers && !usersError && users.length > 0 && (
        <div className="p-4 sm:p-6">
          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-purple-500/10 text-right">
                  <th className="px-4 py-4 text-sm font-semibold text-slate-400">
                    نام
                  </th>

                  <th className="px-4 py-4 text-sm font-semibold text-slate-400">
                    ایمیل
                  </th>

                  <th className="px-4 py-4 text-sm font-semibold text-slate-400">
                    شماره
                  </th>

                  <th className="px-4 py-4 text-sm font-semibold text-slate-400">
                    نقش
                  </th>

                  <th className="px-4 py-4 text-sm font-semibold text-slate-400">
                    تاریخ ثبت‌نام
                  </th>

                  <th className="px-4 py-4 text-sm font-semibold text-slate-400">
                    عملیات
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="
                      border-b border-purple-500/5
                      transition
                      hover:bg-purple-500/[0.04]
                    "
                  >
                    <td className="px-4 py-4">
                      <div className="font-semibold text-purple-50">
                        {user.name || "-"} {user.family || ""}
                      </div>
                    </td>

                    <td className="px-4 py-4 text-sm text-slate-400">
                      {user.email || "-"}
                    </td>

                    <td className="px-4 py-4 text-sm text-slate-400">
                      {user.phone || "-"}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className="
                          rounded-lg
                          border border-purple-500/20
                          bg-purple-500/10
                          px-3 py-1.5
                          text-xs
                          text-purple-200
                        "
                      >
                        {user.role || "user"}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-sm text-slate-500">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("fa-IR")
                        : "-"}
                    </td>

                    <td className="px-4 py-4">
                      <button
                        type="button"
                        onClick={() => onHistoryClick(user)}
                        className="
                          flex items-center gap-2
                          rounded-xl
                          border border-fuchsia-500/20
                          bg-fuchsia-500/10
                          px-3 py-2
                          text-xs font-semibold
                          text-fuchsia-200
                          transition
                          hover:bg-fuchsia-500/20
                        "
                      >
                        <FiImage size={15} />
                        تاریخچه
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="space-y-3 md:hidden">
            {users.map((user) => (
              <div
                key={user._id}
                className="
                  rounded-2xl
                  border border-purple-500/10
                  bg-white/[0.02]
                  p-4
                "
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-purple-50">
                      {user.name || "-"} {user.family || ""}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {user.email || "-"}
                    </p>
                  </div>

                  <span
                    className="
                      shrink-0
                      rounded-lg
                      border border-purple-500/20
                      bg-purple-500/10
                      px-2.5 py-1
                      text-xs
                      text-purple-200
                    "
                  >
                    {user.role || "user"}
                  </span>
                </div>

                <div
                  className="
                    mt-4
                    grid grid-cols-2
                    gap-3
                    text-xs
                  "
                >
                  <div>
                    <span className="text-slate-600">شماره</span>

                    <p className="mt-1 text-slate-400">{user.phone || "-"}</p>
                  </div>

                  <div>
                    <span className="text-slate-600">ثبت‌نام</span>

                    <p className="mt-1 text-slate-400">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("fa-IR")
                        : "-"}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onHistoryClick(user)}
                  className="
                    mt-4
                    flex w-full
                    items-center justify-center gap-2
                    rounded-xl
                    border border-fuchsia-500/20
                    bg-fuchsia-500/10
                    px-3 py-2.5
                    text-xs font-semibold
                    text-fuchsia-200
                    transition
                    hover:bg-fuchsia-500/20
                  "
                >
                  <FiImage size={15} />
                  مشاهده تاریخچه
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty */}
      {!isLoadingUsers && !usersError && users.length === 0 && (
        <div className="px-5 py-12 text-center">
          <div className="flex justify-center text-purple-400">
            <FiUsers size={42} />
          </div>

          <p className="mt-4 font-bold text-purple-100">
            هنوز کاربری ثبت نشده است
          </p>

          <p className="mt-2 text-sm text-slate-500">
            کاربران ثبت شده در این بخش نمایش داده می‌شوند.
          </p>
        </div>
      )}

      {/* User History */}
      {selectedUser && (
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

              <p className="mt-4 font-bold text-purple-100">
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

                const editIntensity = editIntensityLabels[
                  item.secondSelect
                ] || {
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
                            className="
                                aspect-square
                                w-full
                                rounded-xl
                                object-cover
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
                            className="
                                aspect-square
                                w-full
                                rounded-xl
                                object-cover
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
                            ? new Date(item.createdAt).toLocaleDateString(
                                "fa-IR",
                              )
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
          text-xs font-bold
          text-purple-200
        "
                            >
                              {item.firstSelect === "background_change"
                                ? "پس‌زمینه"
                                : item.firstSelect === "quality"
                                  ? "کیفیت تصویر"
                                  : item.firstSelect === "appearance"
                                    ? "ظاهر تصویر"
                                    : item.firstSelect === "details"
                                      ? "جزئیات تصویر"
                                      : item.firstSelect || "-"}
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
          text-xs font-bold
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
          text-xs font-bold
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
          text-xs font-bold
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
                              bg-purple-500آ/[0.03]
                              p-3
                            "
                        >
                          <p className="text-[11px] text-slate-500">توضیحات</p>

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
                          <p className="text-[11px] text-slate-500">
                            پرامپت تولید شده
                          </p>

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
      )}
    </div>
  );
}

export default UsersManagement;
