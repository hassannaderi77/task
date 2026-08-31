import { useEffect, useRef } from "react";
import "./GhostFibers.css";

function GhostFibers({
  color = "#7c3aed",
  amplitude = 1,
  distance = 0.5,
  enableMouseInteraction = true,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let time = 0;

    const mouse = {
      x: 0.5,
      y: 0.5,
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const handleMouseMove = (event) => {
      if (!enableMouseInteraction) return;

      const rect = canvas.getBoundingClientRect();

      mouse.x = (event.clientX - rect.left) / rect.width;
      mouse.y = (event.clientY - rect.top) / rect.height;
    };

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      ctx.clearRect(0, 0, width, height);

      const centerX = width * 0.5;
      const centerY = height * 0.5;

      const fiberCount = width < 640 ? 28 : 55;

      for (let i = 0; i < fiberCount; i++) {
        const progress = i / fiberCount;

        const baseX =
          progress * width +
          Math.sin(time * 0.001 + i * 0.35) *
            45 *
            amplitude;

        const mouseOffset =
          enableMouseInteraction
            ? (mouse.x - 0.5) *
              80 *
              distance *
              (1 - progress)
            : 0;

        const startX =
          baseX +
          mouseOffset;

        const startY =
          -height * 0.15 +
          progress * height * 0.2;

        ctx.beginPath();

        for (let j = 0; j <= 60; j++) {
          const p = j / 60;

          const x =
            startX +
            Math.sin(
              p * 7 +
                time * 0.0012 +
                i * 0.25
            ) *
              35 *
              amplitude +
            p * (centerX - startX) * 0.8;

          const y =
            startY +
            p * height * 1.35 +
            Math.sin(
              p * 5 +
                time * 0.001 +
                i
            ) *
              25 *
              amplitude;

          if (j === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        const opacity =
          0.08 +
          Math.sin(
            time * 0.0015 + i
          ) *
            0.025;

        ctx.strokeStyle = color;
        ctx.globalAlpha = Math.max(
          0.03,
          opacity
        );

        ctx.lineWidth =
          i % 7 === 0 ? 1.4 : 0.8;

        ctx.stroke();
      }

      ctx.globalAlpha = 1;

      time += 16;

      animationFrameId =
        requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener(
      "resize",
      resize
    );

    canvas.addEventListener(
      "mousemove",
      handleMouseMove
    );

    return () => {
      cancelAnimationFrame(
        animationFrameId
      );

      window.removeEventListener(
        "resize",
        resize
      );

      canvas.removeEventListener(
        "mousemove",
        handleMouseMove
      );
    };
  }, [
    color,
    amplitude,
    distance,
    enableMouseInteraction,
  ]);

  return (
    <div className="ghost-fibers">
      <canvas
        ref={canvasRef}
        className="ghost-fibers__canvas"
      />
    </div>
  );
}

export default GhostFibers;