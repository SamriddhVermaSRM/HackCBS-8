"use client";
import { useEffect, useEffectEvent, useRef } from "react";
import { Gemini, MAX_AUDIO_LENGTH } from "../Ai";

export default function Home() {
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

          canvas.toBlob(async (imgBlob) => {
            const audioBlob = new Blob(audioBufferRef.current, {
              type: "audio/webm",
            });
            saveBlob(audioBlob, "audio.webm");
            saveBlob(imgBlob!, "image.png");
            const imgData = await blobToBase64(imgBlob!);

            const audioData = await blobToBase64(audioBlob);

            Gemini.models
              .generateContent({
                model: "gemini-2.5-pro",
                contents: [
                  {
                    inlineData: {
                      mimeType: audioBlob?.type || "audio/webm",
                      data: audioData as string,
                    },
                  },
                  {
                    inlineData: {
                      mimeType: imgBlob?.type || "image/png",
                      data: imgData as string,
                    },
                  },
                  {
                    text: `
                    PROMT:
                    Analyze the emotion in this 10-second audio clip and the image which was collected when the user was giving a reponse on a emotion intelligence test.

                    CRITICAL INSTRUCTIONS:
                    - First, analyze the audio clip to determine the speaker's emotional state.
                    - Next, examine the image to identify facial expressions and visual cues that indicate emotion.
                    - Finally, combine insights from both the audio and image analyses to provide a suitable response in the provided format.

                    RESPONSE FORMAT:
                    {
                      "audio_emotion": "<detected emotion from audio>",
                      "image_emotion": "<detected emotion from image>",
                      "combined_emotion": "<overall detected emotion combining both audio and image>"
                    }
                    Provide the response strictly in the specified JSON format without any additional text or explanation.
                    `,
                  },
                ],
              })
              .then((res) => {
                console.log(res);
              });
          }, "image/png");
        }}
      >
        ismile pls
      </button>
    </main>
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

function saveBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
