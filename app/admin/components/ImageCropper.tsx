'use client';

import { useCallback, useMemo, useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';

interface ImageCropperProps {
  imageSrc: string;
  aspect?: number;
  suggestedSlug?: string;
  onCancel: () => void;
  onCropped: (file: File) => void;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function getCroppedFile(
  imageSrc: string,
  cropArea: Area,
  suggestedSlug?: string
): Promise<File> {
  const img = await loadImage(imageSrc);

  const targetSize = 512;
  const canvas = document.createElement('canvas');
  canvas.width = targetSize;
  canvas.height = targetSize;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas not supported');

  const sx = cropArea.x;
  const sy = cropArea.y;
  const sw = cropArea.width;
  const sh = cropArea.height;

  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, targetSize, targetSize);

  const blob: Blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error('Failed to create blob'))),
      'image/jpeg',
      0.9
    );
  });

  const safeSlug = (suggestedSlug || 'image')
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
  const fileName = `${safeSlug || 'image'}-${Date.now()}.jpg`;
  return new File([blob], fileName, { type: 'image/jpeg' });
}

export default function ImageCropper({
  imageSrc,
  aspect = 1,
  suggestedSlug,
  onCancel,
  onCropped,
}: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const minZoom = 1;
  const maxZoom = 4;

  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPx: Area) => {
    setCroppedAreaPixels(croppedAreaPx);
  }, []);

  const handleConfirm = useCallback(async () => {
    if (!croppedAreaPixels) return;
    const file = await getCroppedFile(imageSrc, croppedAreaPixels, suggestedSlug);
    onCropped(file);
  }, [croppedAreaPixels, imageSrc, onCropped, suggestedSlug]);

  const sliderStep = useMemo(() => 0.05, []);

  return (
    <div className="flex flex-col">
      <div className="relative w-full" style={{ height: '60vh' }}>
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          restrictPosition
          cropShape="rect"
          showGrid
        />
      </div>

      <div className="mt-4 flex items-center gap-4">
        <input
          aria-label="Zoom"
          type="range"
          min={minZoom}
          max={maxZoom}
          step={sliderStep}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Crop & Save
        </button>
      </div>
    </div>
  );
}


