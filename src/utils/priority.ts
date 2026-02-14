
// utils/priority.ts
import { Subject } from '../types';
import { differenceInDays, parseISO } from 'date-fns';

export const calculatePriorityScore = (subject: Subject): number => {
  const today = new Date();
  const examDate = parseISO(subject.examDate);
  
  // Calculate days left, ensuring at least 1 day to avoid division by zero
  const daysLeft = Math.max(1, differenceInDays(examDate, today));
  
  // Weights (can be tuned)
  // Difficulty weight: 1-5 -> 2-10
  // Urgency weight: 10 / daysLeft
  
  const difficultyWeight = subject.difficulty * 2;
  const urgencyWeight = 100 / daysLeft; // Increased urgency impact
  
  return difficultyWeight + urgencyWeight;
};
