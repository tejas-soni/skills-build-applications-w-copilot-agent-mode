import mongoose from 'mongoose';

const leaderboardSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    points: { type: Number, required: true, min: 0 },
    workoutsCompleted: { type: Number, required: true, min: 0 },
    currentStreak: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
);

export const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);