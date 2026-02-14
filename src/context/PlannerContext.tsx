
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Subject, ScheduleItem, StudyPlan } from '../types';
import { generateSchedule } from '../utils/scheduler';
import { v4 as uuidv4 } from 'uuid'; // Need to install uuid if not present, or use simpler ID

// Simple ID generator if uuid is overkill for MVP, but let's just use Date.now() + random for simplicity
const generateId = () => Math.random().toString(36).substr(2, 9);

interface PlannerContextType {
  subjects: Subject[];
  schedule: ScheduleItem[];
  totalDailyHours: number;
  addSubject: (subject: Omit<Subject, 'id'>) => void;
  removeSubject: (id: string) => void;
  updateTotalHours: (hours: number) => void;
  generatePlan: () => void;
}

const PlannerContext = createContext<PlannerContextType | undefined>(undefined);

export const PlannerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [subjects, setSubjects] = useState<Subject[]>(() => {
    const saved = localStorage.getItem('sasp-subjects');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [totalDailyHours, setTotalDailyHours] = useState<number>(() => {
    const saved = localStorage.getItem('sasp-hours');
    return saved ? JSON.parse(saved) : 4;
  });

  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);

  useEffect(() => {
    localStorage.setItem('sasp-subjects', JSON.stringify(subjects));
    localStorage.setItem('sasp-hours', JSON.stringify(totalDailyHours));
  }, [subjects, totalDailyHours]);

  const addSubject = (subject: Omit<Subject, 'id'>) => {
    const newSubject = { ...subject, id: generateId() };
    setSubjects(prev => [...prev, newSubject]);
  };

  const removeSubject = (id: string) => {
    setSubjects(prev => prev.filter(s => s.id !== id));
  };

  const updateTotalHours = (hours: number) => {
    setTotalDailyHours(hours);
  };

  const generatePlan = () => {
    const newSchedule = generateSchedule(subjects, totalDailyHours);
    setSchedule(newSchedule);
  };

  return (
    <PlannerContext.Provider value={{
      subjects,
      schedule,
      totalDailyHours,
      addSubject,
      removeSubject,
      updateTotalHours,
      generatePlan
    }}>
      {children}
    </PlannerContext.Provider>
  );
};

export const usePlanner = () => {
  const context = useContext(PlannerContext);
  if (!context) {
    throw new Error('usePlanner must be used within a PlannerProvider');
  }
  return context;
};
