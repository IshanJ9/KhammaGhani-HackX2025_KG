'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Stethoscope, Activity, Heart, Brain, FileText, Menu } from 'lucide-react';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null); // Reference for auto-scrolling

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("http://localhost:5000/get_response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversation_history: [...messages, userMessage] }),
      });

      const data = await response.json();
      const botMessage = { text: data.response, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setInput("");
  };

  return (
    <div className="min-h-screen w-full bg-[#111827]">
      <div className="flex min-h-screen bg-[#111827]">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-[#1E2433] border-r border-gray-700 transition-all duration-300 flex flex-col fixed h-screen`}>
          <div className="flex items-center p-4 border-b border-gray-700">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            {sidebarOpen && <span className="ml-3 text-gray-100 font-semibold">MedAI Dashboard</span>}
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-2">
              <NavItem icon={<Heart />} text="Heart Risk Assessment" active={true} expanded={sidebarOpen} />
              <NavItem icon={<Activity />} text="Metabolic Health" expanded={sidebarOpen} />
              <NavItem icon={<Brain />} text="Organ Systems Evaluation" expanded={sidebarOpen} />
              <NavItem icon={<FileText />} text="Data Consent" expanded={sidebarOpen} />
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-16'} transition-all duration-300`}>
          <div className="h-16 bg-[#1E2433] border-b border-gray-700 flex items-center justify-between px-6 sticky top-0">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white">
              <Menu className="w-6 h-6" />
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Run
            </button>
          </div>

          {/* Chat Section */}
          <div className="p-6 bg-[#111827] min-h-[calc(100vh-4rem)] flex flex-col">
            <h1 className="text-3xl text-gray-100 font-semibold mb-4 flex items-center">
              <Stethoscope className="w-8 h-8 text-blue-500 mr-3" />
              Heart Disease Risk Assessment AI
            </h1>
            
            <p className="text-gray-400 mb-6">
              The AI will engage in a conversation to assess your heart disease risk.
            </p>

            {/* Chat UI */}
            <div className="bg-[#1E2433] rounded-lg p-6 flex flex-col flex-grow max-h-[calc(100vh-250px)]">
              <button className="px-4 py-2 bg-[#2D3748] text-white rounded-md hover:bg-[#374151] transition-colors">
                New Session
              </button>

              {/* Scrollable chat container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex items-start gap-3 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    {/* Avatar */}
                    {/* Avatar */}
                    <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                      <img 
                        src={msg.sender === "user" ? "/user-avatar.png" : "/DoctorAvatar.jpg"}
                        alt={msg.sender === "user" ? "User Avatar" : "AI Avatar"}
                        className="w-full h-full object-cover"
                      />
                    </div>


                    {/* Message */}
                    <div className={`p-3 rounded-lg max-w-[70%] ${msg.sender === "user" ? "bg-blue-600 text-white rounded-tr-none" : "bg-[#2D3748] text-gray-100 rounded-tl-none"}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {/* Auto-scroll reference */}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className="relative mt-4">
                <input 
                  type="text"
                  placeholder="Enter your response or ask a question"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  className="w-full bg-[#2D3748] text-white rounded-md py-3 px-4 pr-12 border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
                <button
                  onClick={handleSend}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-400"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Navigation Item Component
const NavItem = ({ icon, text, active = false, expanded = true }) => {
  return (
    <div className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${active ? 'bg-blue-600 bg-opacity-20 text-blue-500' : 'text-gray-400 hover:bg-[#2D3748]'}`}>
      <div className="w-6 h-6">{icon}</div>
      {expanded && <span className="ml-3">{text}</span>}
    </div>
  );
};
