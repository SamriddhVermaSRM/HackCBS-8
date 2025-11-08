import { Gemini } from "@/lib/Ai";
import connectDB from "@/lib/mongodb";
import LessonLog from "@/models/lesson_logs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const data = await req.json();
    const jwtToken = req.cookies.get("jwt");
    console.log("JWT Token:", jwtToken);
    const { userId } = jwt.verify(
      jwtToken?.value || "",
      process.env.JWT_SECRET || "your-secret-key",
    );
    console.log("User ID from JWT:", userId);
    // console.log("Log data received:", {
    //   data,
    // });
    data.userId = userId;

    Gemini.models
      .generateContent({
        model: "gemini-2.5-pro",
        contents: [
          {
            inlineData: data.audio,
          },
          {
            inlineData: data.image,
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
      .then((emotion) => {
        LessonLog.create({
          ...data,
          user: userId,
          emotion: JSON.parse(
            emotion.text?.replace("```json", "").replace("```", ""),
          ),
        });
      })
      .catch((err) => {
        console.error("Gemini API error:", err);
      });

    return new Response(
      JSON.stringify({ message: "Log data received successfully" }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Log error:", error);
  }
}
