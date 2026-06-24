import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, MessageSquare, User } from 'lucide-react';

export default function Dashboard() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // This runs automatically when the Dashboard loads
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/characters');
        if (response.ok) {
          const data = await response.json();
          setCharacters(data); // Save the database characters into React state
        }
      } catch (error) {
        console.error("Error fetching characters:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your Characters</h1>
          <p className="text-gray-500 mt-1">Select a character to start an interview session.</p>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-gray-500">Loading your characters from the database...</div>
      ) : characters.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* We loop through the database array and create a card for each one */}
          {characters.map((char) => (
            <div key={char.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-indigo-100 p-3 rounded-full">
                    <User className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{char.name}</h3>
                    <p className="text-sm text-gray-500 line-clamp-1">{char.short_description}</p>
                  </div>
                </div>
                <div className="mb-4">
                   <p className="text-sm text-gray-600 line-clamp-2"><span className="font-semibold">Traits:</span> {char.personality_traits}</p>
                </div>
              </div>
              <Link
  to={`/chat/${char.id}`}
  className="w-full flex items-center justify-center space-x-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-4 py-2 rounded-lg font-medium transition-colors mt-4"
>
  <MessageSquare className="h-4 w-4" />
  <span>Start Interview</span>
</Link>
            </div>
          ))}
        </div>
      ) : (
        /* The Empty State (If database is empty) */
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