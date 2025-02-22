'use client';
import React from 'react';
import { Stethoscope, Activity, Heart, Brain, FileText, Menu } from 'lucide-react';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <div className="min-h-screen w-full bg-[#111827]"> {/* Dark background for entire app */}
      <div className="flex min-h-screen bg-[#111827]">
        {/* Sidebar */}
        <div 
          className={`${sidebarOpen ? 'w-64' : 'w-16'} 
          bg-[#1E2433] border-r border-gray-700 
          transition-all duration-300 flex flex-col fixed h-screen`}
        > 
          {/* Logo Area */}
          <div className="flex items-center p-4 border-b border-gray-700">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            {sidebarOpen && <span className="ml-3 text-gray-100 font-semibold">MedAI Dashboard</span>}
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="text-gray-400 text-sm mb-4">{sidebarOpen && 'Go to:'}</div>
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
          {/* Top Bar */}
          <div className="h-16 bg-[#1E2433] border-b border-gray-700 flex items-center justify-between px-6 sticky top-0">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-400 hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Run
              </button>
              <button className="text-gray-400 hover:text-white">
                Share
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="p-6 bg-[#111827] min-h-[calc(100vh-4rem)]">
            <div className="flex items-center mb-6">
              <Stethoscope className="w-8 h-8 text-blue-500 mr-4" />
              <h1 className="text-3xl text-gray-100 font-semibold">
                Heart Disease Risk Assessment AI
              </h1>
            </div>
            
            <p className="text-gray-400 mb-6">
              The AI will engage in a conversation to assess your heart disease risk.
            </p>

            {/* Chat Interface */}
            <div className="bg-[#1E2433] rounded-lg p-6 min-h-[calc(100vh-300px)] relative">
              <button className="px-4 py-2 bg-[#2D3748] text-white rounded-md hover:bg-[#374151] transition-colors">
                New Session
              </button>
              
              {/* Chat Input */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="relative">
                  <input 
                    type="text"
                    placeholder="Enter your response or ask a question"
                    className="w-full bg-[#2D3748] text-white rounded-md py-3 px-4 pr-12 border border-gray-600 focus:border-blue-500 focus:outline-none"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-400">
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
    </div>
  );
}

// Navigation Item Component
const NavItem = ({ icon, text, active = false, expanded = true }) => {
  return (
    <div 
      className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors
        ${active 
          ? 'bg-blue-600 bg-opacity-20 text-blue-500' 
          : 'text-gray-400 hover:bg-[#2D3748]'
        }`}
    >
      <div className="w-6 h-6">
        {icon}
      </div>
      {expanded && <span className="ml-3">{text}</span>}
    </div>
  );
};