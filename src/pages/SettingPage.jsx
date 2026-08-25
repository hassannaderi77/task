import React, { useContext, useRef, useState } from "react";
import ImageEditor from "../components/ui/ImageEditor";

import { AuthContext } from "../context/authContext";

import { getApiErrorMessage } from "../api/errorHandler";

import { FiDownload, FiEdit3 } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

import Numberone from "../components/filter/Numberone";
import Numbertwo from "../components/filter/Numbertwo";
import Device from "../components/filter/Device";
import Request from "../components/filter/Request";
import Brand from "../components/filter/Brand";
import Gallery from "../components/filter/Gallery";
import Description from "../components/filter/Description";

import ErrorMessage from "../components/ui/ErrorMessage";

import { useImageEdit } from "../hooks/useImageEdit";

import { createHistory } from "../api/services/historyService";


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

  const { mutateAsync: editImage, isPending } = useImageEdit();

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

      console.log("ITEM BEFORE HISTORY:", item)

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
        generatedPrompt:item.generatedPrompt,
      });

      console.log("SAVED HISTORY:", savedHistory);

      return {
        ...item,

        // URL داخلی Backend
        after: savedHistory.afterImage,
      };
    }),
  );

  console.log("HISTORY RESULTS:", historyResults);

  // به جای URL موقت Avalai،
  // URL ذخیره‌شده در Backend را نمایش بده
  setEditedImages(historyResults);

  console.log("Image history saved successfully");
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
              text-4xl font-black
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

        <div
          className="
            relative overflow-hidden
            rounded-4xl
            border border-purple-500/20
            bg-linear-to-br
            from-[#160d2b]/90
            via-[#1d1038]/80
            to-[#0d0718]/90
            p-5
            shadow-2xl
            shadow-purple-950/40
            backdrop-blur-xl
            sm:p-8
          "
        >
          {/* Top gradient */}

          <div
            className="
              absolute left-0 right-0 top-0
              h-0.5
              bg-linear-to-r
              from-transparent
              via-purple-500
              to-fuchsia-500
            "
          />

          <div className="relative">
            {/* Selects */}

            <Numberone
              firstSelect={firstSelect}
              setFirstSelect={setFirstSelect}
            />

            <Numbertwo
              secondSelect={secondSelect}
              setSecondSelect={setSecondSelect}
            />

            {/* Device / Request / Brand */}

            <div
              className="
                mt-6 grid
                grid-cols-1
                gap-5
                lg:grid-cols-3
              "
            >
              <Device device={device} setDevice={setDevice} />

              <Request request={request} setRequest={setRequest} />

              <Brand brand={brand} setBrand={setBrand} />
            </div>

            {/* Description */}

            <div>
              <Description
                description={description}
                setDescription={setDescription}
              />
            </div>

            {/* Validation Error */}

            {error && (
              <div
                className="
                  mt-6
                  rounded-2xl
                  border border-red-500/20
                  bg-gradient-to-r
                  from-red-500/10
                  to-purple-500/[0.04]
                  p-4
                  text-center
                  text-sm
                  font-medium
                  text-red-300
                  shadow-lg
                  shadow-red-950/10
                "
              >
                <span className="mr-1">⚠️</span>
                {error}
              </div>
            )}

            {/* Gallery */}

            <Gallery
              check={check}
              galleryRef={galleryRef}
              cameraRef={cameraRef}
              setImages={setImages}
            />

            {/* Selected Images */}

            {images.length > 0 && (
              <div
                className="
                  mt-8
                  overflow-hidden
                  rounded-3xl
                  border border-purple-500/15
                  bg-gradient-to-br
                  from-purple-500/[0.06]
                  to-fuchsia-500/[0.03]
                  p-5
                  shadow-xl
                  shadow-purple-950/20
                  sm:p-6
                "
              >
                <div className="mb-5 flex items-center gap-3">
                  <div
                    className="
                      flex h-10 w-10
                      items-center justify-center
                      rounded-xl
                      bg-gradient-to-br
                      from-purple-500/20
                      to-fuchsia-500/10
                    "
                  >
                    🖼️
                  </div>

                  <h3 className="text-lg font-bold text-purple-100">
                    تصاویر انتخاب شده
                  </h3>
                </div>

                <div className="flex flex-wrap gap-5">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="
                        group relative
                        overflow-visible
                      "
                    >
                      <img
                        src={URL.createObjectURL(image)}
                        alt={image.name}
                        className="
                          h-28 w-28
                          rounded-2xl
                          border border-purple-400/20
                          object-cover
                          shadow-lg
                          shadow-purple-950/30
                          ring-2
                          ring-purple-500/10
                          transition-all duration-300
                          group-hover:scale-105
                          group-hover:ring-purple-400/30
                        "
                      />

                      <button
                        type="button"
                        onClick={() => editSelectedImage(index)}
                        title="ویرایش تصویر"
                        className="
    absolute
    bottom-2
    left-2
    flex
    h-8 w-8
    items-center
    justify-center
    rounded-xl
    border border-white/20
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
                        <FiEdit3 className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="
                          absolute
                          -right-2
                          -top-2
                          flex
                          h-7 w-7
                          items-center
                          justify-center
                          rounded-full
                          border border-red-400/20
                          bg-gradient-to-br
                          from-red-500
                          to-rose-600
                          p-0
                          text-lg
                          font-bold
                          leading-none
                          text-white
                          shadow-lg
                          shadow-red-950/30
                          transition-all duration-300
                          hover:scale-110
                          hover:from-red-400
                          hover:to-rose-500
                          active:scale-90
                        "
                      >
                        <span className="mb-px">×</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit */}

            <button
              onClick={clickHnadler}
              disabled={isPending}
              className="
              cursor-pointer
    group relative
    mt-8 flex w-full
    items-center
    justify-center
    gap-3
    overflow-hidden
    rounded-2xl
    bg-gradient-to-r
    from-purple-600
    via-violet-600
    to-fuchsia-600
    py-4
    font-bold
    text-white
    shadow-xl
    shadow-purple-600/30
    transition-all duration-300
    hover:-translate-y-0.5
    hover:shadow-2xl
    hover:shadow-purple-500/40
    active:scale-[0.98]
    disabled:cursor-not-allowed
    disabled:opacity-90
  "
            >
              {/* افکت نور هنگام hover */}
              <span
                className="
      pointer-events-none
      absolute
      inset-y-0
      -left-full
      w-1/2
      skew-x-[-20deg]
      bg-gradient-to-r
      from-transparent
      via-white/20
      to-transparent
      transition-all duration-700
      group-hover:left-[130%]
    "
              />

              {isPending ? (
                <>
                  {/* افکت نور متحرک هنگام پردازش */}
                  <span
                    className="
          pointer-events-none
          absolute
          inset-y-0
          -translate-x-full
          w-1/2
          skew-x-[-20deg]
          bg-gradient-to-r
          from-transparent
          via-white/20
          to-transparent
          animate-[loadingShimmer_1.8s_infinite]
        "
                  />

                  {/* Spinner */}
                  <div
                    className="
          relative flex
          h-6 w-6
          items-center
          justify-center
        "
                  >
                    <span
                      className="
            absolute
            h-6 w-6
            animate-ping
            rounded-full
            bg-white/20
          "
                    />

                    <span
                      className="
            absolute
            h-4 w-4
            animate-spin
            rounded-full
            border-2
            border-white/30
            border-t-white
          "
                    />

                    <span
                      className="
            h-1.5 w-1.5
            rounded-full
            bg-white
          "
                    />
                  </div>

                  <span className="relative">لطفا صبر کنید</span>
                </>
              ) : (
                <>
                  <span className="relative">ارسال درخواست</span>

                  <span
                    className="
          relative
          text-lg
          transition-transform
          duration-300
          group-hover:rotate-12
        "
                  >
                    ✦
                  </span>
                </>
              )}
            </button>
          </div>

          {/* Bottom gradient */}

          <div
            className="
              absolute bottom-0 left-1/2
              h-[2px] w-1/3
              -translate-x-1/2
              rounded-full
              bg-gradient-to-r
              from-transparent
              via-fuchsia-500
              to-transparent
            "
          />
        </div>

        {/* API Error */}

        {apiError && (
          <div
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
          <div className="mt-10">
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
      text-2xl font-black
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

                  <h3
                    className="
                      relative mb-6
                      text-center
                      text-lg font-bold
                      text-purple-100
                    "
                  >
                    تصویر {index + 1}
                  </h3>

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
                          font-bold
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
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <h4
                          className="
                            font-bold
                            text-purple-200
                          "
                        >
                          After
                        </h4>

                        <a
                          href={`${API_URL}${item.after}`}
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
                            px-3
                            py-2
                            text-xs
                            font-semibold
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
                         src={`${API_URL}${item.after}`}
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
