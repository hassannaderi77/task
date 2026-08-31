import React, { useContext, useRef, useState, useEffect } from "react";

import ImageEditor from "../components/ui/ImageEditor";

import { AuthContext } from "../context/authContext";

import { getApiErrorMessage } from "../api/errorHandler";

import { FiDownload } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

import ErrorMessage from "../components/ui/ErrorMessage";

import { useImageEdit } from "../hooks/useImageEdit";

import { createHistory } from "../api/services/historyService";
import FormSetting from "../components/formSetting/FormSetting";

const API_URL = import.meta.env.VITE_API_URL.replace("/api", "");

function SettingPage() {
  const [firstSelect, setFirstSelect] = useState("");
  const [secondSelect, setSecondSelect] = useState("");
  const [device, setDevice] = useState("");
  const [request, setRequest] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [apiError, setApiError] = useState("");
  const [editedImages, setEditedImages] = useState([]);
  const [editingImage, setEditingImage] = useState(null);

  const { user } = useContext(AuthContext);

  const galleryRef = useRef(null);
  const cameraRef = useRef(null);

  const errorRef = useRef(null);
  const apiErrorRef = useRef(null);
  const resultRef = useRef(null);

  const { mutateAsync: editImage, isPending } = useImageEdit();

  const selectLabels = {
    firstSelect: {
      background_remove: "حذف پس‌زمینه",
      background_change: "تغییر پس‌زمینه",
      object_remove: "حذف یک شیء از تصویر",
      object_add: "اضافه کردن شیء به تصویر",
    },

    secondSelect: {
      minimal: "تغییر جزئی",
      moderate: "تغییر متوسط",
      strong: "تغییر قابل توجه",
      creative: "ویرایش خلاقانه",
    },

    device: {
      background: "پس‌زمینه",
      quality: "کیفیت تصویر",
      appearance: "ظاهر تصویر",
      object: "جزئیات تصویر",
    },

    request: {
      natural: "طبیعی",
      professional: "حرفه‌ای",
      creative: "خلاقانه",
    },

    brand: {
      product: "محصول",
      person: "شخص",
      object: "شیء",
    },
  };

  useEffect(() => {
    if (error) {
      errorRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [error]);

  useEffect(() => {
    if (apiError) {
      apiErrorRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [apiError]);

  const check = firstSelect && secondSelect && device && request && brand;

  const clickHnadler = async () => {
    if (
      !firstSelect ||
      !secondSelect ||
      !device ||
      !request ||
      !brand ||
      images.length === 0
    ) {
      setError("لطفاً تمام موارد را تکمیل کنید");
      return;
    }

    try {
      setError("");
      setApiError("");
      setEditedImages([]);

      // ارسال عکس‌ها برای ویرایش
      const result = await editImage({
        images,
        firstSelect,
        secondSelect,
        device,
        request,
        brand,
        description,
      });

      console.log("Edited images result:", result);

      if (!result || result.length === 0) {
        throw new Error("تصاویر ویرایش شده از API دریافت نشد");
      }

      setEditedImages(result);

      // بررسی کاربر لاگین شده
      console.log("USER FROM AUTH:", user);
      console.log("USER ID:", user?.id);
      console.log("RESULT FOR HISTORY:", result);

      if (!user?.id) {
        console.error("User ID not found. History was not saved.");
        return;
      }

      // ذخیره تاریخچه هر تصویر
      try {
        const historyResults = await Promise.all(
          result.map(async (item, index) => {
            console.log("========== HISTORY DEBUG ==========");
            console.log("Image index:", index);
            console.log("Before:", item.before);
            console.log("After from Avalai:", item.after);
            console.log("User ID:", user.id);
            console.log("===================================");

            console.log("ITEM BEFORE HISTORY:", item);

            const savedHistory = await createHistory({
              userId: user.id,
              beforeImage: item.before,
              afterImage: item.after,
              firstSelect,
              secondSelect,
              device,
              request,
              brand,
              description,
              generatedPrompt: item.generatedPrompt,
            });

            console.log("SAVED HISTORY:", savedHistory);

            return {
              ...item,

              // URL داخلی Backend
              after: `${API_URL}${savedHistory.afterImage}`,
            };
          }),
        );

        console.log("HISTORY RESULTS:", historyResults);

        // به جای URL موقت Avalai،
        // URL ذخیره‌شده در Backend را نمایش بده
        setEditedImages(historyResults);

        console.log("Image history saved successfully");
        setTimeout(() => {
          resultRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      } catch (historyError) {
        console.error("History save error:", historyError);
      }
    } catch (error) {
      console.error("Image edit error:", error);
      setApiError(getApiErrorMessage(error));
    }
  };

  const removeImage = (indexToRemove) => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove),
    );
  };

  const editSelectedImage = (index) => {
    setEditingImage({
      image: images[index],
      index,
    });
  };

  return (
    <div
      dir="rtl"
      className="
        relative min-h-screen
        overflow-hidden
        bg-linear-to-br
        from-[#08040f]
        via-[#160d2b]
        to-[#0d0718]
        px-4 py-10
        text-white
        sm:px-6
      "
    >
      {/* Background glows */}

      <div
        className="
          pointer-events-none absolute
          -right-40 -top-40
          h-96 w-96
          rounded-full
          bg-purple-600/15
          blur-[120px]
        "
      />

      <div
        className="
          pointer-events-none absolute
          -bottom-40 -left-40
          h-96 w-96
          rounded-full
          bg-fuchsia-600/10
          blur-[120px]
        "
      />

      <div className="relative mx-auto max-w-5xl">
        {/* Header */}

        <div className="mb-10 text-center">
          <div
            className="
              mx-auto mb-5
              flex h-20 w-20
              items-center justify-center
              rounded-3xl
              border border-purple-400/20
              bg-linear-to-br
              from-purple-500/20
              via-violet-500/10
              to-fuchsia-500/10
              text-4xl
              shadow-xl
              shadow-purple-950/30
              transition-all duration-500
              hover:scale-110
              hover:rotate-2
            "
          >
            <img
              src="/logo.jpg"
              alt="AI Image Editor"
              className="
                h-20 w-20
                rounded-3xl
                border border-purple-400/20
                object-contain
                p-2
                shadow-xl
                shadow-purple-950/30
                transition-all duration-500
                hover:scale-110
                hover:rotate-2
              "
            />
          </div>

          <h1
            className="
              text-4xl font-medium
              text-transparent
              bg-gradient-to-r
              from-purple-200
              via-fuchsia-300
              to-purple-300
              bg-clip-text
              sm:text-5xl
            "
          >
            ثبت درخواست
          </h1>

          <p
            className="
              mt-3 text-sm
              leading-7
              text-slate-400
              sm:text-base
            "
          >
            اطلاعات تکمیل و درخواست خود را وارد کنید
          </p>

          <div
            className="
              mx-auto mt-5
              h-1 w-24
              rounded-full
              bg-linear-to-r
              from-purple-500
              via-fuchsia-500
              to-purple-500
            "
          />
        </div>

        {/* Main Form Card */}

        <FormSetting
          firstSelect={firstSelect}
          setFirstSelect={setFirstSelect}
          secondSelect={secondSelect}
          setSecondSelect={setSecondSelect}
          device={device}
          setDevice={setDevice}
          request={request}
          setRequest={setRequest}
          brand={brand}
          setBrand={setBrand}
          description={description}
          setDescription={setDescription}
          error={error}
          check={check}
          galleryRef={galleryRef}
          cameraRef={cameraRef}
          setImages={setImages}
          images={images}
          editSelectedImage={editSelectedImage}
          removeImage={removeImage}
          clickHnadler={clickHnadler}
          isPending={isPending}
          errorRef={errorRef}
        />

        {/* API Error */}

        {apiError && (
          <div
            ref={apiErrorRef}
            className="
              mt-8
              overflow-hidden
              rounded-2xl
              border border-red-500/20
              bg-gradient-to-br
              from-red-500/10
              to-purple-500/[0.04]
              p-4
              text-center
              shadow-xl
              shadow-red-950/10
            "
          >
            <ErrorMessage message={apiError} />
          </div>
        )}

        {/* Edited Images */}

        {editedImages.length > 0 && (
          <div ref={resultRef} className="mt-10">
            <div className="mb-6 text-center">
              <div
                className="
      mx-auto mb-4
      flex h-14 w-14
      items-center justify-center
      rounded-2xl
      bg-gradient-to-br
      from-purple-500/20
      to-fuchsia-500/10
      text-2xl
      text-purple-300
      shadow-lg
      shadow-purple-950/20
    "
              >
                <HiSparkles />
              </div>

              <h2
                className="
      text-2xl font-medium
      text-transparent
      bg-gradient-to-r
      from-purple-200
      via-fuchsia-300
      to-purple-300
      bg-clip-text
    "
              >
                نتیجه ویرایش تصاویر
              </h2>
            </div>

            <div className="space-y-6">
              {editedImages.map((item, index) => (
                <div
                  key={index}
                  className="
      relative overflow-hidden
      rounded-[2rem]
      border border-purple-500/20
      bg-gradient-to-br
      from-[#160d2b]/90
      via-[#1d1038]/80
      to-[#0d0718]/90
      p-5
      shadow-2xl
      shadow-purple-950/30
      backdrop-blur-xl
      sm:p-6
    "
                >
                  {/* Top Gradient */}
                  <div
                    className="
        absolute left-0 right-0 top-0
        h-[2px]
        bg-gradient-to-r
        from-purple-500
        via-fuchsia-500
        to-purple-500
      "
                  />

                  {/* Title */}
                  <h3
                    className="
        relative mb-6
        text-center
        text-lg font-medium
        text-purple-100
      "
                  >
                    تصویر {index + 1}
                  </h3>

                  {/* Images */}
                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Before */}
                    <div
                      className="
          overflow-hidden
          rounded-2xl
          border border-purple-500/10
          bg-black/20
          p-3
        "
                    >
                      <h4
                        className="
            mb-3
            text-center
            font-medium
            text-slate-300
          "
                      >
                        Before
                      </h4>

                      <img
                        src={URL.createObjectURL(item.before)}
                        alt={`Before ${index + 1}`}
                        className="
            w-full
            rounded-xl
            object-cover
            transition-transform
            duration-500
            hover:scale-[1.02]
          "
                      />
                    </div>

                    {/* After */}
                    <div
                      className="
          overflow-hidden
          rounded-2xl
          border border-purple-400/20
          bg-gradient-to-br
          from-purple-500/[0.05]
          to-fuchsia-500/[0.03]
          p-3
          shadow-lg
          shadow-purple-950/20
        "
                    >
                      <div
                        className="
            mb-3
            flex items-center
            justify-between
            gap-3
          "
                      >
                        <h4
                          className="
              font-medium
              text-purple-200
            "
                        >
                          After
                        </h4>

                        <a
                          href={item.after}
                          download={`edited-image-${index + 1}.png`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border border-purple-400/20
              bg-purple-500/10
              px-3 py-2
              text-xs
              font-medium
              text-purple-200
              transition-all
              duration-300
              hover:bg-purple-500/20
              hover:text-white
              active:scale-95
            "
                        >
                          <FiDownload className="text-base" />
                          دانلود
                        </a>
                      </div>

                      <img
                        src={item.after}
                        alt={`After ${index + 1}`}
                        className="
            w-full
            rounded-xl
            object-cover
            transition-transform
            duration-500
            hover:scale-[1.02]
          "
                      />
                    </div>
                  </div>

                  {/* Request Information */}
                  <div
                    className="
    mt-6
    rounded-2xl
    border border-purple-500/15
    bg-black/20
    p-4
  "
                    dir="rtl"
                  >
                    <h4
                      className="
      mb-4
      text-sm
      font-medium
      text-purple-200
    "
                    >
                      اطلاعات درخواست
                    </h4>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {/* نوع ویرایش تصویر */}
                      <div
                        className="
        rounded-xl
        border border-purple-500/10
        bg-purple-500/[0.04]
        p-3
      "
                      >
                        <span className="block text-xs text-slate-500">
                          نوع ویرایش تصویر
                        </span>

                        <span className="mt-1 block text-sm text-slate-200">
                          {selectLabels.firstSelect[firstSelect] ||
                            firstSelect ||
                            "-"}
                        </span>
                      </div>

                      {/* میزان تغییر تصویر */}
                      <div
                        className="
        rounded-xl
        border border-purple-500/10
        bg-purple-500/[0.04]
        p-3
      "
                      >
                        <span className="block text-xs text-slate-500">
                          میزان تغییر تصویر
                        </span>

                        <span className="mt-1 block text-sm text-slate-200">
                          {selectLabels.secondSelect[secondSelect] ||
                            secondSelect ||
                            "-"}
                        </span>
                      </div>

                      {/* هدف اصلی ویرایش */}
                      <div
                        className="
        rounded-xl
        border border-purple-500/10
        bg-purple-500/[0.04]
        p-3
      "
                      >
                        <span className="block text-xs text-slate-500">
                          هدف اصلی ویرایش
                        </span>

                        <span className="mt-1 block text-sm text-slate-200">
                          {selectLabels.device[device] || device || "-"}
                        </span>
                      </div>

                      {/* سبک ویرایش */}
                      <div
                        className="
        rounded-xl
        border border-purple-500/10
        bg-purple-500/[0.04]
        p-3
      "
                      >
                        <span className="block text-xs text-slate-500">
                          سبک ویرایش
                        </span>

                        <span className="mt-1 block text-sm text-slate-200">
                          {selectLabels.request[request] || request || "-"}
                        </span>
                      </div>

                      {/* نوع تصویر */}
                      <div
                        className="
        rounded-xl
        border border-purple-500/10
        bg-purple-500/[0.04]
        p-3
      "
                      >
                        <span className="block text-xs text-slate-500">
                          نوع تصویر
                        </span>

                        <span className="mt-1 block text-sm text-slate-200">
                          {selectLabels.brand[brand] || brand || "-"}
                        </span>
                      </div>
                    </div>

                    {/* توضیحات */}
                    {description && (
                      <div
                        className="
        mt-3
        rounded-xl
        border border-fuchsia-500/10
        bg-fuchsia-500/[0.04]
        p-3
      "
                      >
                        <span className="block text-xs text-slate-500">
                          توضیحات کاربر
                        </span>

                        <p
                          className="
          mt-2
          text-sm
          leading-7
          text-slate-200
        "
                        >
                          {description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {editingImage && (
          <ImageEditor
            image={editingImage.image}
            onClose={() => setEditingImage(null)}
            onSave={(editedFile) => {
              setImages((prevImages) =>
                prevImages.map((image, index) =>
                  index === editingImage.index ? editedFile : image,
                ),
              );

              setEditingImage(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default SettingPage;
