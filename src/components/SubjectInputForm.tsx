
import React, { useState } from 'react';
import { usePlanner } from '../context/PlannerContext';
import { Plus, Book, Calendar, Clock, AlertCircle } from 'lucide-react';

export const SubjectInputForm: React.FC = () => {
  const { addSubject, subjects } = usePlanner();
  
  const [name, setName] = useState('');
  const [difficulty, setDifficulty] = useState(3);
  const [examDate, setExamDate] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!name.trim()) {
      setError('Subject name is required');
      return;
    }
    if (!examDate) {
      setError('Exam date is required');
      return;
    }
    if (new Date(examDate) < new Date()) {
      setError('Exam date must be in the future');
      return;
    }

    addSubject({
      name,
      difficulty,
      examDate,
      minDailyHours: 0.5
    });

    // Reset
    setName('');
    setDifficulty(3);
    setExamDate('');
  };

  return (
    <div className="glass-panel p-6 col-span-1 lg:col-span-4 h-fit animate-fade-in">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <Plus className="text-cyan-400" /> Add Subject
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1 flex items-center gap-2">
            <Book size={16} /> Subject Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
            placeholder="e.g. Mathematics"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1 flex items-center gap-2">
            <AlertCircle size={16} /> Difficulty (1-5)
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setDifficulty(level)}
                className={`flex-1 py-2 rounded-md transition-all ${
                  difficulty === level 
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' 
                    : 'bg-white/5 hover:bg-white/10 text-gray-400'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1 flex items-center gap-2">
            <Calendar size={16} /> Exam Date
          </label>
          <input
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            className="input-field"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        {error && (
          <div className="text-red-400 text-sm bg-red-400/10 p-2 rounded border border-red-400/20">
            {error}
          </div>
        )}

        <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
          <Plus size={18} /> Add Subject
        </button>
      </form>

      {/* Added List Preview */}
      <div className="mt-8">
        <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">
          Added Subjects ({subjects.length})
        </h3>
        <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar">
          {subjects.map((sub) => (
            <div key={sub.id} className="bg-white/5 p-3 rounded-lg border border-white/10 flex justify-between items-center">
              <div>
                <div className="font-medium text-white">{sub.name}</div>
                <div className="text-xs text-gray-400 flex gap-3 mt-1">
                  <span className={`px-2 py-0.5 rounded ${
                    sub.difficulty > 3 ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'
                  }`}>
                    Lvl {sub.difficulty}
                  </span>
                  <span>{new Date(sub.examDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
          {subjects.length === 0 && (
            <div className="text-center text-gray-500 py-4 italic">No subjects added yet</div>
          )}
        </div>
      </div>
    </div>
  );
};
