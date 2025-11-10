import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile, MoreVertical, Search, Phone, Video, Menu } from 'lucide-react';

export default function ModernChatApp() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey! How are you doing?", sender: "other", time: "10:30 AM", avatar: "https://ui-avatars.com/api/?name=John+Doe&background=6366f1&color=fff" },
    { id: 2, text: "I'm doing great! Just working on some exciting new projects.", sender: "me", time: "10:32 AM" },
    { id: 3, text: "That sounds awesome! What kind of projects?", sender: "other", time: "10:33 AM", avatar: "https://ui-avatars.com/api/?name=John+Doe&background=6366f1&color=fff" },
    { id: 4, text: "Building some cool chat interfaces with modern UI/UX", sender: "me", time: "10:35 AM" }
  ]);
  
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputText,
        sender: "me",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setInputText('');
      
      // Simulate typing indicator
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const replyMessage = {
          id: messages.length + 2,
          text: "That's interesting! Tell me more about it.",
          sender: "other",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          avatar: "https://ui-avatars.com/api/?name=John+Doe&background=6366f1&color=fff"
        };
        setMessages(prev => [...prev, replyMessage]);
      }, 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 p-3" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      <div className="container-fluid" style={{ maxWidth: '1400px' }}>
        <div className="row g-0 shadow-lg" style={{
          height: '90vh',
          borderRadius: '24px',
          overflow: 'hidden',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)'
        }}>
          
          {/* Sidebar */}
          <div className="col-md-4 col-lg-3 border-end" style={{
            background: 'linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%)',
            overflowY: 'auto'
          }}>
            {/* Sidebar Header */}
            <div className="p-4 border-bottom" style={{ background: 'white' }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0 fw-bold" style={{ color: '#667eea' }}>Messages</h4>
                <button className="btn btn-link text-dark p-0">
                  <Menu size={24} />
                </button>
              </div>
              <div className="position-relative">
                <Search size={18} className="position-absolute" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d' }} />
                <input 
                  type="text" 
                  className="form-control ps-5" 
                  placeholder="Search conversations..."
                  style={{
                    borderRadius: '12px',
                    border: '1px solid #dee2e6',
                    padding: '10px 10px 10px 40px'
                  }}
                />
              </div>
            </div>

            {/* Contacts List */}
            <div className="p-2">
              {[1, 2, 3, 4, 5].map((item, idx) => (
                <div 
                  key={item}
                  className={`d-flex align-items-center p-3 mb-2 ${idx === 0 ? 'bg-white' : ''}`}
                  style={{
                    borderRadius: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    transform: idx === 0 ? 'translateX(4px)' : 'none',
                    boxShadow: idx === 0 ? '0 4px 12px rgba(102, 126, 234, 0.15)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    if (idx !== 0) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }
                  }}
                >
                  <div className="position-relative me-3">
                    <img 
                      src={`https://ui-avatars.com/api/?name=User+${item}&background=${idx === 0 ? '6366f1' : 'random'}&color=fff`}
                      alt="avatar"
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '50%',
                        border: '3px solid white',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}
                    />
                    <span 
                      className="position-absolute bottom-0 end-0"
                      style={{
                        width: '14px',
                        height: '14px',
                        background: idx % 2 === 0 ? '#10b981' : '#6b7280',
                        border: '2px solid white',
                        borderRadius: '50%'
                      }}
                    />
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start mb-1">
                      <h6 className="mb-0 fw-semibold">User {item}</h6>
                      <small className="text-muted">10:3{item} AM</small>
                    </div>
                    <p className="mb-0 text-muted small">Last message preview goes here...</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="col-md-8 col-lg-9 d-flex flex-column">
            {/* Chat Header */}
            <div className="p-4 border-bottom d-flex justify-content-between align-items-center" style={{
              background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
              color: 'white'
            }}>
              <div className="d-flex align-items-center">
                <div className="position-relative me-3">
                  <img 
                    src="https://ui-avatars.com/api/?name=John+Doe&background=fff&color=667eea"
                    alt="avatar"
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      border: '3px solid white',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                    }}
                  />
                  <span 
                    className="position-absolute bottom-0 end-0"
                    style={{
                      width: '14px',
                      height: '14px',
                      background: '#10b981',
                      border: '2px solid white',
                      borderRadius: '50%'
                    }}
                  />
                </div>
                <div>
                  <h5 className="mb-0 fw-bold">John Doe</h5>
                  <small className="opacity-75">Active now</small>
                </div>
              </div>
              <div className="d-flex gap-3">
                <button className="btn btn-link text-white p-0" style={{ opacity: 0.9 }}>
                  <Phone size={22} />
                </button>
                <button className="btn btn-link text-white p-0" style={{ opacity: 0.9 }}>
                  <Video size={22} />
                </button>
                <button className="btn btn-link text-white p-0" style={{ opacity: 0.9 }}>
                  <MoreVertical size={22} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div 
              className="flex-grow-1 p-4" 
              style={{
                overflowY: 'auto',
                background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)'
              }}
            >
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`d-flex mb-4 ${msg.sender === 'me' ? 'justify-content-end' : 'justify-content-start'}`}
                  style={{
                    animation: 'slideIn 0.3s ease-out'
                  }}
                >
                  {msg.sender === 'other' && (
                    <img 
                      src={msg.avatar}
                      alt="avatar"
                      className="me-3"
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}
                    />
                  )}
                  <div style={{ maxWidth: '70%' }}>
                    <div 
                      className={`p-3 ${msg.sender === 'me' ? 'text-white' : 'bg-white'}`}
                      style={{
                        borderRadius: msg.sender === 'me' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                        background: msg.sender === 'me' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white',
                        boxShadow: msg.sender === 'me' 
                          ? '0 8px 16px rgba(102, 126, 234, 0.3)' 
                          : '0 2px 8px rgba(0,0,0,0.08)',
                        transform: 'translateZ(0)',
                        transition: 'transform 0.2s ease',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px) translateZ(0)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0) translateZ(0)'}
                    >
                      <p className="mb-0">{msg.text}</p>
                    </div>
                    <small className={`d-block mt-1 ${msg.sender === 'me' ? 'text-end' : 'text-start'}`} style={{ color: '#6c757d' }}>
                      {msg.time}
                    </small>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="d-flex align-items-center mb-4">
                  <img 
                    src="https://ui-avatars.com/api/?name=John+Doe&background=6366f1&color=fff"
                    alt="avatar"
                    className="me-3"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%'
                    }}
                  />
                  <div className="bg-white p-3" style={{
                    borderRadius: '20px 20px 20px 4px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                  }}>
                    <div className="d-flex gap-1">
                      <span className="typing-dot" style={{
                        width: '8px',
                        height: '8px',
                        background: '#6c757d',
                        borderRadius: '50%',
                        animation: 'typing 1.4s infinite'
                      }}></span>
                      <span className="typing-dot" style={{
                        width: '8px',
                        height: '8px',
                        background: '#6c757d',
                        borderRadius: '50%',
                        animation: 'typing 1.4s infinite 0.2s'
                      }}></span>
                      <span className="typing-dot" style={{
                        width: '8px',
                        height: '8px',
                        background: '#6c757d',
                        borderRadius: '50%',
                        animation: 'typing 1.4s infinite 0.4s'
                      }}></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-top" style={{ background: 'white' }}>
              <div className="d-flex align-items-end gap-2">
                <button className="btn btn-link text-secondary p-2">
                  <Paperclip size={22} />
                </button>
                <button className="btn btn-link text-secondary p-2">
                  <Smile size={22} />
                </button>
                <div className="flex-grow-1 position-relative">
                  <textarea
                    className="form-control"
                    placeholder="Type your message..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    rows={1}
                    style={{
                      borderRadius: '16px',
                      border: '2px solid #e9ecef',
                      resize: 'none',
                      padding: '12px 16px',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                  />
                </div>
                <button 
                  className="btn text-white"
                  onClick={handleSend}
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '16px',
                    padding: '12px 24px',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
                  }}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-10px);
          }
        }

        /* Scrollbar Styling */
        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #667eea;
        }
      `}</style>
    </div>
  );
}