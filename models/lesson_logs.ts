import mongoose from "mongoose";

const lessonLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    answerTime: {
      type: Number,
      required: true,
    },
    module_id: {
      type: String,
      required: true,
    },
    lesson_id: {
      type: Number,
      required: true,
    },
    timestamp: {
      type: Date,
      required: true,
    },
    emotion: {
      audio_emotion: {
        type: String,
      },
      image_emotion: {
        type: String,
      },
      combined_emotion: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  },
);

const LessonLog =
  mongoose.models.LessonLog || mongoose.model("LessonLog", lessonLogSchema);

export default LessonLog;
