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

//       const result = await editImage({
//         images,
//         firstSelect,
//         secondSelect,
//         device,
//         request,
//         brand,
//         description,
//       });

//       const imageUrl = result?.data?.[0]?.url;

// if (!imageUrl) {
//   throw new Error("تصویر ویرایش شده از API دریافت نشد");
// }

// setEditedImages([
//   {
//     before: images[0],
//     after: imageUrl,
//   },
// ]);
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
      min-h-screen
      bg-slate-950
      px-4 py-10
      text-white
      sm:px-6
      "
    >
      <div className="mx-auto max-w-5xl">
        {/* Header */}

        <div className="mb-10 text-center">
          <h1
            className="
          text-4xl font-black
          sm:text-5xl
          "
          >
            ثبت درخواست
          </h1>

          <p
            className="
          mt-3 text-sm
          text-slate-400
          sm:text-base
          "
          >
            اطلاعات دستگاه و درخواست خود را وارد کنید
          </p>
        </div>

        <div
          className="
        rounded-3xl
        border border-slate-800
        bg-slate-900/50
        p-5
        shadow-2xl
        backdrop-blur
        sm:p-8
        "
        >
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
          mt-6
          grid
          grid-cols-1
          gap-5
          lg:grid-cols-3
          "
          >
            <Device device={device} setDevice={setDevice} />

            <Request request={request} setRequest={setRequest} />

            <Brand brand={brand} setBrand={setBrand} />
          </div>

          <div>
            <Description
              description={description}
              setDescription={setDescription}
            />
          </div>

          {error && (
            <div
              className="
              mt-6
              rounded-xl
              border border-red-500/30
              bg-red-500/10
              p-3
              text-center
              text-sm
              text-red-400
              "
            >
              {error}
            </div>
          )}

          <Gallery
            check={check}
            galleryRef={galleryRef}
            cameraRef={cameraRef}
            setImages={setImages}
          />

          {images.length > 0 && (
            <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <h3 className="mb-5 text-lg font-bold">تصاویر انتخاب شده</h3>

              <div className="flex flex-wrap gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={image.name}
                      className="
              h-28 w-28
              rounded-2xl
              object-cover
              ring-2
              ring-slate-700
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
    h-7
    w-7
    items-center
    justify-center
    rounded-full
    bg-red-600
    p-0
    text-lg
    font-bold
    leading-none
    text-white
    shadow-lg
    transition
    hover:bg-red-500
  "
                    >
                      <span className="mb-px">×</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
  onClick={clickHnadler}
  disabled={isPending}
  className="
    mt-8
    flex
    w-full
    items-center
    justify-center
    gap-3
    rounded-2xl
    bg-blue-600
    py-4
    font-bold
    text-white
    transition-all
    hover:bg-blue-500
    active:scale-95
    disabled:cursor-not-allowed
    disabled:opacity-90
  "
>
  {isPending ? (
    <>
      <div className="relative flex h-6 w-6 items-center justify-center">
        <span className="absolute h-6 w-6 animate-ping rounded-full bg-white/20" />
        <span className="absolute h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        <span className="h-1.5 w-1.5 rounded-full bg-white" />
      </div>

      <span>لطفا صبر کنید</span>
    </>
  ) : (
    <>
      <span>ارسال درخواست</span>
      <span className="text-lg">✦</span>
    </>
  )}
</button>
        </div>

        {apiError && (
          <div className="mt-8 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-center text-red-400">
            <ErrorMessage message={apiError} />
          </div>
        )}

        {editedImages.length > 0 && (
          <div className="mt-10">
            <h2 className="mb-6 text-center text-2xl font-black">
              نتیجه ویرایش تصاویر
            </h2>

            <div className="space-y-6">
              {editedImages.map((item, index) => (
                <div
                  key={index}
                  className="
            rounded-3xl
            border
            border-slate-800
            bg-slate-900
            p-5
          "
                >
                  <h3 className="mb-5 text-center text-lg font-bold">
                    تصویر {index + 1}
                  </h3>

                  <div className="grid gap-5 md:grid-cols-2">
                    {/* Before */}
                    <div>
                      <h4 className="mb-3 text-center font-bold text-slate-300">
                        Before
                      </h4>

                      <img
                        src={URL.createObjectURL(item.before)}
                        alt={`Before ${index + 1}`}
                        className="
                  w-full
                  rounded-2xl
                  object-cover
                "
                      />
                    </div>

                    {/* After */}
                    <div>
                      <h4 className="mb-3 text-center font-bold text-slate-300">
                        After
                      </h4>

                      <img
                        src={item.after}
                        alt={`After ${index + 1}`}
                        className="
    w-full
    rounded-2xl
    object-cover
  "
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {info && (
          <div
            className="
    mt-10
    rounded-3xl
    border border-slate-800
    bg-slate-900
    p-6
    "
          >
            <h2
              className="
      mb-6
      text-xl
      font-bold
      "
            >
              اطلاعات ثبت شده
            </h2>

            <div
              className="
      grid
      gap-4
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
                <h3 className="mb-4 text-lg font-bold">تصاویر</h3>

                <div
                  className="
          flex
          flex-wrap
          gap-4
          "
                >
                  {info.images.map((image, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt={image.name}
                      className="
              h-32
              w-32
              rounded-2xl
              object-cover
              border
              border-slate-700
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
    rounded-xl
    bg-slate-800
    p-4
    "
    >
      <span className="text-sm text-slate-400">{title}</span>

      <p className="mt-2 font-bold">{value}</p>
    </div>
  );
}

export default SettingPage;
