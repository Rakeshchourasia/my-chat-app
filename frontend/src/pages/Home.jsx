import React, { useState, useEffect } from 'react';
import { MessageSquare, Zap, Database, Menu, X } from 'lucide-react';

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const features = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Real-time Messaging",
      description: "Lorem ipsum schema scarce idea eller antenicorat est simpleet"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "AI powered Responses",
      description: "Lorem ipsum comara commis lorem idea eiller atisipiscent est anteplaat"
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Scalable Architecture",
      description: "Lorem ipsum comarat comita lorem idea eiller atisipiscent est anteplaat"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4 flex items-center justify-between backdrop-blur-sm bg-slate-900/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center rotate-45">
            <div className="rotate-[-45deg] text-xl font-bold">M</div>
          </div>
          <span className="text-xl font-semibold">MERN AI Chat</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="hover:text-cyan-400 transition-colors">Features</a>
          <a href="#developers" className="hover:text-cyan-400 transition-colors">Developers</a>
          <a href="#pricing" className="hover:text-cyan-400 transition-colors">Pricing</a>
          <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all">
            Login
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden relative z-40 bg-slate-900/95 backdrop-blur-lg px-6 py-4 space-y-4">
          <a href="#features" className="block hover:text-cyan-400 transition-colors">Features</a>
          <a href="#developers" className="block hover:text-cyan-400 transition-colors">Developers</a>
          <a href="#pricing" className="block hover:text-cyan-400 transition-colors">Pricing</a>
          <button className="w-full px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
            Login
          </button>
        </div>
      )}

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Build the Future of{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Conversation
                </span>
              </h1>
              <p className="text-lg text-slate-300">
                Unlock intelligent, scalable AI chat with MERN Stack and beyond
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:shadow-xl hover:shadow-cyan-500/50 transition-all transform hover:scale-105">
                  Get Started Free
                </button>
                <button className="px-8 py-3 border-2 border-cyan-500 rounded-lg font-semibold hover:bg-cyan-500/10 transition-all">
                  View Demo
                </button>
              </div>
            </div>

            {/* Right Content - 3D Cube Visualization */}
            <div className="relative h-96 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Animated network cube */}
                <div className="relative w-64 h-64 animate-spin-slow">
                  <div className="absolute inset-0 border-2 border-cyan-500/30 rounded-lg transform rotate-45"></div>
                  <div className="absolute inset-4 border-2 border-blue-500/40 rounded-lg transform -rotate-12"></div>
                  <div className="absolute inset-8 border-2 border-purple-500/50 rounded-lg transform rotate-12"></div>
                  
                  {/* Floating icons */}
                  <div className="absolute -top-8 -left-8 bg-gradient-to-br from-cyan-500 to-blue-600 p-3 rounded-lg animate-float">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div className="absolute -top-8 -right-8 bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-lg animate-float" style={{animationDelay: '0.5s'}}>
                    <Database className="w-6 h-6" />
                  </div>
                  <div className="absolute -bottom-8 -left-8 bg-gradient-to-br from-purple-500 to-pink-600 p-3 rounded-lg animate-float" style={{animationDelay: '1s'}}>
                    <Zap className="w-6 h-6" />
                  </div>
                  <div className="absolute -bottom-8 -right-8 bg-gradient-to-br from-cyan-500 to-blue-600 p-3 rounded-lg animate-float" style={{animationDelay: '1.5s'}}>
                    <MessageSquare className="w-6 h-6" />
                  </div>
                </div>

                {/* Connection dots */}
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-24 grid md:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group relative p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-slate-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-12">
            {[0, 1, 2, 3].map((idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === idx 
                    ? 'bg-cyan-500 w-8' 
                    : 'bg-slate-600 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>
        </div>
      </main>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}