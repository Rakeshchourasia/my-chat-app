import React, { useState } from 'react';
import { MessageSquare, Mail, Lock, User, UserPlus, Sparkles, Check } from 'lucide-react';

export default function MernSignup() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isHovered, setIsHovered] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('Signup attempt:', formData);
  };

  const passwordStrength = formData.password.length > 0 ? 
    formData.password.length < 6 ? 'weak' :
    formData.password.length < 10 ? 'medium' : 'strong' : '';

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
                Create Account
              </h1>
              <p className="text-gray-400">Join thousands of users exploring AI conversations</p>
            </div>

            <div className="space-y-5">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-sm text-gray-300 font-medium">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm text-gray-300 font-medium">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm text-gray-300 font-medium">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    placeholder="Create a password"
                    className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
                {/* Password Strength Indicator */}
                {passwordStrength && (
                  <div className="flex gap-2 mt-2">
                    <div className={`h-1 flex-1 rounded-full transition-all ${
                      passwordStrength === 'weak' ? 'bg-red-500' :
                      passwordStrength === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <div className={`h-1 flex-1 rounded-full transition-all ${
                      passwordStrength === 'medium' || passwordStrength === 'strong' ? 'bg-yellow-500' : 'bg-slate-700'
                    } ${passwordStrength === 'strong' ? 'bg-green-500' : ''}`}></div>
                    <div className={`h-1 flex-1 rounded-full transition-all ${
                      passwordStrength === 'strong' ? 'bg-green-500' : 'bg-slate-700'
                    }`}></div>
                  </div>
                )}
                {passwordStrength && (
                  <p className={`text-xs mt-1 ${
                    passwordStrength === 'weak' ? 'text-red-400' :
                    passwordStrength === 'medium' ? 'text-yellow-400' : 'text-green-400'
                  }`}>
                    Password strength: {passwordStrength}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-sm text-gray-300 font-medium">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    placeholder="Confirm your password"
                    className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                  {formData.confirmPassword && formData.password === formData.confirmPassword && (
                    <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-400" />
                  )}
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start gap-3 pt-2">
                <button
                  onClick={() => setAcceptTerms(!acceptTerms)}
                  className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-all mt-0.5 ${
                    acceptTerms 
                      ? 'bg-purple-600 border-purple-600' 
                      : 'border-slate-600 hover:border-purple-500'
                  }`}
                >
                  {acceptTerms && <Check className="w-3 h-3 text-white" />}
                </button>
                <p className="text-sm text-gray-400">
                  I agree to the <span className="text-purple-400 hover:text-purple-300 cursor-pointer">Terms of Service</span> and <span className="text-purple-400 hover:text-purple-300 cursor-pointer">Privacy Policy</span>
                </p>
              </div>

              <button
                onClick={handleSubmit}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                disabled={!acceptTerms}
                className={`w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  acceptTerms 
                    ? 'hover:shadow-lg hover:shadow-purple-500/50 cursor-pointer' 
                    : 'opacity-50 cursor-not-allowed'
                }`}
              >
                <UserPlus className={`w-5 h-5 transition-transform duration-300 ${isHovered && acceptTerms ? 'scale-110' : ''}`} />
                Create Account
              </button>

              <p className="text-center text-sm text-gray-400 pt-2">
                Already have an account?{' '}
                <button className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                  Log in
                </button>
              </p>
            </div>
          </div>

          {/* Right Side - Benefits & Features */}
          <div className="hidden md:block">
            <div className="space-y-6">
              {/* Feature Cards */}
              {[
                {
                  icon: '🚀',
                  title: 'Lightning Fast',
                  description: 'Experience blazing fast AI responses powered by cutting-edge technology'
                },
                {
                  icon: '🔒',
                  title: 'Secure & Private',
                  description: 'Your conversations are encrypted and protected with enterprise-grade security'
                },
                {
                  icon: '💎',
                  title: 'Premium Features',
                  description: 'Access advanced AI models, custom personalities, and unlimited conversations'
                },
                {
                  icon: '🌐',
                  title: 'Multi-Platform',
                  description: 'Seamlessly sync across web, mobile, and desktop applications'
                }
              ].map((feature, i) => (
                <div
                  key={i}
                  className="backdrop-blur-sm bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{feature.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-400 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                {[
                  { value: '10K+', label: 'Active Users' },
                  { value: '1M+', label: 'Conversations' },
                  { value: '99.9%', label: 'Uptime' }
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="backdrop-blur-sm bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 text-center"
                  >
                    <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}