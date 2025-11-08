"use client";
import { useEffect, useEffectEvent, useRef } from "react";
import { Gemini } from "../Ai";

export default function Home() {
  const vidRef = useRef<HTMLVideoElement | null>(null);

  const startCamera = useEffectEvent(async () => {
    if (!vidRef.current) return;
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });
    vidRef.current.srcObject = stream;
    await vidRef.current.play();
  });

  useEffect(() => {
    startCamera();
  });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <video ref={vidRef}></video>
      <button
        onClick={() => {
          if (!vidRef.current) return;
          const canvas = document.createElement("canvas");
          canvas.width = vidRef.current!.videoWidth;
          canvas.height = vidRef.current.videoHeight;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(vidRef.current, 0, 0, canvas.width, canvas.height);

          canvas.toBlob(async (blob) => {
            // Convert blob to base64 or other format
            const reader = new FileReader();
            reader.onloadend = async () => {
              if (reader.result instanceof ArrayBuffer) return;
              const dataUrl = reader.result as string;
              const base64data = dataUrl.split(",")[1];
              Gemini.models
                .generateContent({
                  model: "gemini-2.5-flash",
                  contents: [
                    {
                      inlineData: {
                        mimeType: blob?.type || "image/png",
                        data: base64data,
                      },
                    },
                    {
                      text: "describe the emotion on the face of the person in the photo in a single word.",
                    },
                  ],
                })
                .then((res) => {
                  console.log(res);
                });
            };
            reader.readAsDataURL(blob!);
          }, "image/png");
        }}
      >
        ismile pls
      </button>
    </main>
  );
}
