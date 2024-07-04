import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, User, Settings, Zap, Book, Layers, Palette, Volume2, Moon, Sun, Grid, List } from 'lucide-react';

const AdvancedHalkipedia = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [layoutType, setLayoutType] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Simulating loading process
    setTimeout(() => setIsLoading(false), 3000);
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.post('/nlp', { text: searchQuery });
      console.log('Search results:', response.data);
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="text-white text-center">
          <h1 className="text-6xl font-bold mb-4 animate-pulse">Halkipedia</h1>
          <p className="text-xl">Entering the realm of knowledge...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <header className={`${isDarkMode ? 'bg-gray-800' : 'bg-blue-600'} text-white p-4 transition-colors duration-500`}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Halkipedia</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="AI-Powered Search"
                className={`py-2 px-4 pr-10 rounded-full ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} w-64 focus:outline-none focus:ring-2 focus:ring-blue-300`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
            </div>
            <button onClick={() => setShowSettings(!showSettings)}><Settings size={24} /></button>
            <button onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <button><User size={24} /></button>
          </div>
        </div>
      </header>

      <main className="container mx-auto mt-8 p-4">
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 transition-colors duration-500`}>
          <h2 className="text-3xl font-semibold mb-6 flex items-center">
            <Zap className="mr-2" size={28} />
            Welcome to Advanced Halkipedia
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* AI-Recommended Articles */}
            <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'} p-4 rounded-lg transition-colors duration-500`}>
              <h3 className="font-semibold mb-2 flex items-center">
                <Book className="mr-2" size={20} />
                AI-Curated Articles
              </h3>
              <ul className="space-y-2">
                <li>Quantum Computing Breakthroughs</li>
                <li>The Ethics of Artificial Intelligence</li>
                <li>Sustainable Energy Solutions</li>
              </ul>
            </div>

            {/* Visual Knowledge Map */}
            <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-green-50'} p-4 rounded-lg transition-colors duration-500`}>
              <h3 className="font-semibold mb-2 flex items-center">
                <Layers className="mr-2" size={20} />
                Visual Knowledge Map
              </h3>
              <p>Interactive 3D visualization of connected topics</p>
              <button className="mt-2 bg-green-500 text-white px-3 py-1 rounded">Explore Map</button>
            </div>

            {/* Personalized Learning Path */}
            <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-purple-50'} p-4 rounded-lg transition-colors duration-500`}>
              <h3 className="font-semibold mb-2 flex items-center">
                <Palette className="mr-2" size={20} />
                Personalized Learning Path
              </h3>
              <p>AI-generated curriculum based on your interests</p>
              <button className="mt-2 bg-purple-500 text-white px-3 py-1 rounded">Generate Path</button>
            </div>
          </div>

          {/* Portfolio Section */}
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">Your Knowledge Portfolio</h3>
            <div className="flex justify-between items-center mb-4">
              <p>Track your learning progress and contributions</p>
              <div className="flex space-x-2">
                <button onClick={() => setLayoutType('grid')} className={`p-2 rounded ${layoutType === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                  <Grid size={20} />
                </button>
                <button onClick={() => setLayoutType('list')} className={`p-2 rounded ${layoutType === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                  <List size={20} />
                </button>
              </div>
            </div>
            <div className={`grid ${layoutType === 'grid' ? 'grid-cols-1 md:grid-cols-3 gap-4' : 'grid-cols-1 gap-2'}`}>
              {['Articles Edited', 'Contributions', 'Learning Streaks'].map((item, index) => (
                <div key={index} className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} p-4 rounded-lg transition-colors duration-500`}>
                  <h4 className="font-semibold">{item}</h4>
                  <p className="text-2xl font-bold mt-2">{Math.floor(Math.random() * 100)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Advanced Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 w-96`}>
            <h3 className="text-2xl font-semibold mb-4">Advanced Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>AI Assistance Level</span>
                <select className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded p-1`}>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span>Language Model</span>
                <select className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded p-1`}>
                  <option>GPT-4</option>
                  <option>GPT-3.5</option>
                  <option>Custom</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span>Content Complexity</span>
                <input type="range" min="1" max="5" className="w-32" />
              </div>
              <div className="flex items-center justify-between">
                <span>Audio Narration</span>
                <button className={`${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'} text-white px-3 py-1 rounded flex items-center`}>
                  <Volume2 size={16} className="mr-1" /> Enable
                </button>
              </div>
            </div>
            <button
              onClick={() => setShowSettings(false)}
              className={`mt-6 w-full ${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'} text-white py-2 rounded`}
            >
              Save Settings
            </button>
          </div>
        </div>
      )}

      <footer className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} mt-8 py-4 transition-colors duration-500`}>
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Advanced Halkipedia. Empowered by cutting-edge AI.</p>
        </div>
      </footer>
    </div>
  );
};

export default AdvancedHalkipedia;
