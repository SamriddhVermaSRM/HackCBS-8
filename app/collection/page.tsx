"use client";

import {
  FaceLandmarker,
  FaceLandmarkerResult,
  FilesetResolver,
} from "@mediapipe/tasks-vision";
import { useEffect, useRef } from "react";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let faceLandmarker: FaceLandmarker | null = null;
    let running = true;

    async function init() {
      const fileset = await FilesetResolver.forVisionTasks("/wasm");

      // create FaceLandmarker with options:
      faceLandmarker = await FaceLandmarker.createFromOptions(fileset, {
        baseOptions: {
          modelAssetPath: "/models/face_landmarker.task",
          delegate: "GPU",
        },
        runningMode: "VIDEO",
        numFaces: 1,
        outputFaceBlendshapes: true,
        minFaceDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      await startCamera();
      renderLoop();
    }

    async function startCamera() {
      if (!videoRef.current) return;
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 360 },
        audio: false,
      });
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
    }

    function drawResults(result: FaceLandmarkerResult) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      if (!canvas || !video) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // draw landmarks if available (simple points)
      const faces = result.faceLandmarks ?? null;
      if (faces && faces.length > 0) {
        const lm = faces[0];
        ctx.fillStyle = "rgba(255,0,0,0.8)";
        for (const p of lm) {
          const x = p.x * canvas.width;
          const y = p.y * canvas.height;
          ctx.beginPath();
          ctx.arc(x, y, 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // render loop: call detectForVideo and process results
    async function renderLoop() {
      if (!running || !faceLandmarker || !videoRef.current) return;

      // Ensure video metadata loaded
      if (videoRef.current.readyState < 2) {
        requestAnimationFrame(renderLoop);
        return;
      }

      try {
        const timeStart = performance.now();
        const result = faceLandmarker.detectForVideo(
          videoRef.current,
          timeStart,
        );

        // console.log("FaceLandmarker result:", result);

        drawResults(result);
      } catch (err) {
        console.error("faceLandmarker error", err);
      }
      // await new Promise((r) => setTimeout(r, 10)); // limit to ~10fps
      requestAnimationFrame(renderLoop);
    }

    init().catch((e) => {
      console.error(e);
    });

    return () => {
      running = false;
      // stop camera
      const stream = videoRef.current?.srcObject as MediaStream | undefined;
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
      // dispose faceLandmarker if present
      try {
        faceLandmarker?.close?.();
      } catch {}
    };
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div
        style={{
          position: "relative",
          display: "inline-block",
          width: 640,
          height: 360,
        }}
      >
        <video
          ref={videoRef}
          style={{
            height: "100%",
            width: "100%",
            borderRadius: 8,
            opacity: 0,
          }}
          playsInline
          // autoPlay
          muted
        />
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: "100%",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}
