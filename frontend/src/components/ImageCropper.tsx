import React, { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../utils/getCroppedImg";

type Props = {
  src: string; // object URL or data URL
  aspect?: number;
  onCancel: () => void;
  onComplete: (blob: Blob) => void;
};

export default function ImageCropper({ src, aspect = 1, onCancel, onComplete }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const onCropComplete = useCallback((_: any, croppedPixels: any) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleDone = useCallback(async () => {
    try {
      if (!croppedAreaPixels) return;
      const blob = await getCroppedImg(src, croppedAreaPixels);
      onComplete(blob);
    } catch (err) {
      console.error("Crop failed:", err);
    }
  }, [croppedAreaPixels, src, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-3xl bg-white rounded shadow-lg p-4">
        <div style={{ position: "relative", width: "100%", height: 400, background: "#333" }}>
          <Cropper
            image={src}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        <div className="mt-4 flex items-center gap-3">
          <input
            type="range"
            min={1}
            max={3}
            step={0.01}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
          />
          <button onClick={handleDone} className="px-4 py-2 bg-indigo-600 text-white rounded">
            Crop
          </button>
          <button onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}