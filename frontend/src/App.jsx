import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CharacterProvider } from './context/CharacterContext';
import { MessageSquare, Users, PlusCircle } from 'lucide-react';

import Dashboard from './pages/Dashboard';
import CharacterCreation from './pages/CharacterCreation';
import ChatRoom from './pages/ChatRoom';

function App() {
  return (
    <CharacterProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 text-gray-900 font-sans flex flex-col">
          
          {/* Navigation Bar */}
          <header className="bg-white shadow-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-6 w-6 text-indigo-600" />
                <span className="font-bold text-xl tracking-tight text-gray-900">
                  AI Interview System
                </span>
              </div>
              
              <nav className="flex space-x-4">
                <Link to="/" className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  <Users className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                <Link to="/create" className="flex items-center space-x-1 bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm">
                  <PlusCircle className="h-4 w-4" />
                  <span>New Character</span>
                </Link>
              </nav>
              
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/create" element={<CharacterCreation />} />
              <Route path="/chat/:characterId" element={<ChatRoom />} />
            </Routes>
          </main>
          
        </div>
      </Router>
    </CharacterProvider>
  );
}

export default App;