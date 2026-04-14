import React from 'react';
import { DashboardLayout } from '@/src/components/DashboardLayout';
import { GlassCard } from '@/src/components/GlassCard';
import { User as UserIcon, Mail, Shield, Bell, Trash2, Camera, Save } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '@/src/context/AuthContext';
import { useDoubts } from '@/src/context/DoubtContext';

export default function Profile() {
  const { user } = useAuth();
  const { stats } = useDoubts();

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-bold font-display text-slate-900">Profile Settings</h1>
          <p className="text-slate-500 mt-2">Manage your account information and preferences.</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <GlassCard className="text-center p-8">
              <div className="relative inline-block mb-6">
                <img 
                  src={user?.avatar || "https://picsum.photos/seed/alex/200/200"} 
                  alt="Profile" 
                  className="w-32 h-32 rounded-full border-4 border-white shadow-xl"
                  referrerPolicy="no-referrer"
                />
                <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-all">
                  <Camera size={18} />
                </button>
              </div>
              <h3 className="text-xl font-bold font-display">{user?.name || 'Alex Thompson'}</h3>
              <p className="text-slate-500 text-sm mb-6">Student • Joined March 2024</p>
              <div className="flex justify-center gap-4">
                <div className="text-center">
                  <p className="text-xl font-bold">{stats.totalDoubts}</p>
                  <p className="text-xs text-slate-400 uppercase font-bold">Doubts</p>
                </div>
                <div className="w-px h-10 bg-slate-100" />
                <div className="text-center">
                  <p className="text-xl font-bold">{stats.solved}</p>
                  <p className="text-xs text-slate-400 uppercase font-bold">Solved</p>
                </div>
                <div className="w-px h-10 bg-slate-100" />
                <div className="text-center">
                  <p className="text-xl font-bold">120</p>
                  <p className="text-xs text-slate-400 uppercase font-bold">XP</p>
                </div>
              </div>
            </GlassCard>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <GlassCard className="p-8">
              <h3 className="text-xl font-bold font-display mb-6 flex items-center gap-2">
                <UserIcon size={20} className="text-primary" />
                Personal Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Full Name</label>
                  <input 
                    type="text" 
                    defaultValue={user?.name || "Alex Thompson"}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Email Address</label>
                  <input 
                    type="email" 
                    defaultValue={user?.email || "alex@example.com"}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
              <button className="mt-8 bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 flex items-center gap-2 hover:bg-primary/90 transition-all">
                <Save size={18} /> Save Changes
              </button>
            </GlassCard>

            <GlassCard className="p-8">
              <h3 className="text-xl font-bold font-display mb-6 flex items-center gap-2">
                <Shield size={20} className="text-primary" />
                Security
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <p className="font-bold text-slate-900">Change Password</p>
                    <p className="text-sm text-slate-500">Update your account password regularly.</p>
                  </div>
                  <button className="text-primary font-bold text-sm hover:underline">Update</button>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <p className="font-bold text-slate-900">Two-Factor Authentication</p>
                    <p className="text-sm text-slate-500">Add an extra layer of security to your account.</p>
                  </div>
                  <button className="text-primary font-bold text-sm hover:underline">Enable</button>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-8 border-red-100 bg-red-50/30">
              <h3 className="text-xl font-bold font-display text-red-600 mb-2 flex items-center gap-2">
                <Trash2 size={20} />
                Danger Zone
              </h3>
              <p className="text-sm text-red-500/80 mb-6">Once you delete your account, there is no going back. Please be certain.</p>
              <button className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-red-600/20 hover:bg-red-700 transition-all">
                Delete Account
              </button>
            </GlassCard>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
