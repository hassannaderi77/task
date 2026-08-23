import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/authContext";
import { getApiErrorMessage } from "../api/errorHandler";

import Numberone from "../components/filter/Numberone";
import Numbertwo from "../components/filter/Numbertwo";
import Device from "../components/filter/Device";
import Request from "../components/filter/Request";
import Brand from "../components/filter/Brand";
import Gallery from "../components/filter/Gallery";
import { useImageEdit } from "../hooks/useImageEdit";
import Description from "../components/filter/Description";
import ErrorMessage from "../components/ui/ErrorMessage";

function SettingPage() {
  const [firstSelect, setFirstSelect] = useState("");
  const [secondSelect, setSecondSelect] = useState("");
  const [device, setDevice] = useState("");
  const [request, setRequest] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");

  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const { info, setInfo } = useContext(AuthContext);

  const galleryRef = useRef(null);
  const cameraRef = useRef(null);

  const { mutateAsync: editImage, isPending } = useImageEdit();

  const [editedImages, setEditedImages] = useState([]);
  const [apiError, setApiError] = useState("");

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

  return (
    <div
      dir="rtl"
      className="
        relative min-h-screen
        overflow-hidden
        bg-gradient-to-br
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
              bg-gradient-to-br
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
            ✨
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
            اطلاعات دستگاه و درخواست خود را وارد کنید
          </p>

          <div
            className="
              mx-auto mt-5
              h-1 w-24
              rounded-full
              bg-gradient-to-r
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
            rounded-[2rem]
            border border-purple-500/20
            bg-gradient-to-br
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
              h-[2px]
              bg-gradient-to-r
              from-transparent
              via-purple-500
              to-fuchsia-500
            "
          />

          <div className="relative">
            <Numberone
              firstSelect={firstSelect}
              setFirstSelect={setFirstSelect}
            />

            <Numbertwo
              secondSelect={secondSelect}
              setSecondSelect={setSecondSelect}
            />

            <div
              className="
                mt-6 grid
                grid-cols-1
                gap-5
                lg:grid-cols-3
              "
            >
              <Device
                device={device}
                setDevice={setDevice}
              />

              <Request
                request={request}
                setRequest={setRequest}
              />

              <Brand
                brand={brand}
                setBrand={setBrand}
              />
            </div>

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
              <span
                className="
                  pointer-events-none absolute
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
                  <div className="relative flex h-6 w-6 items-center justify-center">
                    <span className="absolute h-6 w-6 animate-ping rounded-full bg-white/20" />

                    <span
                      className="
                        absolute h-4 w-4
                        animate-spin
                        rounded-full
                        border-2
                        border-white/30
                        border-t-white
                      "
                    />

                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  </div>

                  <span className="relative">
                    لطفا صبر کنید
                  </span>
                </>
              ) : (
                <>
                  <span className="relative">
                    ارسال درخواست
                  </span>

                  <span className="relative text-lg transition-transform duration-300 group-hover:rotate-12">
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
                  shadow-lg
                  shadow-purple-950/20
                "
              >
                ✨
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
                      text-center text-lg font-bold
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
                      <h4 className="mb-3 text-center font-bold text-slate-300">
                        Before
                      </h4>

                      <img
                        src={URL.createObjectURL(item.before)}
                        alt={`Before ${index + 1}`}
                        className="
                          w-full
                          rounded-xl
                          object-cover
                          transition-transform duration-500
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
                      <h4
                        className="
                          mb-3 text-center
                          font-bold
                          text-purple-200
                        "
                      >
                        After
                      </h4>

                      <img
                        src={item.after}
                        alt={`After ${index + 1}`}
                        className="
                          w-full
                          rounded-xl
                          object-cover
                          transition-transform duration-500
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

        {/* Saved Info */}
        {info && (
          <div
            className="
              relative mt-10
              overflow-hidden
              rounded-[2rem]
              border border-purple-500/20
              bg-gradient-to-br
              from-[#160d2b]/90
              via-[#1d1038]/80
              to-[#0d0718]/90
              p-6
              shadow-2xl
              shadow-purple-950/30
              backdrop-blur-xl
            "
          >
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

            <h2
              className="
                relative mb-6
                text-xl font-bold
                text-transparent
                bg-gradient-to-r
                from-purple-200
                to-fuchsia-300
                bg-clip-text
              "
            >
              اطلاعات ثبت شده
            </h2>

            <div
              className="
                grid gap-4
                sm:grid-cols-2
              "
            >
              <Info title="گزینه اول" value={info.firstSelect} />
              <Info title="گزینه دوم" value={info.secondSelect} />
              <Info title="دستگاه" value={info.device} />
              <Info title="درخواست" value={info.request} />
              <Info title="برند" value={info.brand} />
            </div>

            {info.images && info.images.length > 0 && (
              <div className="mt-8">
                <h3
                  className="
                    mb-4 text-lg font-bold
                    text-purple-100
                  "
                >
                  تصاویر
                </h3>

                <div className="flex flex-wrap gap-4">
                  {info.images.map((image, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt={image.name}
                      className="
                        h-32 w-32
                        rounded-2xl
                        border border-purple-500/20
                        object-cover
                        shadow-lg
                        shadow-purple-950/20
                        transition-all duration-300
                        hover:scale-105
                        hover:border-purple-400/40
                      "
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Info({ title, value }) {
  return (
    <div
      className="
        group
        rounded-2xl
        border border-purple-500/10
        bg-gradient-to-br
        from-white/[0.04]
        to-purple-500/[0.03]
        p-4
        transition-all duration-300
        hover:-translate-y-0.5
        hover:border-purple-400/20
        hover:bg-purple-500/[0.06]
      "
    >
      <span className="text-sm text-slate-400">
        {title}
      </span>

      <p className="mt-2 font-bold text-purple-50">
        {value}
      </p>
    </div>
  );
}

export default SettingPage;