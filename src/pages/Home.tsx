import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Navbar } from '@/src/components/Navbar';
import { GlassCard } from '@/src/components/GlassCard';
import { CheckCircle2, MessageSquare, Zap, BarChart3, Users, ArrowRight } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <GlassCard className="flex flex-col gap-4 p-8">
    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold font-display">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{description}</p>
  </GlassCard>
);

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navbar />

      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px] -z-10" />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-bold mb-6">
              ✨ Smart Doubt Solving for Modern Students
            </span>
            <h1 className="text-5xl md:text-7xl font-bold font-display tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Ask Doubts. Get Answers. <br />
              <span className="text-primary">Learn Faster.</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              Academia Ace uses AI to help you solve complex doubts instantly. 
              Connect with tutors, track your progress, and master your subjects.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-primary/30 flex items-center gap-2"
                >
                  Get Started Free <ArrowRight size={20} />
                </motion.button>
              </Link>
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-lg border border-slate-200 shadow-sm"
                >
                  View Demo
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Floating Cards Mockup */}
          <div className="mt-20 relative max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative z-10"
            >
              <img 
                src="https://picsum.photos/seed/student-group-learning/1200/800" 
                alt="Students Learning" 
                className="rounded-3xl shadow-2xl border border-white/20"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">Everything you need to excel</h2>
            <p className="text-slate-600 max-w-xl mx-auto">Powerful features designed to make learning seamless and interactive.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Zap}
              title="Real-time Answers"
              description="Get instant AI-powered suggestions and quick responses from our community of expert tutors."
            />
            <FeatureCard 
              icon={MessageSquare}
              title="Rich Editor"
              description="Write complex equations, upload images, and format your doubts with our intuitive rich text editor."
            />
            <FeatureCard 
              icon={BarChart3}
              title="Progress Tracking"
              description="Monitor your learning journey with detailed stats on solved doubts and subject-wise performance."
            />
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold font-display mb-8">How Academia Ace Works</h2>
              <div className="space-y-8">
                {[
                  { step: '01', title: 'Ask your Doubt', desc: 'Type your question, upload an image, and select the subject.' },
                  { step: '02', title: 'Get Instant AI Help', desc: 'Our AI provides immediate hints and suggestions to guide you.' },
                  { step: '03', title: 'Expert Resolution', desc: 'Tutors provide detailed step-by-step solutions for your doubts.' }
                ].map((item) => (
                  <div key={item.step} className="flex gap-6">
                    <div className="text-4xl font-bold text-primary/20 font-display">{item.step}</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-primary/5 rounded-[40px] absolute -rotate-6 inset-0 -z-10" />
              <img 
                src="https://picsum.photos/seed/student-studying-hard/800/800" 
                alt="Student studying" 
                className="rounded-[40px] shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
              A
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">Academia Ace</span>
          </Link>
          <div className="flex gap-8 text-slate-500 font-medium">
            <a href="#" className="hover:text-primary">Privacy</a>
            <a href="#" className="hover:text-primary">Terms</a>
            <a href="#" className="hover:text-primary">Contact</a>
          </div>
          <p className="text-slate-400 text-sm">© 2024 Academia Ace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
