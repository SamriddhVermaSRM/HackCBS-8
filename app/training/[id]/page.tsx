"use client";
import { useEffect, useState, useRef } from "react";
const page = () => {
  const [cur, setCur] = useState(-1);
  const [finished, setFinished] = useState(false);
  const [module, setModule] = useState<null>(null);
  const resultRef = useRef(null);
  const lessons = [
    {
      speaker: "bacche",
      message:
        "Hey! I'm kind of nervous, but also excited to see how we did on the exam.",
    },
    {
      speaker: "teacher",
      message:
        "Alright everyone, here are your results. Hope you’re proud of the effort you put in.",
    },
    {
      speaker: "girl",
      message: "You scored 80%. How are you feeling about that?",
    },
    {
      speaker: "bacche",
      message:
        "Your best friend got 95%. They’re always topping the class. Honestly, it feels like we’ll never be that good. They just seem naturally smart, and we’re... not.",
    },
    {
      speaker: "user",
      message:
        "Hold on—before you decide your potential and worth on the basis of this result, it's important to ask yourself a question: Did you honestly prepare hard enough with focus for the exam?",
      choices: [
        { message: "Yes", next: 1 },
        { message: "No", next: 3 },
      ],
    },
    {
      speaker: "boy",
      message:
        "Then it's a good time to reach out to someone who can help you look at the situation more clearly and constructively. Talk to your teacher to understand where you might’ve gone wrong. Ask your friend to share their strategy and compare yours to improve. ",
    },
    {
      speaker: "girl",
      message:
        "One final thing that we must understand, that you may not always score well; We all have various flaws, things we are not at all good at, and it'd out duty to improve upon them, but, none of these define your worth, value, or ability to do something remarkable.",
      end: true,
    },
    {
      speaker: "boy",
      message:
        "So we have a clear answer, it's not lack of potential. It's  just that we didn't prepare well enough. We can do better next time.",
    },
    {
      speaker: "girl",
      message:
        "One final thing that we must understand, that you may not always score well; We all have various flaws, things we are not at all good at, and it'd out duty to improve upon them, but, none of these define your worth, value, or ability to do something remarkable.",
      end: true,
    },
  ];
  return (
    <Lessons
      question={lessons[cur]}
      setCur={setCur}
      cur={cur}
      setFinished={setFinished}
      emotion={resultRef}
    />
  );
};
export default page
function Lessons({ question, setCur, cur, setFinished, emotion }: any) {
  const [loadedAt, setLodedAt] = useState(Date.now());
  console.log(cur);

  const getTime = () => {
    const time = new Date(Date.now() - loadedAt);
    return {
      m: time.getMinutes() - 30,
      s: time.getSeconds(),
      ms: time.getMilliseconds(),
    };
  };

  const handleLogging = (ans: any) => {
    const timeRecord = getTime();
    console.log({ question, ans: null, timeRecord, emotion: emotion.current });
  };

  const handleClick = () => {
    handleLogging(null);
    if (!question.end) setCur(cur + 1);
    else setFinished(true);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const ans = data.get("ans");
    handleLogging(ans);
    if (ans === question.choices[0].message) {
      setCur(cur + question.choices[0].next);
    }
    if (ans === question.choices[1].message) {
      setCur(cur + question.choices[1].next);
    }
  };

  if (question.speaker === "user") {
    return (
      <>
        <form
          className="flex flex-col m-[30px] max-w-[350px] p-5 border"
          onSubmit={handleSubmit}
        >
          <h2>{question.message}</h2>
          <div className="grid grid-cols-2 place-items-center">
            <label htmlFor="a">
              <input
                type="radio"
                name="ans"
                id="a"
                className="question"
                value={question.choices[0].message}
              />
              {question.choices[0].message}
            </label>

            <label htmlFor="b">
              <input
                type="radio"
                name="ans"
                id="b"
                className="question"
                value={question.choices[1].message}
              />
              {question.choices[1].message}
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
      </>
    );
  } else if (question.speaker === "bacche") {
    return (
      <>
        <div className="bacche" onClick={handleClick}>
          <h2>{question.message}</h2>
          <img src="/bacche.png" alt="" style={{ height: "400px" }} />
        </div>
      </>
    );
  } else if (question.speaker === "teacher") {
    return (
      <>
        <div className="teacher" onClick={handleClick}>
          <h2>{question.message}</h2>
          <img src="/teacher.png" alt="" style={{ height: "400px" }} />
        </div>
      </>
    );
  } else if (question.speaker === "girl") {
    return (
      <>
        <div className="girl" onClick={handleClick}>
          <h2>{question.message}</h2>
          <img src="/girl.png" alt="" style={{ height: "400px" }} />
        </div>
      </>
    );
  } else if (question.speaker === "boy") {
    return (
      <>
        <div className="boy" onClick={handleClick}>
          <h2>{question.message}</h2>
          <img src="/boy.png" alt="" style={{ height: "400px" }} />
        </div>
      </>
    );
  }
}
