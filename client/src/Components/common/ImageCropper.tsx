import React, { useRef, useState, ChangeEvent, SyntheticEvent } from "react";
import ReactCrop, { PercentCrop, makeAspectCrop, centerCrop, convertToPixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import setCanvasPreview from "./setCanvasPreview";
import toast from 'react-hot-toast';
import { DotLoader } from "react-spinners";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 350;

interface ImageCropperProps {
  onChange: (croppedImage: any) => void;
}

function ImageCropper({ onChange }: ImageCropperProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [imgSrc, setImgSrc] = useState<string>("");
  const [crop, setCrop] = useState<PercentCrop | undefined>();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [cropping, setCropping] = useState<boolean>(false); // New state for cropping loader

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true); // Set loading state to true

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.addEventListener("load", (e) => {
        setLoading(false); // Set loading state to false once the image is loaded
        if (error) setError("");
        const { naturalWidth, naturalHeight } = e.currentTarget as HTMLImageElement;
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setError("Image must be at least 150 x 150 pixels");
          return setImgSrc("");
        }
      });

      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercentage = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercentage,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  const onCropImage = () => {
    if (!imgRef.current || !previewCanvasRef.current || !crop) return;

    setLoading(true); // Set loading state to true
    setCropping(true); // Set cropping state to true

    setCanvasPreview(
      imgRef.current,
      previewCanvasRef.current,
      convertToPixelCrop(
        crop,
        imgRef.current.width,
        imgRef.current.height
      )
    );

    previewCanvasRef.current.toBlob((blob) => {
      setLoading(false); // Set loading state to false
      if (!blob) {
        console.error("Blob is null");
        return;
      }
      const croppedImage = new File([blob], "cropped-image.png", { type: "image/png" });

      onChange(URL.createObjectURL(croppedImage));
      toast.success("Image cropped successfully!");
    }, "image/png");
  };


  return (
    <>
      <label className="block mb-3 w-fit">
        <span className="sr-only">Choose profile Photo</span>
        <input
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          className="block w-full text-sm text-slate-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-gray-700
        file:text-sky-300 hover:file:bg-gray-600"
        />
      </label>
      {error && <p className="text-red-500 text-xs">{error}</p>}
      {loading ? ( 
        <div className="flex justify-center items-center h-64">
          <DotLoader color="#6A64F1" loading={loading} size={30} />
        </div>
      ) : imgSrc && (
        <div className="flex flex-col items-center">
          <ReactCrop
            crop={crop || undefined}
            keepSelection
            aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSION}
            onChange={(_pixelCrop, percentCrop) => setCrop(percentCrop)}
          >
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Upload"
              style={{ maxHeight: "70vh" }}
              onLoad={onImageLoad}
            />
          </ReactCrop>

          <button
            onClick={onCropImage}
            className="text-white font-mono text-xs py-2 px-4 rounded-2xl mt-4 bg-blue-200 hover:bg-blue-400"
          >
            Crop Image
          </button>
        </div>
      )}
      {crop && !cropping && ( 
        <div className="flex justify-center items-center h-64">
          <DotLoader color="#6A64F1" loading={loading} size={30} />
        </div>
      )}
      {crop && (
        <>
          <canvas
            ref={previewCanvasRef}
            className="mt-4"
            style={{
              display:"none",
              border: "1px solid black",
              objectFit: "contain",
              width: 150,
              height: 150,
            }}
          />

          <img src={previewCanvasRef.current?.toDataURL()} alt="Cropped" style={{ maxWidth: "100%", marginTop: "10px" }} />
        </>
      )}
    </>
  );
}

export default ImageCropper;
