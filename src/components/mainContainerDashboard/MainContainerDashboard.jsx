import React from "react";
import {
  FiCheck,
  FiClock,
  FiCopy,
  FiDownload,
  FiImage,
  FiTrash2,
} from "react-icons/fi";

const API_URL = import.meta.env.VITE_API_URL.replace("/api", "");

const firstSelectLabels = {
  background_remove: "حذف پس‌زمینه",
  background_change: "تغییر پس‌زمینه",
  object_remove: "حذف یک شیء از تصویر",
  object_add: "اضافه کردن شیء به تصویر",
};

const secondSelectLabels = {
  minimal: "تغییر جزئی",
  moderate: "تغییر متوسط",
  strong: "تغییر قابل توجه",
  creative: "ویرایش خلاقانه",
};

const deviceLabels = {
  background: "پس‌زمینه",
  quality: "کیفیت تصویر",
  appearance: "ظاهر تصویر",
  object: "جزئیات تصویر",
};

const requestLabels = {
  natural: "طبیعی",
  professional: "حرفه‌ای",
  creative: "خلاقانه",
};

const brandLabels = {
  product: "محصول",
  person: "شخص",
  object: "شیء",
};

function MainContainerDashboard({
  history,
  handleDelete,
  deletingId,
  setPreviewImage,
  handleCopyPrompt,
  copiedPromptId,
}) {
  return (
    <div className="relative mx-auto max-w-4xl">
      {/* Header */}
      <div className="mb-8 text-center">
        <div
          className="
                  mx-auto mb-4
                  flex h-16 w-16
                  items-center justify-center
                  rounded-2xl
                  border border-purple-400/20
                  bg-gradient-to-br
                  from-purple-500/20
                  via-violet-500/10
                  to-fuchsia-500/10
                  text-3xl
                  shadow-lg
                  shadow-purple-950/30
                  transition-all duration-500
                  hover:scale-105
                "
        >
          <FiClock className="text-purple-200" size={30} />
        </div>

        <h1
          className="
                  bg-gradient-to-r
                  from-purple-200
                  via-fuchsia-300
                  to-purple-300
                  bg-clip-text
                  text-3xl
                  font-medium
                  text-transparent
                  sm:text-4xl
                "
        >
          تاریخچه ویرایش تصاویر
        </h1>

        <p className="mt-2 text-xs text-slate-400 sm:text-sm">
          تصاویر ویرایش شده قبلی خود را مشاهده کنید
        </p>

        <div
          className="
                  mx-auto mt-4
                  h-1 w-20
                  rounded-full
                  bg-gradient-to-r
                  from-purple-500
                  via-fuchsia-500
                  to-purple-500
                "
        />
      </div>

      {/* Empty State */}
      {history.length === 0 && (
        <div
          className="
                  relative overflow-hidden
                  rounded-3xl
                  border border-purple-500/20
                  bg-gradient-to-br
                  from-[#160d2b]/90
                  via-[#1d1038]/80
                  to-[#0d0718]/90
                  p-7
                  text-center
                  shadow-xl
                  shadow-purple-950/40
                  backdrop-blur-xl
                  sm:p-10
                "
        >
          <div
            className="
                    mx-auto mb-4
                    flex h-16 w-16
                    items-center justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-purple-500/20
                    to-fuchsia-500/10
                    text-3xl
                  "
          >
            <FiImage className="text-purple-200" size={30} />
          </div>

          <h2 className="text-xl font-medium text-purple-100 sm:text-2xl">
            هنوز تاریخی ثبت نشده است
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            بعد از ویرایش اولین تصویر، نتیجه اینجا نمایش داده می‌شود.
          </p>
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="space-y-6">
          {history.map((item, index) => (
            <div
              key={item._id || index}
              className="
                      group relative overflow-hidden
                      rounded-3xl
                      border border-purple-500/20
                      bg-gradient-to-br
                      from-[#160d2b]/90
                      via-[#1d1038]/80
                      to-[#0d0718]/90
                      p-4
                      shadow-xl
                      shadow-purple-950/30
                      backdrop-blur-xl
                      transition-all duration-300
                      hover:-translate-y-0.5
                      hover:border-purple-400/30
                      hover:shadow-purple-900/40
                      sm:p-5
                    "
            >
              {/* Top gradient */}
              <div
                className="
                        absolute left-0 right-0 top-0
                        h-[2px]
                        bg-gradient-to-r
                        from-transparent
                        via-purple-500
                        to-fuchsia-500
                      "
              />

              {/* Header */}
              <div
                className="
                        mb-4
                        flex flex-col gap-2
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                      "
              >
                <h2
                  className="
                          bg-gradient-to-r
                          from-purple-200
                          to-fuchsia-300
                          bg-clip-text
                          text-lg
                          font-medium
                          text-transparent
                        "
                >
                  ویرایش تصویر {history.length - index}
                </h2>

                <div className="flex items-center gap-2">
                  <span
                    className="
          flex
          w-fit
          items-center
          gap-1.5
          rounded-lg
          border border-purple-500/20
          bg-gradient-to-r
          from-purple-500/10
          to-fuchsia-500/10
          px-3 py-1.5
          text-[11px]
          text-purple-200
        "
                  >
                    <FiClock size={13} />
                    {new Date(item.createdAt).toLocaleString("fa-IR")}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleDelete(item._id)}
                    disabled={deletingId === item._id}
                    title="حذف از تاریخچه"
                    aria-label="حذف از تاریخچه"
                    className="
          inline-flex
          h-9 w-9
          shrink-0
          items-center
          justify-center
          rounded-lg
          border border-red-400/20
          bg-red-500/10
          text-red-300
          transition-all duration-300
          hover:border-red-400/30
          hover:bg-red-500/20
          hover:text-red-200
          active:scale-95
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Images */}
              <div
                className="
                        flex
                        flex-col
                        items-center
                        justify-center
                        gap-4
                        sm:flex-row
                        sm:items-start
                      "
              >
                {/* Before */}
                <div
                  className="
                          w-full
                          max-w-[240px]
                          overflow-hidden
                          rounded-xl
                          border border-purple-500/10
                          bg-black/20
                          p-2
                        "
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <h3
                      className="
                              text-sm
                              font-medium
                              text-slate-300
                            "
                    >
                      تصویر اولیه
                    </h3>

                    <a
                      href={`${API_URL}${item.beforeImage}`}
                      download={`before-image-${index + 1}.png`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                              inline-flex
                              items-center
                              gap-1.5
                              rounded-lg
                              border border-purple-400/20
                              bg-purple-500/10
                              px-2.5 py-1.5
                              text-[11px]
                              font-medium
                              text-purple-200
                              transition-all
                              duration-300
                              hover:bg-purple-500/20
                              hover:text-white
                              active:scale-95
                            "
                    >
                      <FiDownload className="text-sm" />
                      دانلود
                    </a>
                  </div>

                  <img
                    src={`${API_URL}${item.beforeImage}`}
                    alt="Before"
                    onClick={() =>
                      setPreviewImage({
                        src: `${API_URL}${item.beforeImage}`,
                        title: "تصویر اولیه",
                      })
                    }
                    className="
        aspect-video
        w-full
        cursor-pointer
        rounded-lg
        object-cover
        transition-all duration-300
        hover:scale-[1.02]
        hover:opacity-90
      "
                  />
                </div>

                {/* After */}
                <div
                  className="
                          w-full
                          max-w-[240px]
                          overflow-hidden
                          rounded-xl
                          border border-purple-400/20
                          bg-gradient-to-br
                          from-purple-500/[0.05]
                          to-fuchsia-500/[0.03]
                          p-2
                          shadow-md
                          shadow-purple-950/20
                        "
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <h3
                      className="
                              text-sm
                              font-medium
                              text-purple-200
                            "
                    >
                      نتیجه ویرایش
                    </h3>

                    <a
                      href={`${API_URL}${item.afterImage}`}
                      download={`after-image-${index + 1}.png`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                              inline-flex
                              items-center
                              gap-1.5
                              rounded-lg
                              border border-fuchsia-400/20
                              bg-fuchsia-500/10
                              px-2.5 py-1.5
                              text-[11px]
                              font-medium
                              text-fuchsia-200
                              transition-all
                              duration-300
                              hover:bg-fuchsia-500/20
                              hover:text-white
                              active:scale-95
                            "
                    >
                      <FiDownload className="text-sm" />
                      دانلود
                    </a>
                  </div>

                  <img
                    src={`${API_URL}${item.afterImage}`}
                    alt="After"
                    onClick={() =>
                      setPreviewImage({
                        src: `${API_URL}${item.afterImage}`,
                        title: "نتیجه ویرایش",
                      })
                    }
                    className="
        aspect-video
        w-full
        cursor-pointer
        rounded-lg
        object-cover
        transition-all duration-300
        hover:scale-[1.02]
        hover:opacity-90
      "
                  />
                </div>
              </div>

              {/* Information */}
              <div
                className="
                        mt-4
                        grid gap-3
                        sm:grid-cols-2
                        lg:grid-cols-3
                      "
              >
                <Info
                  title="نوع ویرایش تصویر"
                  value={
                    firstSelectLabels[item.firstSelect] || item.firstSelect
                  }
                />

                <Info
                  title="میزان تغییر تصویر"
                  value={
                    secondSelectLabels[item.secondSelect] || item.secondSelect
                  }
                />

                <Info
                  title="هدف اصلی ویرایش"
                  value={deviceLabels[item.device] || item.device}
                />

                <Info
                  title="سبک ویرایش"
                  value={requestLabels[item.request] || item.request}
                />

                <Info
                  title="نوع تصویر"
                  value={brandLabels[item.brand] || item.brand}
                />

                {item.description && (
                  <div
                    className="
          flex
          flex-col
          gap-2
          rounded-xl
          border border-purple-500/10
          bg-white/[0.02]
          p-3
        "
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-medium text-slate-500">
                        توضیحات
                      </span>

                      <button
                        type="button"
                        onClick={() => {
                          console.log("BUTTON CLICKED:", item._id);
                          handleCopyPrompt(item.description, item._id);
                        }}
                        title="کپی"
                        aria-label="کپی توضیحات"
                        className="
        inline-flex
        h-8
        w-8
        shrink-0
        items-center
        justify-center
        rounded-lg
        border border-purple-400/20
        bg-purple-500/10
        text-purple-300
        transition-all
        duration-200
        hover:border-purple-400/30
        hover:bg-purple-500/20
        hover:text-white
        active:scale-95
      "
                      >
                        {copiedPromptId === item._id ? (
                          <FiCheck size={15} />
                        ) : (
                          <FiCopy size={15} />
                        )}
                      </button>
                    </div>

                    <p
                      className="
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Info({ title, value }) {
  return (
    <div
      className="
        rounded-xl
        border border-purple-500/10
        bg-gradient-to-br
        from-white/[0.04]
        to-purple-500/[0.03]
        p-3
        transition-all duration-300
        hover:-translate-y-0.5
        hover:border-purple-400/20
        hover:bg-purple-500/[0.06]
      "
    >
      <span className="text-xs text-slate-400">{title}</span>

      <p
        className="
          mt-1.5
          break-words
          text-sm
          font-medium
          text-purple-50
        "
      >
        {value || "-"}
      </p>
    </div>
  );
}

export default MainContainerDashboard;
