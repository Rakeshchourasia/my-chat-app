import React, { useState } from 'react';
import { MessageSquare, Mail, Lock, LogIn, Sparkles } from 'lucide-react';

export default function MernLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = () => {
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Stars effect */}
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            opacity: Math.random() * 0.5 + 0.2
          }}
        />
      ))}

      <div className="w-full max-w-6xl mx-auto relative z-10">
        {/* Navigation */}
        <nav className="flex items-center justify-between mb-8 px-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <MessageSquare className="w-8 h-8 text-cyan-400" />
              <Sparkles className="w-4 h-4 text-purple-400 absolute -top-1 -right-1" />
            </div>
            <span className="text-2xl font-bold text-white">MERN AI Chat</span>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-gray-300 hover:text-white transition-colors">Features</button>
            <button className="text-gray-300 hover:text-white transition-colors">Developers</button>
            <button className="text-gray-300 hover:text-white transition-colors">Pricing</button>
            <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
              Login
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Form */}
          <div className="backdrop-blur-xl bg-slate-800/40 rounded-3xl p-8 border border-slate-700/50 shadow-2xl">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Welcome Back!
              </h1>
              <p className="text-gray-400">Log in to your account</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-300 font-medium">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-300 font-medium">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <button type="button" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Forgot Password?
                </button>
                <button type="button" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Don't have an account? <span className="text-purple-400">Sign Up</span>
                </button>
              </div>

              <button
                onClick={handleSubmit}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <LogIn className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                Login to Account
              </button>
            </div>

            <div className="mt-6 flex justify-center gap-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === 2 ? 'bg-purple-500 w-8' : 'bg-slate-600'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Side - 3D Visual */}
          <div className="hidden md:block relative">
            <div className="relative w-full aspect-square">
              {/* Central cube with animated network */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64 perspective-1000">
                  {/* 3D Cube effect */}
                  <div className="absolute inset-0 animate-spin-slow">
                    <div className="absolute inset-0 border-2 border-cyan-400/30 rounded-lg transform rotate-45"></div>
                    <div className="absolute inset-4 border-2 border-purple-400/30 rounded-lg transform -rotate-12"></div>
                    <div className="absolute inset-8 border-2 border-blue-400/30 rounded-lg transform rotate-12"></div>
                  </div>
                  
                  {/* Center glow */}
                  <div className="absolute inset-1/4 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-full blur-2xl animate-pulse"></div>
                </div>
              </div>

              {/* Floating chat bubbles */}
              {[
                { top: '10%', left: '10%', delay: '0s', icon: '💬' },
                { top: '15%', right: '15%', delay: '1s', icon: '🤖' },
                { bottom: '20%', left: '15%', delay: '2s', icon: '💡' },
                { bottom: '15%', right: '10%', delay: '1.5s', icon: '✨' },
              ].map((bubble, i) => (
                <div
                  key={i}
                  className="absolute backdrop-blur-sm bg-slate-800/40 border border-slate-600/50 rounded-2xl p-4 shadow-lg animate-float"
                  style={{
                    ...bubble,
                    animationDelay: bubble.delay,
                  }}
                >
                  <span className="text-3xl">{bubble.icon}</span>
                </div>
              ))}

              {/* Network nodes */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50 animate-pulse"
                  style={{
                    top: `${20 + Math.sin((i * Math.PI) / 4) * 30}%`,
                    left: `${50 + Math.cos((i * Math.PI) / 4) * 30}%`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotateY(0deg) rotateX(0deg); }
          to { transform: rotateY(360deg) rotateX(360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}