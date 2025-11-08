export interface Choice {
  message: string;
  next: number;
}

export interface Lesson {
  speaker: string;
  message: string;
  choices: Choice[];
  end?: boolean;
}

export interface Module {
  name: string;
  description: string;
  lessons: Lesson[];
}

export type Modules = {
  [moduleId: string]: Module;
};

export type LessonLog = {
  answerTime: number;
  module_id: string;
  lesson_id: number;
  timestamp: string;
  emotion?: EmotionResponse;
};
// Example usage:
// const trainingData: Modules = { ... your JSON data ... };

export type EmotionResponse = {
  audio_emotion: string;
  image_emotion: string;
  combined_emotion: string;
};
