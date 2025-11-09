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
            - for the combined insights, lets have a vallue between 0 to 10.
            Here '5' will reflect neutral emotions, 6-8 will reflect level of happiness like from soft smile to wide smile , and above 8 will show extreme ecstasy ,
            similarly 6-8 will show minute activeness , i.e could be happiness or could be anger, and above 8 will be too much anger, consider these values as a representation of emotions where 5-8 is normal level of activity for emotions and above 8 is gradual hyperactivity.

            similarly if we go below 5, 5 to 3 is general level of disinterest, but beloe 3 is gradual under activity or isolation refelection.

            RESPONSE FORMAT:
            {
            "audio_emotion": "calm and slightly positive tone indicating mild happiness",
            "image_emotion": "gentle smile with relaxed eyes suggesting contentment",
            "combined_emotion": 6.7
            }
            Provide the response strictly in the specified JSON format without any additional text or explanation or markdown.
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
