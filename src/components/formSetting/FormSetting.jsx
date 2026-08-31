import React from 'react'
import Numberone from '../filter/Numberone'
import Numbertwo from '../filter/Numbertwo'
import Device from '../filter/Device'
import Request from '../filter/Request'
import Brand from '../filter/Brand'
import Description from '../filter/Description'
import Gallery from '../filter/Gallery'
import { FiEdit3 } from 'react-icons/fi'

function FormSetting({
firstSelect,
setFirstSelect,
secondSelect,
setSecondSelect,
device,
setDevice,
request,
setRequest,
brand,
setBrand,
description,
setDescription,
error,
check,
galleryRef,
cameraRef,
setImages,
images,
editSelectedImage,
removeImage,
clickHnadler,
isPending,
errorRef
}) {
  return (
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
              ref={errorRef}
                className="
                  mt-6
                  rounded-2xl
                  border border-red-500/20
                  bg-linear-to-r
                  from-red-500/10
                  to-purple-500/4
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
                  bg-linear-to-br
                  from-purple-500/6
                  to-fuchsia-500/3
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
                      bg-linear-to-br
                      from-purple-500/20
                      to-fuchsia-500/10
                    "
                  >
                    🖼️
                  </div>

                  <h3 className="text-lg font-medium text-purple-100">
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
                          bg-linear-to-br
                          from-red-500
                          to-rose-600
                          p-0
                          text-lg
                          font-medium
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
    bg-linear-to-r
    from-purple-600
    via-violet-600
    to-fuchsia-600
    py-4
    font-medium
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
      bg-linear-to-r
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
          bg-linear-to-r
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
              h-0.5 w-1/3
              -translate-x-1/2
              rounded-full
              bg-linear-to-r
              from-transparent
              via-fuchsia-500
              to-transparent
            "
          />
        </div>
  )
}

export default FormSetting