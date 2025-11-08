"use client";

import { Lesson, LessonLog } from "@/types/types";
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

  useEffect(() => {
    setLoadingTime();
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
