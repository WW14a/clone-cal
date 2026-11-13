"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const CELL = 2;
const LEVELS = 5;

function paint(canvas, img) {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;

  if (!w || !h || !img.naturalWidth) return;

  canvas.width = w;
  canvas.height = h;

  const ctx = canvas.getContext("2d", {
    willReadFrequently: true,
  });

  if (!ctx) return;

  const s = Math.max(w / img.naturalWidth, h / img.naturalHeight);

  const dw = img.naturalWidth * s;
  const dh = img.naturalHeight * s;

  ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);

  const data = ctx.getImageData(0, 0, w, h);
  const px = data.data;
  const max = LEVELS - 1;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const bx = Math.floor(x / CELL) & 3;
      const by = Math.floor(y / CELL) & 3;
      const i = (y * w + x) * 4;

      for (let c = 0; c < 3; c++) {
        const t = (BAYER[(by * 4 + bx + c * 5) & 15] + 0.5) / 16;

        const v = (px[i + c] / 255) * max;

        px[i + c] = (Math.min(max, Math.floor(v + t)) / max) * 255;
      }
    }
  }

  ctx.putImageData(data, 0, 0);
}

export function PixelPhoto({ src, label, visible = true, className = "" }) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const canvas = ref.current;

    if (!canvas) return;

    const img = new Image();
    let loaded = false;

    const draw = () => loaded && paint(canvas, img);

    img.crossOrigin = "anonymous";
    img.onload = () => {
      loaded = true;
      draw();
    };

    img.src = src;

    const ro = new ResizeObserver(draw);
    ro.observe(canvas);

    return () => ro.disconnect();
  }, [src]);

  return (
    <canvas
      ref={ref}
      role="img"
      aria-label={label}
      className={cn(
        "block size-full bg-hp-paper [image-rendering:pixelated] dark:brightness-[0.88] absolute inset-0 transition-opacity duration-[600ms] ease-out motion-reduce:transition-none",
        className,
        !visible && "opacity-0",
      )}
    />
  );
}

export default PixelPhoto;
