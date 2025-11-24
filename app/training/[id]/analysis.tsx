"use client";
import { useEffect, useEffectEvent, useRef } from "react";
import { Gemini, MAX_AUDIO_LENGTH } from "@/lib/Ai";
import { LessonLog } from "@/types/types";
export default function EmotionAnalysisAndLogging({
  lessonInfo,
}: {
  lessonInfo: LessonLog | null;
}) {
  console.log(lessonInfo);
  const vidRef = useRef<HTMLVideoElement | null>(null);
  const audioBufferRef = useRef<Blob[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const startCamera = useEffectEvent(async () => {
    if (!vidRef.current) return;
    const videoStream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });
    const audioStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    mediaRecorderRef.current = new MediaRecorder(audioStream, {
      mimeType: "audio/webm",
    });

    mediaRecorderRef.current.ondataavailable = (e) =>
      audioBufferRef.current.push(e.data);

    mediaRecorderRef.current.onstop = async () => {
      // uncomment to debug
      // const blob = new Blob(audioBufferRef.current, { type: "audio/webm" });
      // saveBlob(blob, "last10s.webm"); // or send to Gemini
      audioBufferRef.current = [];
      mediaRecorderRef.current?.start(1000); // restart capturing
      setTimeout(
        () => mediaRecorderRef.current?.stop(),
        MAX_AUDIO_LENGTH * 1000,
      );
    };

    mediaRecorderRef.current.start(1000);
    setTimeout(() => mediaRecorderRef.current?.stop(), MAX_AUDIO_LENGTH * 1000);

    vidRef.current.srcObject = videoStream;
  });

  useEffect(() => {
    startCamera();
  });

  useEffect(() => {
    if (!vidRef.current) return;
    if (!lessonInfo) return;
    const canvas = document.createElement("canvas");
    canvas.width = vidRef.current!.videoWidth;
    canvas.height = vidRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(vidRef.current, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (imgBlob) => {
      const audioBlob = new Blob(audioBufferRef.current, {
        type: "audio/webm",
      });
      // saveBlob(audioBlob, "audio.webm");
      // saveBlob(imgBlob!, "image.png");
      const imgData = await blobToBase64(imgBlob!);

      const audioData = await blobToBase64(audioBlob);

      fetch("/api/log/response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          audio: {
            mimeType: audioBlob?.type || "audio/webm",
            data: audioData as string,
          },
          image: {
            mimeType: imgBlob?.type || "image/png",
            data: imgData as string,
          },
          answerTime: lessonInfo.answerTime,
          module_id: lessonInfo.module_id,
          lesson_id: lessonInfo.lesson_id,
          timestamp: new Date().toISOString(),
        }),
      })
        .then((res) => res.json())
        .then(console.log)
        .catch(console.error);
    }, "image/png");
  }, [lessonInfo]);

  return (
    <>
      <video className="hidden" ref={vidRef}></video>
    </>
  );
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result instanceof ArrayBuffer) return;
      const dataUrl = reader.result as string;
      const base64data = dataUrl.split(",")[1];
      resolve(base64data);
    };
    reader.readAsDataURL(blob);
  });
}

// function saveBlob(blob: Blob, filename: string) {
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = filename;
//   a.click();
//   URL.revokeObjectURL(url);
// }
