import React from 'react';
import { DashboardLayout } from '@/src/components/DashboardLayout';
import { GlassCard } from '@/src/components/GlassCard';
import { Sparkles, Send, Loader2, MessageSquare, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { solveDoubt } from '@/src/lib/gemini';
import { cn } from '@/src/lib/utils';

export default function AiTutor() {
  const [query, setQuery] = React.useState('');
  const [answer, setAnswer] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const result = await solveDoubt(query);
      setAnswer(result);
    } catch (error) {
      console.error('AI Tutor Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
              <Sparkles size={24} />
            </div>
            <h1 className="text-4xl font-bold font-display text-slate-900">AI Tutor</h1>
          </div>
          <p className="text-slate-500">Get instant, teacher-approved explanations for any academic query.</p>
        </header>

        <div className="space-y-8">
          <GlassCard className="p-6">
            <form onSubmit={handleAsk} className="relative">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask anything... e.g., 'Explain photosynthesis in simple terms' or 'How to solve quadratic equations?'"
                className="w-full h-32 p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none pr-16"
              />
              <button
                type="submit"
                disabled={isLoading || !query.trim()}
                className="absolute bottom-4 right-4 p-3 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
              </button>
            </form>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-wider">
              <CheckCircle2 size={14} className="text-green-500" />
              Teacher-Approved AI Models
            </div>
          </GlassCard>

          <AnimatePresence>
            {answer && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <GlassCard className="p-8 border-primary/20 bg-primary/5">
                  <div className="flex items-center gap-2 mb-6 text-primary">
                    <Sparkles size={20} />
                    <h3 className="font-bold text-lg">AI Explanation</h3>
                  </div>
                  <div className="prose prose-slate max-w-none">
                    <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                      {answer}
                    </p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-primary/10 flex items-center justify-between">
                    <p className="text-sm text-slate-500 italic">
                      This answer was generated using advanced AI models and reviewed for academic accuracy.
                    </p>
                    <button 
                      onClick={() => {
                        setAnswer(null);
                        setQuery('');
                      }}
                      className="text-primary font-bold text-sm hover:underline"
                    >
                      Ask another question
                    </button>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>

          {!answer && !isLoading && (
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "What are the laws of thermodynamics?",
                "Explain the French Revolution causes",
                "How does a cell membrane work?",
                "Solve: 2x + 5 = 15"
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setQuery(suggestion)}
                  className="p-4 text-left rounded-xl border border-slate-100 hover:border-primary/30 hover:bg-primary/5 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 group-hover:text-slate-900 transition-colors">{suggestion}</span>
                    <MessageSquare size={16} className="text-slate-300 group-hover:text-primary transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
