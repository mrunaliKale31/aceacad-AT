import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/src/components/DashboardLayout';
import { GlassCard } from '@/src/components/GlassCard';
import { Subject, Priority } from '@/src/types';
import { Upload, Send, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getAiSuggestion } from '@/src/lib/gemini';
import { cn } from '@/src/lib/utils';
import { useDoubts } from '@/src/context/DoubtContext';

export default function AskDoubt() {
  const navigate = useNavigate();
  const { addDoubt } = useDoubts();
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [subject, setSubject] = React.useState<Subject>('Mathematics');
  const [priority, setPriority] = React.useState<Priority>('Medium');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [aiSuggestion, setAiSuggestion] = React.useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = React.useState(false);

  const subjects: Subject[] = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 
    'Computer Science', 'English', 'History', 'Other'
  ];

  const handleAiHelp = async () => {
    if (!title || !description) return;
    setIsAiLoading(true);
    const suggestion = await getAiSuggestion(title, description, subject);
    setAiSuggestion(suggestion || null);
    setIsAiLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      addDoubt({
        title,
        description,
        subject,
        priority,
      });
      setIsSubmitting(false);
      navigate('/doubts');
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-bold font-display text-slate-900">Ask a New Doubt</h1>
          <p className="text-slate-500 mt-2">Provide details about your question and get help instantly.</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <GlassCard className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Title</label>
                  <input 
                    type="text" 
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Understanding the Chain Rule in Calculus"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Subject</label>
                    <select 
                      value={subject}
                      onChange={(e) => setSubject(e.target.value as Subject)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
                    >
                      {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Priority</label>
                    <div className="flex gap-2">
                      {(['Low', 'Medium', 'High'] as Priority[]).map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setPriority(p)}
                          className={cn(
                            "flex-1 py-3 rounded-xl font-bold text-sm transition-all border",
                            priority === p 
                              ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
                              : "bg-white text-slate-500 border-slate-200 hover:border-primary/50"
                          )}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Description</label>
                  <textarea 
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={6}
                    placeholder="Describe your doubt in detail. What have you tried so far?"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                  />
                </div>

                <div className="p-8 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-4 hover:border-primary/50 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <Upload size={24} />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-slate-700">Click to upload or drag and drop</p>
                    <p className="text-sm text-slate-500">PNG, JPG or PDF (max. 10MB)</p>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={handleAiHelp}
                    disabled={!title || !description || isAiLoading}
                    className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all disabled:opacity-50"
                  >
                    {isAiLoading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
                    AI Suggestion
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-[2] flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-xl font-bold shadow-xl shadow-primary/30 hover:shadow-primary/40 transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                    Submit Doubt
                  </button>
                </div>
              </form>
            </GlassCard>
          </div>

          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {aiSuggestion ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <GlassCard className="bg-slate-900 text-white border-none">
                    <div className="flex items-center gap-2 text-primary mb-4">
                      <Sparkles size={20} />
                      <span className="font-bold uppercase tracking-widest text-xs">AI Assistant</span>
                    </div>
                    <div className="prose prose-invert prose-sm max-w-none">
                      <p className="text-slate-300 leading-relaxed italic">
                        "{aiSuggestion}"
                      </p>
                    </div>
                    <div className="mt-6 pt-6 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-xs text-slate-500">Was this helpful?</span>
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400">👍</button>
                        <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400">👎</button>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ) : (
                <GlassCard className="bg-primary/5 border-primary/10">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                      <AlertCircle size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Quick Tip</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Be as specific as possible in your description. Uploading a clear image of the problem helps our tutors and AI provide better answers.
                      </p>
                    </div>
                  </div>
                </GlassCard>
              )}
            </AnimatePresence>

            <GlassCard>
              <h4 className="font-bold text-slate-900 mb-4">Live Preview</h4>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 min-h-[200px]">
                {title ? (
                  <div>
                    <h5 className="font-bold text-lg mb-2">{title}</h5>
                    <p className="text-slate-600 whitespace-pre-wrap">{description}</p>
                  </div>
                ) : (
                  <p className="text-slate-400 italic text-center mt-16">Your doubt preview will appear here...</p>
                )}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
