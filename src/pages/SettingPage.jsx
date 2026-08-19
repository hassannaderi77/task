import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/authContext";

import Numberone from "../components/choose/Numberone";
import Numbertwo from "../components/choose/Numbertwo";
import Device from "../components/choose/Device";
import Request from "../components/choose/Request";
import Brand from "../components/choose/Brand";
import Gallery from "../components/choose/Gallery";

function SettingPage() {
  const [firstSelect, setFirstSelect] = useState("");
  const [secondSelect, setSecondSelect] = useState("");

  const [device, setDevice] = useState("");
  const [request, setRequest] = useState("");
  const [brand, setBrand] = useState("");

  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const { info, setInfo } = useContext(AuthContext);

  const galleryRef = useRef(null);
  const cameraRef = useRef(null);

  const check = firstSelect && secondSelect && device && request && brand;

  const clickHnadler = () => {
    if (
      firstSelect &&
      secondSelect &&
      device &&
      request &&
      brand &&
      images.length > 0
    ) {
      setError("");

      setInfo({
        firstSelect,
        secondSelect,
        device,
        request,
        brand,
        images,
      });

      setFirstSelect("");
      setSecondSelect("");
      setDevice("");
      setRequest("");
      setBrand("");
      setImages([]);

      if (galleryRef.current) {
        galleryRef.current.value = "";
      }

      if (cameraRef.current) {
        cameraRef.current.value = "";
      }
    } else {
      setError("لطفاً تمام موارد را تکمیل کنید");
    }
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
            <div
              className="
              mt-8
              rounded-3xl
              border border-slate-800
              bg-slate-900
              p-6
              "
            >
              <h3
                className="
                mb-5
                text-lg
                font-bold
                "
              >
                تصاویر انتخاب شده
              </h3>

              <div className="flex flex-wrap gap-4">
                {images.map((image, index) => (
                  <img
                    key={index}
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
                ))}
              </div>
            </div>
          )}

          <button
            onClick={clickHnadler}
            className="
            mt-8
            w-full
            rounded-2xl
            bg-blue-600
            py-4
            font-bold
            text-white
            transition-all
            hover:bg-blue-500
            active:scale-95
            "
          >
            ارسال درخواست
          </button>
        </div>

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

        <h3 className="mb-4 text-lg font-bold">
          تصاویر
        </h3>


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
