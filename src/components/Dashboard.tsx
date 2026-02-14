
import React, { useEffect } from 'react';
import { usePlanner } from '../context/PlannerContext';
import { Calendar, Clock, BarChart2, BookOpen, Trash2 } from 'lucide-react';
import { ScheduleItem } from '../types';

export const Dashboard: React.FC = () => {
  const { subjects, schedule, generatePlan, totalDailyHours, updateTotalHours, removeSubject } = usePlanner();

  // Auto-generate when subjects or hours change
  useEffect(() => {
    generatePlan();
  }, [subjects, totalDailyHours]);

  if (subjects.length === 0) {
    return (
      <div className="glass-panel p-8 col-span-1 lg:col-span-8 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
        <div className="bg-white/5 p-6 rounded-full mb-4">
          <BookOpen size={48} className="text-gray-600" />
        </div>
        <h3 className="text-xl font-medium text-gray-300">No subjects added yet</h3>
        <p className="text-gray-500 mt-2 max-w-md">
          Add your subjects, exam dates, and difficulty levels on the left to generate your personalized study plan.
        </p>
      </div>
    );
  }

  return (
    <div className="col-span-1 lg:col-span-8 space-y-6 animate-fade-in">
      {/* Controls & Summary */}
      <div className="glass-panel p-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
            Your Study Plan
          </h2>
          <p className="text-gray-400 text-sm">
            Optimized for {subjects.length} subjects
          </p>
        </div>
        
        <div className="flex items-center gap-4 bg-white/5 p-2 rounded-lg border border-white/10">
          <span className="text-sm text-gray-400 flex items-center gap-2">
            <Clock size={16} /> Daily Available Hours:
          </span>
          <input
            type="number"
            min="1"
            max="16"
            step="0.5"
            value={totalDailyHours}
            onChange={(e) => updateTotalHours(parseFloat(e.target.value) || 0)}
            className="w-16 bg-transparent border-b border-gray-600 text-center text-white focus:border-cyan-400 outline-none font-mono"
          />
        </div>
      </div>

      {/* Schedule List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         {schedule.map((item) => {
           const subject = subjects.find(s => s.id === item.subjectId);
           if (!subject) return null;
           
           return (
             <div key={item.subjectId} className="glass-panel p-5 border-l-4 border-l-purple-500 hover:translate-y-[-2px] transition-all">
               <div className="flex justify-between items-start mb-2">
                 <div>
                   <h3 className="text-lg font-bold text-white">{subject.name}</h3>
                   <div className="text-xs text-gray-400 flex gap-2 mt-1">
                      <span className="bg-white/10 px-2 py-0.5 rounded">Priority: {item.priorityScore.toFixed(0)}</span>
                      <span className="bg-white/10 px-2 py-0.5 rounded text-cyan-300">
                        {new Date(subject.examDate).toLocaleDateString()}
                      </span>
                   </div>
                 </div>
                 <button 
                  onClick={() => removeSubject(subject.id)}
                  className="text-gray-600 hover:text-red-400 transition-colors"
                  title="Remove Subject"
                 >
                   <Trash2 size={16} />
                 </button>
               </div>

               <div className="mt-4">
                 <div className="flex justify-between text-sm mb-1">
                   <span className="text-gray-400">Allocated Time</span>
                   <span className="text-purple-300 font-bold">{item.allocatedHours} hours</span>
                 </div>
                 <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                   <div 
                     className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
                     style={{ width: `${(item.allocatedHours / totalDailyHours) * 100}%` }}
                   />
                 </div>
               </div>
             </div>
           );
         })}
      </div>

      {/* Visual Stats */}
       <div className="glass-panel p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BarChart2 className="text-cyan-400" /> Time Distribution
        </h3>
        <div className="flex h-4 bg-gray-800 rounded-full overflow-hidden">
          {schedule.map((item, idx) => (
             <div
               key={item.subjectId}
               className={`h-full ${['bg-purple-500', 'bg-cyan-500', 'bg-blue-500', 'bg-pink-500', 'bg-indigo-500'][idx % 5]}`}
               style={{ width: `${(item.allocatedHours / totalDailyHours) * 100}%` }}
               title={`${subjects.find(s => s.id === item.subjectId)?.name}: ${item.allocatedHours}h`}
             />
          ))}
        </div>
        <div className="flex flex-wrap gap-4 mt-4 justify-center">
            {schedule.map((item, idx) => (
              <div key={item.subjectId} className="flex items-center gap-2 text-xs text-gray-400">
                 <div className={`w-3 h-3 rounded-full ${['bg-purple-500', 'bg-cyan-500', 'bg-blue-500', 'bg-pink-500', 'bg-indigo-500'][idx % 5]}`} />
                 {subjects.find(s => s.id === item.subjectId)?.name} ({Math.round((item.allocatedHours / totalDailyHours) * 100)}%)
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
