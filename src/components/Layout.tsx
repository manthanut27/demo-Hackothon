
import React, { ReactNode } from 'react';
import { BookOpen } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=2573&auto=format&fit=crop')] bg-cover bg-center bg-fixed">
      <div className="min-h-screen bg-black/60 backdrop-blur-sm p-4 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8 flex items-center gap-4 glass-panel p-6 text-white">
            <div className="p-3 bg-purple-600 rounded-lg shadow-lg shadow-purple-500/30">
              <BookOpen size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
                Smart Adaptive Study Planner
              </h1>
              <p className="text-gray-300">Optimize your study schedule instantly</p>
            </div>
          </header>
          <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};
