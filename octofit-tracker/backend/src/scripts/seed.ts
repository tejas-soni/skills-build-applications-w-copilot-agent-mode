import mongoose from 'mongoose';
import { connectionString } from '../config/database.js';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const [maya, jordan, priya] = await User.create([
      {
        name: 'Maya Chen',
        email: 'maya.chen@example.com',
        avatar: 'MC',
        goals: ['Run a 10K', 'Build endurance'],
      },
      {
        name: 'Jordan Williams',
        email: 'jordan.williams@example.com',
        avatar: 'JW',
        goals: ['Increase strength', 'Train consistently'],
      },
      {
        name: 'Priya Shah',
        email: 'priya.shah@example.com',
        avatar: 'PS',
        goals: ['Improve mobility', 'Reduce stress'],
      },
    ]);

    await Team.create([
      {
        name: 'Summit Striders',
        description: 'A friendly team focused on steady mileage and outdoor adventures.',
        members: [maya._id, jordan._id],
        captain: maya._id,
      },
      {
        name: 'Core Collective',
        description: 'Strength and mobility sessions for balanced, sustainable progress.',
        members: [jordan._id, priya._id],
        captain: jordan._id,
      },
    ]);

    await Activity.create([
      {
        user: maya._id,
        type: 'Running',
        durationMinutes: 42,
        distanceKilometers: 6.2,
        calories: 480,
        completedAt: new Date('2026-08-30T07:30:00Z'),
      },
      {
        user: jordan._id,
        type: 'Strength',
        durationMinutes: 55,
        calories: 360,
        completedAt: new Date('2026-08-31T17:45:00Z'),
      },
      {
        user: priya._id,
        type: 'Yoga',
        durationMinutes: 35,
        calories: 180,
        completedAt: new Date('2026-09-01T06:45:00Z'),
      },
    ]);

    await Leaderboard.create([
      { user: maya._id, points: 1280, workoutsCompleted: 18, currentStreak: 6 },
      { user: jordan._id, points: 1145, workoutsCompleted: 16, currentStreak: 4 },
      { user: priya._id, points: 980, workoutsCompleted: 14, currentStreak: 8 },
    ]);

    await Workout.create([
      {
        title: 'Tempo Run Builder',
        category: 'Cardio',
        difficulty: 'Intermediate',
        durationMinutes: 35,
        exercises: ['Warm-up jog', 'Three tempo intervals', 'Cool-down walk'],
        recommendedFor: [maya._id],
      },
      {
        title: 'Full Body Foundation',
        category: 'Strength',
        difficulty: 'Beginner',
        durationMinutes: 30,
        exercises: ['Goblet squats', 'Incline push-ups', 'Dead bugs', 'Glute bridges'],
        recommendedFor: [jordan._id, priya._id],
      },
      {
        title: 'Desk Reset Flow',
        category: 'Mobility',
        difficulty: 'Beginner',
        durationMinutes: 20,
        exercises: ['Cat-cow', 'Hip flexor stretch', 'Thoracic rotations', 'Box breathing'],
        recommendedFor: [priya._id],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
