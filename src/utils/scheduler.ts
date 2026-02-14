
// utils/scheduler.ts
import { Subject, ScheduleItem } from '../types';
import { calculatePriorityScore } from './priority';

export const generateSchedule = (
  subjects: Subject[],
  totalDailyHours: number
): ScheduleItem[] => {
  if (subjects.length === 0) return [];

  // 1. Calculate scores
  const subjectsWithScores = subjects.map(subject => ({
    ...subject,
    score: calculatePriorityScore(subject)
  }));

  // 2. Sort by score (highest first)
  subjectsWithScores.sort((a, b) => b.score - a.score);

  // 3. Calculate total score sum
  const totalScore = subjectsWithScores.reduce((sum, s) => sum + s.score, 0);

  // 4. Distribute hours
  let remainingHours = totalDailyHours;
  const schedule: ScheduleItem[] = subjectsWithScores.map((subject, index) => {
    // Proportional allocation
    let rawHours = (subject.score / totalScore) * totalDailyHours;
    
    // Ensure min hours (0.5h) if possible, but respect total limit
    // For the last item, simply take the remaining to avoid rounding errors
    let allocatedHours = 0;
    
    if (index === subjectsWithScores.length - 1) {
      allocatedHours = Math.max(0, remainingHours);
    } else {
      // Round to nearest 0.5
      allocatedHours = Math.round(rawHours * 2) / 2;
      // Clamp to min/max
      allocatedHours = Math.max(0.5, allocatedHours);
      // Don't exceed remaining
      if (allocatedHours > remainingHours) allocatedHours = remainingHours;
    }

    remainingHours -= allocatedHours;

    return {
      subjectId: subject.id,
      allocatedHours,
      priorityScore: subject.score
    };
  });

  return schedule;
};
