import React, { useEffect, useRef, useState } from "react";

import {
  FiCheck,
  FiCrop,
  FiDownload,
  FiRefreshCw,
  FiRotateCcw,
  FiRotateCw,
  FiSun,
  FiX,
  FiMaximize,
  FiMove,
} from "react-icons/fi";

function ImageEditor({ image, onSave, onClose }) {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  const cropContainerRef = useRef(null);

  const cropRef = useRef({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const dragRef = useRef({
    active: false,
    type: null,
    startX: 0,
    startY: 0,
    startCrop: null,
  });

  const [rotation, setRotation] = useState(0);
  const [flipX, setFlipX] = useState(false);
  const [flipY, setFlipY] = useState(false);

  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);

  const [cropMode, setCropMode] = useState(false);

  const [crop, setCrop] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const [imageUrl] = useState(() => URL.createObjectURL(image));

  /* ---------------------------------- */
  /* Cleanup URL                         */
  /* ---------------------------------- */

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  /* ---------------------------------- */
  /* Load Image                          */
  /* ---------------------------------- */

  useEffect(() => {
    const img = new Image();

    img.onload = () => {
      imageRef.current = img;

      drawCanvas();

      requestAnimationFrame(() => {
        const canvas = canvasRef.current;

        if (!canvas) return;

        const initialCrop = {
          x: 0,
          y: 0,
          width: canvas.width,
          height: canvas.height,
        };

        cropRef.current = initialCrop;
        setCrop(initialCrop);
      });
    };

    img.src = imageUrl;
  }, [imageUrl]);

  /* ---------------------------------- */
  /* Redraw Canvas                       */
  /* ---------------------------------- */

  useEffect(() => {
    drawCanvas();
  }, [rotation, flipX, flipY, brightness, contrast]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const img = imageRef.current;

    if (!canvas || !img) return;

    const radians = (rotation * Math.PI) / 180;

    const rotated = rotation === 90 || rotation === 270;

    canvas.width = rotated ? img.height : img.width;
    canvas.height = rotated ? img.width : img.height;

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();

    ctx.translate(canvas.width / 2, canvas.height / 2);

    ctx.rotate(radians);

    ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1);

    ctx.filter = `
      brightness(${brightness}%)
      contrast(${contrast}%)
    `;

    ctx.drawImage(img, -img.width / 2, -img.height / 2);

    ctx.restore();
  };

  /* ---------------------------------- */
  /* Get Pointer Position                */
  /* ---------------------------------- */

  const getPointerPosition = (event) => {
    const canvas = canvasRef.current;

    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: Math.max(
        0,
        Math.min(canvas.width, (event.clientX - rect.left) * scaleX),
      ),

      y: Math.max(
        0,
        Math.min(canvas.height, (event.clientY - rect.top) * scaleY),
      ),
    };
  };

  /* ---------------------------------- */
  /* Crop Mode                           */
  /* ---------------------------------- */

  const enableCrop = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const newCrop = {
      x: 0,
      y: 0,
      width: canvas.width,
      height: canvas.height,
    };

    cropRef.current = newCrop;

    setCrop(newCrop);
    setCropMode(true);
  };

  /* ---------------------------------- */
  /* Start Crop Interaction              */
  /* ---------------------------------- */

  const startCropInteraction = (event, type) => {
    if (!cropMode) return;

    event.preventDefault();
    event.stopPropagation();

    const point = getPointerPosition(event);

    if (!point) return;

    const currentCrop = {
      ...cropRef.current,
    };

    dragRef.current = {
      active: true,
      type,
      startX: point.x,
      startY: point.y,
      startCrop: currentCrop,
    };

    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  /* ---------------------------------- */
  /* Move Crop                           */
  /* ---------------------------------- */

  const moveCrop = (event) => {
    if (!dragRef.current.active) return;

    event.preventDefault();

    const point = getPointerPosition(event);

    if (!point) return;

    const canvas = canvasRef.current;

    if (!canvas) return;

    const { type, startX, startY, startCrop } = dragRef.current;

    const dx = point.x - startX;
    const dy = point.y - startY;

    let nextCrop = {
      ...startCrop,
    };

    const minSize = Math.min(20, canvas.width, canvas.height);

    /* -------------------------------- */
    /* Move Entire Crop                  */
    /* -------------------------------- */

    if (type === "move") {
      nextCrop.x = Math.max(
        0,
        Math.min(canvas.width - startCrop.width, startCrop.x + dx),
      );

      nextCrop.y = Math.max(
        0,
        Math.min(canvas.height - startCrop.height, startCrop.y + dy),
      );
    }

    /* -------------------------------- */
    /* Top Left                          */
    /* -------------------------------- */

    if (type === "top-left") {
      const right = startCrop.x + startCrop.width;
      const bottom = startCrop.y + startCrop.height;

      nextCrop.x = Math.max(0, Math.min(right - minSize, startCrop.x + dx));

      nextCrop.y = Math.max(0, Math.min(bottom - minSize, startCrop.y + dy));

      nextCrop.width = right - nextCrop.x;
      nextCrop.height = bottom - nextCrop.y;
    }

    /* -------------------------------- */
    /* Top Right                         */
    /* -------------------------------- */

    if (type === "top-right") {
      const left = startCrop.x;
      const bottom = startCrop.y + startCrop.height;

      nextCrop.x = left;

      nextCrop.y = Math.max(0, Math.min(bottom - minSize, startCrop.y + dy));

      nextCrop.width = Math.max(
        minSize,
        Math.min(canvas.width - left, startCrop.width + dx),
      );

      nextCrop.height = bottom - nextCrop.y;
    }

    /* -------------------------------- */
    /* Bottom Left                       */
    /* -------------------------------- */

    if (type === "bottom-left") {
      const right = startCrop.x + startCrop.width;
      const top = startCrop.y;

      nextCrop.x = Math.max(0, Math.min(right - minSize, startCrop.x + dx));

      nextCrop.y = top;

      nextCrop.width = right - nextCrop.x;

      nextCrop.height = Math.max(
        minSize,
        Math.min(canvas.height - top, startCrop.height + dy),
      );
    }

    /* -------------------------------- */
    /* Bottom Right                      */
    /* -------------------------------- */

    if (type === "bottom-right") {
      nextCrop.x = startCrop.x;
      nextCrop.y = startCrop.y;

      nextCrop.width = Math.max(
        minSize,
        Math.min(canvas.width - startCrop.x, startCrop.width + dx),
      );

      nextCrop.height = Math.max(
        minSize,
        Math.min(canvas.height - startCrop.y, startCrop.height + dy),
      );
    }

    cropRef.current = nextCrop;

    setCrop(nextCrop);
  };

  /* ---------------------------------- */
  /* End Crop Interaction               */
  /* ---------------------------------- */

  const endCropInteraction = (event) => {
    if (!dragRef.current.active) return;

    event?.preventDefault?.();

    dragRef.current.active = false;
    dragRef.current.type = null;
  };

  /* ---------------------------------- */
  /* Cancel Crop                         */
  /* ---------------------------------- */

  const cancelCrop = () => {
    setCropMode(false);

    const canvas = canvasRef.current;

    if (!canvas) return;

    const newCrop = {
      x: 0,
      y: 0,
      width: canvas.width,
      height: canvas.height,
    };

    cropRef.current = newCrop;

    setCrop(newCrop);
  };

  /* ---------------------------------- */
  /* Apply Crop                          */
  /* ---------------------------------- */

  const handleCrop = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const currentCrop = cropRef.current;

    if (currentCrop.width < 2 || currentCrop.height < 2) {
      return;
    }

    const outputCanvas = document.createElement("canvas");

    outputCanvas.width = Math.round(currentCrop.width);

    outputCanvas.height = Math.round(currentCrop.height);

    const ctx = outputCanvas.getContext("2d");

    ctx.drawImage(
      canvas,

      Math.round(currentCrop.x),
      Math.round(currentCrop.y),

      Math.round(currentCrop.width),
      Math.round(currentCrop.height),

      0,
      0,

      Math.round(currentCrop.width),
      Math.round(currentCrop.height),
    );

    outputCanvas.toBlob(
      (blob) => {
        if (!blob) return;

        const croppedFile = new File([blob], image.name, {
          type: image.type || "image/jpeg",

          lastModified: Date.now(),
        });

        onSave(croppedFile);
      },

      image.type || "image/jpeg",

      0.95,
    );
  };

  /* ---------------------------------- */
  /* Save All Changes                    */
  /* ---------------------------------- */

  const saveImage = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.toBlob(
      (blob) => {
        if (!blob) return;

        const editedFile = new File([blob], image.name, {
          type: image.type || "image/jpeg",

          lastModified: Date.now(),
        });

        onSave(editedFile);
      },

      image.type || "image/jpeg",

      0.95,
    );
  };

  /* ---------------------------------- */
  /* Reset                               */
  /* ---------------------------------- */

  const resetAll = () => {
    setRotation(0);

    setFlipX(false);

    setFlipY(false);

    setBrightness(100);

    setContrast(100);

    setCropMode(false);

    const canvas = canvasRef.current;

    if (!canvas) return;

    const newCrop = {
      x: 0,
      y: 0,
      width: canvas.width,
      height: canvas.height,
    };

    cropRef.current = newCrop;

    setCrop(newCrop);
  };

  /* ---------------------------------- */
  /* Crop Style                          */
  /* ---------------------------------- */

  const getCropStyle = () => {
  const canvas = canvasRef.current;

  if (!canvas || !cropMode) {
    return {};
  }

  const rect = canvas.getBoundingClientRect();

  const scaleX = rect.width / canvas.width;
  const scaleY = rect.height / canvas.height;

  return {
    left: `${crop.x * scaleX}px`,
    top: `${crop.y * scaleY}px`,
    width: `${crop.width * scaleX}px`,
    height: `${crop.height * scaleY}px`,
  };
};

  /* ---------------------------------- */
  /* Handle Selection Overlay            */
  /* ---------------------------------- */

  const cropStyle = getCropStyle();

  /* ---------------------------------- */
  /* Render                              */
  /* ---------------------------------- */

  return (
    <div
      dir="rtl"
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/80
        p-2
        backdrop-blur-md
        sm:p-4
      "
    >
      <div
        className="
          flex
          h-[96vh]
          w-full
          max-w-5xl
          flex-col
          overflow-hidden
          rounded-2xl
          border border-purple-500/20
          bg-[#10091c]
          shadow-2xl
          shadow-purple-950/50
          sm:h-[94vh]
          sm:rounded-3xl
        "
      >
        {/* Header */}

        <div
          className="
            flex
            shrink-0
            items-center
            justify-between
            border-b
            border-white/5
            px-4
            py-3
            sm:px-5
            sm:py-4
          "
        >
          <div>
            <h2 className="text-base font-bold text-purple-100 sm:text-lg">
              ویرایش تصویر
            </h2>

            <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">
              تصویر را قبل از ارسال تنظیم کنید
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-xl
              border
              border-white/10
              bg-white/5
              text-slate-400
              transition
              hover:bg-red-500/10
              hover:text-red-300
              sm:h-9
              sm:w-9
            "
          >
            <FiX />
          </button>
        </div>

        {/* Image Area */}

        <div
          className="
            flex
            min-h-0
            flex-1
            items-center
            justify-center
            overflow-hidden
            bg-black/30
            p-2
            sm:p-4
          "
        >
          <div
            ref={cropContainerRef}
            className="
              relative
              inline-block
              max-h-full
              max-w-full
              items-center
              leading-none
            "
          >
            <canvas
              ref={canvasRef}
              className="
                block
                max-h-[48vh]
                max-w-full
                rounded-lg
                object-contain
                shadow-2xl
                sm:max-h-[52vh]
              "
            />

            {/* Crop System */}

            {cropMode && (
              <>
                {/* Dark Overlay */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-black/55
                  "
                />

                {/* Selected Area */}

                <div
                  className="
    absolute
    touch-none
    border
    border-white
    bg-transparent
    box-border
  "
                  style={{
                    ...cropStyle,
                    margin: 0,
                  }}
                  onPointerDown={(event) => startCropInteraction(event, "move")}
                  onPointerMove={moveCrop}
                  onPointerUp={endCropInteraction}
                  onPointerCancel={endCropInteraction}
                >
                  {/* Grid */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                    "
                  >
                    <div className="absolute left-1/3 top-0 bottom-0 border-l border-white/25" />

                    <div className="absolute left-2/3 top-0 bottom-0 border-l border-white/25" />

                    <div className="absolute top-1/3 left-0 right-0 border-t border-white/25" />

                    <div className="absolute top-2/3 left-0 right-0 border-t border-white/25" />
                  </div>

                  {/* Move Indicator */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      left-1/2
                      top-1/2
                      flex
                      -translate-x-1/2
                      -translate-y-1/2
                      items-center
                      justify-center
                      rounded-full
                      bg-black/40
                      p-2
                      text-white/70
                    "
                  >
                    <FiMove className="h-4 w-4" />
                  </div>

                  {/* Top Left */}

                  <CropHandle
                    position="top-left"
                    onPointerDown={startCropInteraction}
                  />

                  {/* Top Right */}

                  <CropHandle
                    position="top-right"
                    onPointerDown={startCropInteraction}
                  />

                  {/* Bottom Left */}

                  <CropHandle
                    position="bottom-left"
                    onPointerDown={startCropInteraction}
                  />

                  {/* Bottom Right */}

                  <CropHandle
                    position="bottom-right"
                    onPointerDown={startCropInteraction}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Tools */}

        <div
          className="
            shrink-0
            border-t
            border-white/5
            bg-[#130b21]
            p-3
            sm:p-4
          "
        >
          {/* Main Tools */}

          <div
            className="
              grid
              grid-cols-5
              gap-2
              sm:grid-cols-5
            "
          >
            {/* Crop */}

            <ToolButton
              active={cropMode}
              onClick={enableCrop}
              icon={<FiCrop />}
              label="برش"
            />

            {/* Rotate */}

            <ToolButton
              onClick={() => setRotation((prev) => (prev + 90) % 360)}
              icon={<FiRotateCw />}
              label="چرخش"
            />

            {/* Flip X */}

            <ToolButton
              active={flipX}
              onClick={() => setFlipX((prev) => !prev)}
              icon={<FiMaximize />}
              label="افقی"
            />

            {/* Flip Y */}

            <ToolButton
              active={flipY}
              onClick={() => setFlipY((prev) => !prev)}
              icon={<FiMaximize />}
              label="عمودی"
            />

            {/* Reset */}

            <ToolButton
              onClick={resetAll}
              icon={<FiRefreshCw />}
              label="بازنشانی"
            />
          </div>

          {/* Brightness */}

          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FiSun className="h-4 w-4 text-purple-300" />

                <span className="text-xs font-semibold text-slate-300">
                  روشنایی
                </span>
              </div>

              <span className="text-xs text-slate-500">{brightness}%</span>
            </div>

            <input
              type="range"
              min="50"
              max="150"
              value={brightness}
              onChange={(event) => setBrightness(Number(event.target.value))}
              className="
                h-1.5
                w-full
                cursor-pointer
                accent-purple-500
              "
            />
          </div>

          {/* Contrast */}

          <div className="mt-3">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FiSun className="h-4 w-4 text-fuchsia-300" />

                <span className="text-xs font-semibold text-slate-300">
                  کنتراست
                </span>
              </div>

              <span className="text-xs text-slate-500">{contrast}%</span>
            </div>

            <input
              type="range"
              min="50"
              max="150"
              value={contrast}
              onChange={(event) => setContrast(Number(event.target.value))}
              className="
                h-1.5
                w-full
                cursor-pointer
                accent-fuchsia-500
              "
            />
          </div>

          {/* Crop Actions */}

          {cropMode && (
            <div
              className="
                mt-4
                flex
                gap-2
              "
            >
              <button
                type="button"
                onClick={handleCrop}
                className="
                  flex
                  flex-1
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-purple-600
                  px-3
                  py-2.5
                  text-xs
                  font-bold
                  text-white
                  transition
                  hover:bg-purple-500
                  sm:text-sm
                "
              >
                <FiCrop />
                اعمال برش
              </button>

              <button
                type="button"
                onClick={cancelCrop}
                className="
                  flex
                  flex-1
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  px-3
                  py-2.5
                  text-xs
                  font-semibold
                  text-slate-300
                  transition
                  hover:bg-white/[0.06]
                  sm:text-sm
                "
              >
                <FiX />
                لغو
              </button>
            </div>
          )}

          {/* Footer */}

          {!cropMode && (
            <div className="mt-4 flex gap-2 sm:gap-3">
              <button
                type="button"
                onClick={onClose}
                className="
                  flex-1
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  px-3
                  py-2.5
                  text-xs
                  font-semibold
                  text-slate-300
                  transition
                  hover:bg-white/[0.06]
                  sm:text-sm
                "
              >
                انصراف
              </button>

              <button
                type="button"
                onClick={saveImage}
                className="
                  flex
                  flex-1
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-purple-600
                  to-fuchsia-600
                  px-3
                  py-2.5
                  text-xs
                  font-bold
                  text-white
                  shadow-lg
                  shadow-purple-950/30
                  transition
                  hover:-translate-y-0.5
                  hover:shadow-purple-500/30
                  sm:text-sm
                "
              >
                <FiCheck />
                ذخیره تغییرات
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================================================= */
/* Crop Handle                                        */
/* ================================================= */

function CropHandle({ position, onPointerDown }) {
  const positionClasses = {
    "top-left": "-left-2 -top-2 cursor-nwse-resize",

    "top-right": "-right-2 -top-2 cursor-nesw-resize",

    "bottom-left": "-bottom-2 -left-2 cursor-nesw-resize",

    "bottom-right": "-bottom-2 -right-2 cursor-nwse-resize",
  };

  return (
    <div
      onPointerDown={(event) => onPointerDown(event, position)}
      className={`
        absolute
        z-20
        h-5
        w-5
        touch-none
        rounded-full
        border-2
        border-white
        bg-purple-600
        shadow-lg
        shadow-black/50
        ${positionClasses[position]}
      `}
    />
  );
}

/* ================================================= */
/* Tool Button                                        */
/* ================================================= */

function ToolButton({ icon, label, onClick, active = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex
        flex-col
        items-center
        justify-center
        gap-1.5
        rounded-xl
        border
        px-2
        py-2.5
        text-[10px]
        transition
        sm:gap-2
        sm:px-3
        sm:py-3
        sm:text-xs

        ${
          active
            ? "border-purple-400/40 bg-purple-500/20 text-purple-200"
            : "border-white/5 bg-white/[0.03] text-slate-400 hover:bg-purple-500/10 hover:text-purple-200"
        }
      `}
    >
      <span className="text-base sm:text-lg">{icon}</span>

      {label}
    </button>
  );
}

export default ImageEditor;
