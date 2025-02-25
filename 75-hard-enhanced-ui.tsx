import React, { useState, useEffect } from "react";
import { Trophy, Edit2, Trash2, Info, Calendar, BarChart2, Clock, AlertTriangle, CheckCircle } from "lucide-react";

const App = () => {
  // Sample state for preview
  const [showInfo, setShowInfo] = useState(false);
  const [activeTab, setActiveTab] = useState("tracker");
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header with animated gradient background */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-animate rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-full">
                <Trophy className="text-yellow-400" size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">75 Hard Challenge</h1>
                <p className="text-blue-100">Transform your life through discipline and consistency</p>
              </div>
            </div>
            <button 
              onClick={() => setShowInfo(!showInfo)}
              className="bg-white/20 hover:bg-white/30 text-white rounded-full p-2"
            >
              <Info size={24} />
            </button>
          </div>
          
          {showInfo && (
            <div className="mt-4 p-4 bg-white/10 rounded-lg text-white">
              <h3 className="font-bold text-lg mb-2">What is 75 Hard?</h3>
              <p className="mb-2">75 Hard is a mental toughness program created by Andy Frisella. For 75 consecutive days, you must:</p>
              <ul className="list-disc pl-6 mb-2 space-y-1">
                <li>Follow a diet (no cheat meals or alcohol)</li>
                <li>Complete two 45-minute workouts (one outdoors)</li>
                <li>Drink a gallon of water</li>
                <li>Read 10 pages of non-fiction</li>
                <li>Take a progress photo</li>
              </ul>
              <p className="text-yellow-200 font-medium">If you miss any task, you start over from day 1!</p>
            </div>
          )}
        </div>
        
        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-md p-1 mb-6 flex justify-center">
          <button 
            onClick={() => setActiveTab("tracker")}
            className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${activeTab === "tracker" ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:bg-gray-50"}`}
          >
            <CheckCircle size={18} />
            Daily Tracker
          </button>
          <button 
            onClick={() => setActiveTab("progress")}
            className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${activeTab === "progress" ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:bg-gray-50"}`}
          >
            <BarChart2 size={18} />
            Progress
          </button>
          <button 
            onClick={() => setActiveTab("calendar")}
            className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${activeTab === "calendar" ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:bg-gray-50"}`}
          >
            <Calendar size={18} />
            Calendar
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          {/* Progress Summary Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-blue-800">Current Streak</h3>
                <Clock className="text-blue-600" size={20} />
              </div>
              <div className="text-3xl font-bold text-blue-800">12 days</div>
              <div className="mt-2 text-blue-600 text-sm">16% complete</div>
              <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: "16%"}}></div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-green-800">Today's Progress</h3>
                <CheckCircle className="text-green-600" size={20} />
              </div>
              <div className="text-3xl font-bold text-green-800">3/5 tasks</div>
              <div className="mt-2 text-green-600 text-sm">60% completed</div>
              <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                <div className="bg-green-600 h-2 rounded-full" style={{width: "60%"}}></div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-purple-800">Best Streak</h3>
                <Trophy className="text-purple-600" size={20} />
              </div>
              <div className="text-3xl font-bold text-purple-800">18 days</div>
              <div className="mt-2 text-purple-600 text-sm">24% of challenge</div>
              <div className="w-full bg-purple-200 rounded-full h-2 mt-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{width: "24%"}}></div>
              </div>
            </div>
          </div>
          
          {/* Habit Cards */}
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Today's Habits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {["Follow diet plan", "Morning workout (45 min)", "Evening workout outdoors (45 min)", "Drink 1 gallon of water", "Read 10 pages"].map((habit, index) => (
              <div key={index} className="bg-white border border-gray-200 hover:border-blue-300 rounded-xl shadow-sm hover:shadow-md transition-all p-4 habit-card">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <button className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${index < 3 ? "bg-green-500 text-white" : "border-2 border-gray-300"}`}>
                      {index < 3 && <CheckCircle size={16} />}
                    </button>
                    <span className="font-medium text-gray-800">{habit}</span>
                  </div>
                  <div className="flex gap-1">
                    <button className="text-gray-400 hover:text-blue-500 p-1">
                      <Edit2 size={16} />
                    </button>
                    <button className="text-gray-400 hover:text-red-500 p-1">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 flex items-center justify-center hover:border-blue-400 cursor-pointer bg-gray-50 hover:bg-blue-50 transition-colors">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-2">
                  <span className="text-blue-600 font-bold text-lg">+</span>
                </div>
                <p className="text-gray-500 font-medium">Add New Habit</p>
              </div>
            </div>
          </div>
          
          {/* Warning Card */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-amber-500 mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-semibold text-amber-800 mb-1">Remember the 75 Hard Rules</h3>
                <p className="text-amber-700 text-sm">If you miss any task, you must start over from Day 1. Track honestly and stay committed to your transformation!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
