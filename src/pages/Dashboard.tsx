import React from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/src/components/DashboardLayout';
import { GlassCard } from '@/src/components/GlassCard';
import { Doubt } from '@/src/types';
import { CheckCircle2, Clock, AlertCircle, ArrowUpRight, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { useDoubts } from '@/src/context/DoubtContext';

const StatCard = ({ label, value, icon: Icon, color }: { label: string, value: number, icon: any, color: string }) => (
  <GlassCard className="flex items-center gap-6">
    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", color)}>
      <Icon size={28} />
    </div>
    <div>
      <p className="text-slate-500 font-bold text-sm uppercase tracking-wider">{label}</p>
      <p className="text-3xl font-bold font-display">{value}</p>
    </div>
  </GlassCard>
);

const DoubtItem = ({ doubt, key }: { doubt: Doubt, key?: string }) => (
  <Link to="/doubts" key={key}>
    <div className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-xl transition-colors group cursor-pointer">
      <div className="flex items-center gap-4">
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center",
          doubt.status === 'Answered' ? "bg-green-100 text-green-600" : 
          doubt.status === 'Pending' ? "bg-yellow-100 text-yellow-600" : "bg-red-100 text-red-600"
        )}>
          {doubt.status === 'Answered' ? <CheckCircle2 size={20} /> : 
           doubt.status === 'Pending' ? <Clock size={20} /> : <AlertCircle size={20} />}
        </div>
        <div>
          <h4 className="font-bold text-slate-900 group-hover:text-primary transition-colors">{doubt.title}</h4>
          <p className="text-sm text-slate-500">{doubt.subject} • {doubt.createdAt}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className={cn(
          "px-3 py-1 rounded-full text-xs font-bold",
          doubt.priority === 'High' ? "bg-red-100 text-red-600" : 
          doubt.priority === 'Medium' ? "bg-orange-100 text-orange-600" : "bg-blue-100 text-blue-600"
        )}>
          {doubt.priority}
        </span>
        <ArrowUpRight size={18} className="text-slate-300 group-hover:text-primary transition-colors" />
      </div>
    </div>
  </Link>
);

export default function Dashboard() {
  const { doubts, stats } = useDoubts();
  const recentDoubts = doubts.slice(0, 5);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-bold font-display text-slate-900">Welcome back, Alex 👋</h1>
          <p className="text-slate-500 mt-2">Here's what's happening with your doubts today.</p>
        </header>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <StatCard 
            label="Total Doubts" 
            value={stats.totalDoubts} 
            icon={MessageCircle} 
            color="bg-primary/10 text-primary" 
          />
          <StatCard 
            label="Solved" 
            value={stats.solved} 
            icon={CheckCircle2} 
            color="bg-green-100 text-green-600" 
          />
          <StatCard 
            label="Pending" 
            value={stats.pending} 
            icon={Clock} 
            color="bg-yellow-100 text-yellow-600" 
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <GlassCard className="p-0 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xl font-bold font-display">Recent Doubts</h3>
                <Link to="/doubts" className="text-primary font-bold text-sm hover:underline">View All</Link>
              </div>
              <div className="p-2">
                {recentDoubts.length > 0 ? (
                  recentDoubts.map((doubt) => (
                    <DoubtItem key={doubt.id} doubt={doubt} />
                  ))
                ) : (
                  <div className="p-10 text-center text-slate-400">No doubts yet.</div>
                )}
              </div>
            </GlassCard>
          </div>

          <div className="space-y-6">
            <GlassCard className="bg-primary text-white border-none shadow-primary/20">
              <h3 className="text-xl font-bold font-display mb-2">Need Help?</h3>
              <p className="text-primary-foreground/80 mb-6">Our AI tutor is ready to assist you with any subject.</p>
              <Link to="/ask">
                <button className="w-full bg-white text-primary py-3 rounded-xl font-bold shadow-lg hover:bg-slate-50 transition-colors">
                  Ask a Doubt Now
                </button>
              </Link>
            </GlassCard>

            <GlassCard>
              <h3 className="text-lg font-bold font-display mb-4">Subject Distribution</h3>
              <div className="space-y-4">
                {[
                  { name: 'Mathematics', color: 'bg-blue-500' },
                  { name: 'Physics', color: 'bg-purple-500' },
                  { name: 'Biology', color: 'bg-green-500' },
                  { name: 'Chemistry', color: 'bg-red-500' },
                  { name: 'Computer Science', color: 'bg-indigo-500' }
                ].map((subject) => {
                  const count = doubts.filter(d => d.subject === subject.name).length;
                  if (count === 0) return null;
                  return (
                    <div key={subject.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-slate-700">{subject.name}</span>
                        <span className="text-slate-500">{count} doubts</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(count / stats.totalDoubts) * 100}%` }}
                          className={cn("h-full rounded-full", subject.color)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
