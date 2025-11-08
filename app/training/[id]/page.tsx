"use client";

import { useEffect, useState } from "react";
import EmotionAnalysisAndLogging from "./analysis";
import { Lesson, LessonLog } from "@/types/types";
import Lessons from "./lessons";

export default function Training() {
  const [lessonInfo, setLessonInfo] = useState<LessonLog | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [currentLessonId, setCurrentLessonId] = useState<number>(0);

  useEffect(() => {
    fetch(
      `/api/module/${decodeURIComponent(window.location.pathname).split("/").pop()}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lesson_id: currentLessonId }),
      },
    ).then((res) => {
      res.json().then((data) => {
        console.log("Module Data:", data);
        setCurrentLesson(data as Lesson);
      });
    });
  }, [currentLessonId]);

  // console.log("Path:", path);

  return (
    <>
      <EmotionAnalysisAndLogging lessonInfo={lessonInfo} />

      {currentLesson && (
        <Lessons
          currentLesson={currentLesson}
          currentLessonId={currentLessonId}
          setCurrentLessonId={setCurrentLessonId}
          setLessonInfo={setLessonInfo}
        />
      )}
    </>
  );
}
