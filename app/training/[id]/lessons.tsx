"use client";

import { Lesson, LessonLog } from "@/types/types";
import axios from "axios";
import {
  Dispatch,
  FormEvent,
  useEffect,
  useEffectEvent,
  useState,
} from "react";

function Lessons({
  currentLesson,
  currentLessonId,
  setCurrentLessonId,
  setLessonInfo,
}: {
  currentLesson: Lesson;
  currentLessonId: number;
  setCurrentLessonId: Dispatch<React.SetStateAction<number>>;
  setLessonInfo: Dispatch<React.SetStateAction<LessonLog | null>>;
}) {
  const [loadedAt, setLodedAt] = useState<number | null>(null);
  const setLoadingTime = useEffectEvent(() => {
    setLodedAt(Date.now());
  });
  const [url, setUrl] = useState<string | undefined>(
    "https://murf.ai/user-upload/one-day-temp/42ab325e-b8ba-4283-8b70-5f9eba231fd8.wav?response-cache-control=max-age%3D604801&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20251011T000000Z&X-Amz-SignedHeaders=host&X-Amz-Expires=259200&X-Amz-Credential=AKIA27M5532DYKBCJICE%2F20251011%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Signature=0c2da161912f9a2612de95d77bbd5556d103569ebfc61c6b1d4056fa108e77b5"
  );
const getVoice = async () => {
    console.log("voice call");

    setIsVoiceLoading(true);
    try {
      const response = await fetch("https://api.murf.ai/v1/speech/generate", {
        method: "POST",
        headers: {
          "api-key": `${process.env.NEXT_PUBLIC_MURF_API}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: `${currentLesson.message}`,
          voiceId: "en-US-natalie",
          pronunciationDictionary: {
            "2010": {
              pronunciation: "two thousand and ten",
              type: "SAY_AS",
            },
            live: {
              pronunciation: "laɪv",
              type: "IPA",
            },
          },
        }),
      });
      const body = await response.json();
      console.log(body.audioFile)
      if (body.audioFile) {
        setUrl(body.audioFile);
      }
    } catch (error) {
      console.error("Error generating voice:", error);
    } finally {
      setIsVoiceLoading(false);
    }
  };

  useEffect(() => {
    setLoadingTime();
    // fechAudio()
  }, []);

  const handleClick = () => {
    if (!currentLesson.end) setCurrentLessonId(currentLessonId + 1);
    const info = {
      answerTime: Date.now() - loadedAt!,
      module_id: "module_1",
      lesson_id: currentLessonId,
      timestamp: new Date().toISOString(),
    };
    setLessonInfo(info);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const ans = data.get("ans");
    if (ans === currentLesson.choices[0].message) {
      setCurrentLessonId((prev) => prev + currentLesson.choices[0].next);
    }
    if (ans === currentLesson.choices[1].message) {
      setCurrentLessonId((prev) => prev + currentLesson.choices[1].next);
    }
    const info = {
      answerTime: Date.now() - loadedAt!,
      module_id: "module_1",
      lesson_id: currentLessonId,
      timestamp: new Date().toISOString(),
    };
    setLessonInfo(info);
  };

  if (currentLesson.speaker === "user") {
    return (
      <>
        <form
          className="flex flex-col m-[30px] max-w-[350px] p-5 border"
          onSubmit={handleSubmit}
        >
          <h2>{currentLesson.message}</h2>
          <div className="grid grid-cols-2 place-items-center">
            <label htmlFor="a">
              <input
                type="radio"
                name="ans"
                id="a"
                className="question"
                value={currentLesson.choices[0].message}
              />
              {currentLesson.choices[0].message}
            </label>

            <label htmlFor="b">
              <input
                type="radio"
                name="ans"
                id="b"
                className="question"
                value={currentLesson.choices[1].message}
              />
              {currentLesson.choices[1].message}
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
      </>
    );
  } else if (currentLesson.speaker === "bacche") {
    return (
      <>
        <div className="bacche" onClick={handleClick}>
          <h2>{currentLesson.message}</h2>
          <img src="/bacche.png" alt="" style={{ height: "400px" }} />
        </div>
      </>
    );
  } else if (currentLesson.speaker === "teacher") {
    return (
      <>
        <div className="teacher" onClick={handleClick}>
          <h2>{currentLesson.message}</h2>
          <img src="/teacher.png" alt="" style={{ height: "400px" }} />
        </div>
      </>
    );
  } else if (currentLesson.speaker === "girl") {
    return (
      <>
        <div className="girl" onClick={handleClick}>
          <h2>{currentLesson.message}</h2>
          <img src="/girl.png" alt="" style={{ height: "400px" }} />
        </div>
      </>
    );
  } else if (currentLesson.speaker === "boy") {
    return (
      <>
        <div className="boy" onClick={handleClick}>
          <h2>{currentLesson.message}</h2>
          <img src="/boy.png" alt="" style={{ height: "400px" }} />
        </div>
      </>
    );
  }
  return <></>;
}

export default Lessons;
