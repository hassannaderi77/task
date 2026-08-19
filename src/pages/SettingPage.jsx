import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/authContext";

function SettingPage() {
  const [firstSelect, setFirstSelect] = useState("");

  const [secondSelect, setSecondSelect] = useState("");

  const [device, setDevice] = useState("");
  const [request, setRequest] = useState("");
  const [brand, setBrand] = useState("");
  const [images, setImages] = useState([]);

  const { info, setInfo } = useContext(AuthContext);

  const check = firstSelect && secondSelect && device && request && brand;
  const [error, setError] = useState("");

  const galleryRef = useRef(null);
  const cameraRef = useRef(null);

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
      setError("تمام مقادیر را پر کنید");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6">
        <h1 className="text-center text-4xl font-bold text-white sm:text-5xl">
          Setting Page
        </h1>

        <div className="mx-auto w-full max-w-2xl">
          <div className="mx-auto mt-10 w-full rounded-2xl border border-slate-700 bg-slate-900 p-5 text-center shadow-xl sm:p-8">
            <select
              className="w-full cursor-pointer rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 sm:text-base"
              value={firstSelect}
              onChange={(e) => setFirstSelect(e.target.value)}
              name=""
              id=""
            >
              <option value="" disabled>
                یکی از موارد زیر را انتخاب کنید
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>

          <div className="mx-auto mt-5 w-full rounded-2xl border border-slate-700 bg-slate-900 p-5 text-center shadow-xl sm:p-8">
            <select
              className="w-full cursor-pointer rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 sm:text-base"
              value={secondSelect}
              onChange={(e) => setSecondSelect(e.target.value)}
              name=""
              id=""
            >
              <option value="" disabled>
                یکی از موارد زیر را انتخاب کنید
              </option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-xl">
              <h3 className="mb-4 text-lg font-semibold text-white">device</h3>

              <div className="flex flex-col gap-3">
                <label className="flex cursor-pointer items-center gap-3 text-slate-300">
                  <input
                    className="h-4 w-4 accent-blue-600"
                    type="radio"
                    name="device"
                    value="mobile"
                    checked={device === "mobile"}
                    onChange={(e) => setDevice(e.target.value)}
                  />
                  mobile
                </label>

                <label className="flex cursor-pointer items-center gap-3 text-slate-300">
                  <input
                    className="h-4 w-4 accent-blue-600"
                    type="radio"
                    name="device"
                    value="tablet"
                    checked={device === "tablet"}
                    onChange={(e) => setDevice(e.target.value)}
                  />
                  tablet
                </label>

                <label className="flex cursor-pointer items-center gap-3 text-slate-300">
                  <input
                    className="h-4 w-4 accent-blue-600"
                    type="radio"
                    name="device"
                    value="laptop"
                    checked={device === "laptop"}
                    onChange={(e) => setDevice(e.target.value)}
                  />
                  laptop
                </label>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-xl">
              <h3 className="mb-4 text-lg font-semibold text-white">request</h3>

              <div className="flex flex-col gap-3">
                <label className="flex cursor-pointer items-center gap-3 text-slate-300">
                  <input
                    className="h-4 w-4 accent-blue-600"
                    type="radio"
                    name="request"
                    value="repair"
                    checked={request === "repair"}
                    onChange={(e) => setRequest(e.target.value)}
                  />
                  repair
                </label>

                <label className="flex cursor-pointer items-center gap-3 text-slate-300">
                  <input
                    className="h-4 w-4 accent-blue-600"
                    type="radio"
                    name="request"
                    value="replace"
                    checked={request === "replace"}
                    onChange={(e) => setRequest(e.target.value)}
                  />
                  replace
                </label>

                <label className="flex cursor-pointer items-center gap-3 text-slate-300">
                  <input
                    className="h-4 w-4 accent-blue-600"
                    type="radio"
                    name="request"
                    value="check"
                    checked={request === "check"}
                    onChange={(e) => setRequest(e.target.value)}
                  />
                  check
                </label>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-xl">
              <h3 className="mb-4 text-lg font-semibold text-white">brand</h3>

              <div className="flex flex-col gap-3">
                <label className="flex cursor-pointer items-center gap-3 text-slate-300">
                  <input
                    className="h-4 w-4 accent-blue-600"
                    type="radio"
                    name="brand"
                    value="samsung"
                    checked={brand === "samsung"}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                  samsung
                </label>

                <label className="flex cursor-pointer items-center gap-3 text-slate-300">
                  <input
                    className="h-4 w-4 accent-blue-600"
                    type="radio"
                    name="brand"
                    value="xiaomi"
                    checked={brand === "xiaomi"}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                  xiaomi
                </label>

                <label className="flex cursor-pointer items-center gap-3 text-slate-300">
                  <input
                    className="h-4 w-4 accent-blue-600"
                    type="radio"
                    name="brand"
                    value="nokia"
                    checked={brand === "nokia"}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                  nokia
                </label>
              </div>
            </div>
          </div>

          {error ? <h1 className="text-center text-red-500">{error}</h1> : ""}

          <input
            disabled={!check}
            ref={galleryRef}
            className="mt-5 w-full cursor-pointer rounded-xl border border-dashed border-slate-600 bg-slate-900 px-4 py-4 text-sm text-slate-300 transition hover:border-blue-500 hover:bg-slate-800 file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-500 sm:px-5 sm:py-5"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              setImages((prev) => [...prev, ...Array.from(e.target.files)]);
            }}
          />

          <input
            disabled={!check}
            ref={cameraRef}
            className="mt-5 w-full cursor-pointer rounded-xl border border-dashed border-slate-600 bg-slate-900 px-4 py-4 text-sm text-slate-300 transition hover:border-blue-500 hover:bg-slate-800 file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-500 sm:px-5 sm:py-5"
            type="file"
            accept="image/*"
            multiple
            capture="environment"
            onChange={(e) => {
              setImages((prev) => [...prev, ...Array.from(e.target.files)]);
            }}
          />

          {images.length > 0 && (
  <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-900 p-6 text-white">
    <h3 className="mb-4 text-lg font-semibold">Images:</h3>

    <div className="flex flex-wrap gap-4">
      {images.map((image, index) => (
        <img
          key={index}
          src={URL.createObjectURL(image)}
          alt={image.name}
          className="h-32 w-32 rounded-xl object-cover"
        />
      ))}
    </div>
  </div>
)}

          <button
            onClick={clickHnadler}
            className="mt-6 w-full rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 active:scale-[0.98] sm:py-3.5 sm:text-base"
          >
            Send
          </button>
        </div>
        {info && (
          <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-900 p-6 text-white">
            <p>First Select: {info.firstSelect}</p>
            <p>Second Select: {info.secondSelect}</p>
            <p>Device: {info.device}</p>
            <p>Request: {info.request}</p>
            <p>Brand: {info.brand}</p>

            <div className="mt-4">
              <h3 className="mb-3 text-lg font-semibold">Images:</h3>

              <div className="flex flex-wrap gap-4">
                {info.images.map((image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt={image.name}
                    className="h-32 w-32 rounded-xl object-cover"
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SettingPage;
