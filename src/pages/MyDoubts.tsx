import React from 'react';
import { DashboardLayout } from '@/src/components/DashboardLayout';
import { GlassCard } from '@/src/components/GlassCard';
import { Doubt, Subject } from '@/src/types';
import { Search, Filter, ChevronRight, CheckCircle2, Clock, AlertCircle, X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { useDoubts } from '@/src/context/DoubtContext';

const DoubtCard = ({ doubt, onClick }: { doubt: Doubt, onClick: () => void, key?: string | number }) => (
  <GlassCard 
    className="flex flex-col h-full group cursor-pointer"
    onClick={onClick}
  >
    <div className="flex justify-between items-start mb-4">
      <span className={cn(
        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
        doubt.status === 'Answered' ? "bg-green-100 text-green-600" : 
        doubt.status === 'Pending' ? "bg-yellow-100 text-yellow-600" : "bg-red-100 text-red-600"
      )}>
        {doubt.status}
      </span>
      <span className="text-xs text-slate-400">{doubt.createdAt}</span>
    </div>
    <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">{doubt.title}</h3>
    <p className="text-slate-500 text-sm mb-6 line-clamp-3">{doubt.description}</p>
    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
      <span className="text-xs font-bold text-slate-400 uppercase">{doubt.subject}</span>
      <div className="flex items-center gap-1 text-primary font-bold text-sm">
        View Details <ChevronRight size={16} />
      </div>
    </div>
  </GlassCard>
);

export default function MyDoubts() {
  const { doubts } = useDoubts();
  const [search, setSearch] = React.useState('');
  const [filter, setFilter] = React.useState<Subject | 'All'>('All');
  const [selectedDoubt, setSelectedDoubt] = React.useState<Doubt | null>(null);

  const filteredDoubts = doubts.filter(d => 
    (filter === 'All' || d.subject === filter) &&
    (d.title.toLowerCase().includes(search.toLowerCase()) || d.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold font-display text-slate-900">My Doubts</h1>
            <p className="text-slate-500 mt-2">Manage and review all your submitted questions.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search doubts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none w-full md:w-64 bg-white"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <select 
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="pl-11 pr-8 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white font-medium appearance-none"
              >
                <option value="All">All Subjects</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Biology">Biology</option>
                <option value="Computer Science">CS</option>
              </select>
            </div>
          </div>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoubts.map((doubt) => (
            <DoubtCard key={doubt.id} doubt={doubt} onClick={() => setSelectedDoubt(doubt)} />
          ))}
        </div>

        {filteredDoubts.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-slate-100 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">No doubts found</h3>
            <p className="text-slate-500">Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        )}

        {/* Detail Modal */}
        <AnimatePresence>
          {selectedDoubt && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedDoubt(null)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-3xl bg-white rounded-[32px] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
              >
                <div className="p-8 border-b border-slate-100 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center",
                      selectedDoubt.status === 'Answered' ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"
                    )}>
                      {selectedDoubt.status === 'Answered' ? <CheckCircle2 size={24} /> : <Clock size={24} />}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold font-display text-slate-900">{selectedDoubt.subject}</h2>
                      <p className="text-slate-500 text-sm">Submitted {selectedDoubt.createdAt}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedDoubt(null)}
                    className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="p-8 overflow-y-auto flex-1 space-y-8">
                  <section>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <AlertCircle size={20} className="text-primary" />
                      Doubt Details
                    </h3>
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                      <h4 className="font-bold text-lg mb-2">{selectedDoubt.title}</h4>
                      <p className="text-slate-600 leading-relaxed">{selectedDoubt.description}</p>
                    </div>
                  </section>

                  {selectedDoubt.answer ? (
                    <section>
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <CheckCircle2 size={20} className="text-green-500" />
                        Expert Solution
                      </h3>
                      <div className="bg-green-50/50 rounded-2xl p-8 border border-green-100">
                        <div className="prose prose-slate max-w-none">
                          <p className="text-slate-800 leading-relaxed whitespace-pre-wrap">
                            {selectedDoubt.answer}
                          </p>
                        </div>
                        <div className="mt-8 pt-6 border-t border-green-100 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img src="https://picsum.photos/seed/tutor/100/100" className="w-10 h-10 rounded-full" referrerPolicy="no-referrer" />
                            <div>
                              <p className="font-bold text-sm">Dr. Sarah Johnson</p>
                              <p className="text-xs text-slate-500">Expert Tutor • 5.0 ⭐</p>
                            </div>
                          </div>
                          <button className="flex items-center gap-2 text-primary font-bold text-sm hover:underline">
                            Mark as Helpful <ExternalLink size={14} />
                          </button>
                        </div>
                      </div>
                    </section>
                  ) : (
                    <section className="text-center py-12">
                      <div className="w-16 h-16 bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <Clock size={32} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">Waiting for Answer</h3>
                      <p className="text-slate-500 mt-2">Our experts are reviewing your doubt. You'll be notified soon!</p>
                    </section>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
