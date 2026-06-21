import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, MessageSquare, User } from 'lucide-react';
import { useCharacterContext } from '../context/CharacterContext'; // Added this import

export default function Dashboard() {
  const { state } = useCharacterContext();
  const character = state.characterForm; // Grabs the character you just typed in

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your Characters</h1>
          <p className="text-gray-500 mt-1">Select a character to start an interview session.</p>
        </div>
      </div>

      {/* Dynamic Rendering: Show card if a name exists, otherwise show empty state */}
      {character.name ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-indigo-100 p-3 rounded-full">
                <User className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{character.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-1">{character.short_description}</p>
              </div>
            </div>
            <div className="mb-4">
               <p className="text-sm text-gray-600 line-clamp-2"><span className="font-semibold">Traits:</span> {character.personality_traits}</p>
            </div>
            <button
              onClick={() => alert("Backend chat integration coming in Week 3!")}
              className="w-full flex items-center justify-center space-x-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Start Interview</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-12 text-center shadow-sm">
          <div className="flex justify-center mb-4">
            <div className="bg-indigo-50 p-4 rounded-full">
              <PlusCircle className="h-10 w-10 text-indigo-500" />
            </div>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No characters found</h3>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto">
            You haven't created any AI characters yet. Initialize a new character profile to begin.
          </p>
          <Link 
            to="/create" 
            className="inline-flex items-center justify-center space-x-2 bg-indigo-600 text-white hover:bg-indigo-700 px-6 py-3 rounded-lg font-medium transition-colors shadow-sm"
          >
            <PlusCircle className="h-5 w-5" />
            <span>Create First Character</span>
          </Link>
        </div>
      )}
    </div>
  );
}