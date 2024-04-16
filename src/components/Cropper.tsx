/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef } from "react";

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
import { canvasPreview } from "../util/crop";
import { useDebounceEffect } from "../hooks/useDebounce";

import "react-image-crop/dist/ReactCrop.css";
import { Button, Upload } from "antd";

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

interface Props {
  setBackground: React.Dispatch<
    React.SetStateAction<
      | {
          crop: PixelCrop;
          src: string;
        }
      | undefined
    >
  >;
}

export default function Cropper({ setBackground }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const hiddenAnchorRef = useRef<HTMLAnchorElement>(null);
  const blobUrlRef = useRef("");
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>(16 / 9);

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  async function onDownloadCropClick() {
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error("Crop canvas does not exist");
    }

    // This will size relative to the uploaded image
    // size. If you want to size according to what they
    // are looking at on screen, remove scaleX + scaleY
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY
    );
    const ctx = offscreen.getContext("2d");
    if (!ctx) {
      throw new Error("No 2d context");
    }

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height
    );
    // You might want { type: "image/jpeg", quality: <0 to 1> } to
    // reduce image size
    const blob = await offscreen.convertToBlob({
      type: "image/png",
    });

    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
    }
    blobUrlRef.current = URL.createObjectURL(blob);

    if (hiddenAnchorRef.current) {
      hiddenAnchorRef.current.href = blobUrlRef.current;
      hiddenAnchorRef.current.click();
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        );
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  //   function handleToggleAspectClick() {
  //     if (aspect) {
  //       setAspect(undefined);
  //     } else {
  //       setAspect(16 / 9);

  //       if (imgRef.current) {
  //         const { width, height } = imgRef.current;
  //         const newCrop = centerAspectCrop(width, height, 16 / 9);
  //         setCrop(newCrop);
  //         // Updates the preview
  //         setCompletedCrop(convertToPixelCrop(newCrop, width, height));
  //       }
  //     }
  //   }

  return (
    <div className="App">
      <div className="filebox flex items-center justify-between w-full">
        <div className="file-upload w-full flex justify-between items-center mb-2">
          <label
            htmlFor="file-upload"
            className="cursor-pointer border-[1px] font-bold px-4 py-[0.3rem] rounded-md hover:bg-neutral-100 hover:dark:bg-neutral-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
              />
            </svg>
          </label>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={onSelectFile}
          />
          {!!imgSrc && (
            <Button
              danger
              onClick={() => {
                setImgSrc("");
                setBackground(undefined);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </Button>
          )}
        </div>
        {/* <input
          className=" bg-neutral-100 rounded-md"
          type="file"
          id="file"
          accept="image/*"
          onChange={(e) => {
            onSelectFile(e);
          }}
        /> */}
      </div>
      {/* <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          onSelectFile(e);
        }}
      /> */}

      {/* <Modal
        open={isOpen}
        onCancel={() => {
          setImgSrc("");
          setIsOpen(false);
        }}
        title="배경이미지 수정"
        centered
        onOk={() => {
          setCompletedCrop(completedCrop);
          setIsOpen(false);
        }}
      > */}
      {!!imgSrc && (
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => {
            // setCompletedCrop(c);
            setBackground({ crop: c, src: imgSrc });
          }}
          aspect={aspect}
          // minWidth={400}
          //   minHeight={100}
          // circularCrop
        >
          <img
            ref={imgRef}
            alt="Crop me"
            src={imgSrc}
            style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
            onLoad={onImageLoad}
          />
        </ReactCrop>
      )}
      {!!completedCrop && (
        <>
          <div>
            <canvas
              ref={previewCanvasRef}
              style={{
                display: "none",
                border: "1px solid black",
                objectFit: "contain",
                width: completedCrop.width,
                height: completedCrop.height,
              }}
            />
          </div>
          <div>
            <button
              onClick={onDownloadCropClick}
              style={{ position: "relative" }}
            >
              Download Crop
            </button>
            <div style={{ fontSize: 12, color: "#666" }}>
              If you get a security error when downloading try opening the
              Preview in a new tab (icon near top right).
            </div>
            <a
              href="#hidden"
              ref={hiddenAnchorRef}
              download
              style={{
                position: "absolute",
                top: "0",
                visibility: "hidden",
              }}
            >
              Hidden download
            </a>
          </div>
        </>
      )}
      <div className="Crop-Controls">
        {/* <div>
          <label htmlFor="scale-input">Scale: </label>
          <input
            id="scale-input"
            type="number"
            step="0.1"
            value={scale}
            disabled={!imgSrc}
            onChange={(e) => setScale(Number(e.target.value))}
          />
        </div> */}
        {/* <div>
          <label htmlFor="rotate-input">Rotate: </label>
          <input
            id="rotate-input"
            type="number"
            value={rotate}
            disabled={!imgSrc}
            onChange={(e) =>
              setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
            }
          />
        </div> */}
        {/* <div>
            <button onClick={handleToggleAspectClick}>
              Toggle aspect {aspect ? "off" : "on"}
            </button>
          </div> */}
      </div>
      {/* </Modal> */}
    </div>
  );
}
