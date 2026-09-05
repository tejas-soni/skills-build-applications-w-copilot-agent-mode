import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, enum: ['Strength', 'Cardio', 'Mobility'], required: true },
    difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    exercises: [{ type: String, required: true }],
    recommendedFor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

export const Workout = mongoose.model('Workout', workoutSchema);