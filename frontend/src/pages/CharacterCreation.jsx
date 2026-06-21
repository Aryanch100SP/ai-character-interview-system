import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCharacterContext } from '../context/CharacterContext';

export default function CharacterCreation() {
  const { state, dispatch } = useCharacterContext();
  const navigate = useNavigate();
  const { characterForm } = state; // Pulling the current data from your global state

  // This function updates your Context API state every time you type a letter
  const handleChange = (e) => {
    dispatch({
      type: 'UPDATE_FORM_FIELD',
      field: e.target.name,
      value: e.target.value
    });
  };

  // This handles the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In Week 3, we will send this exact data to Node.js and PostgreSQL.
    // For now, we verify it works in local state and return to the dashboard.
    console.log("Character Data Ready for DB:", characterForm);
    alert(`Success! ${characterForm.name} saved to local state.`);
    
  
    navigate('/'); // Sends you back to the Dashboard
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-8 py-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Design New Character</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Character Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Character Name</label>
            <input 
              type="text" 
              name="name" 
              value={characterForm.name} 
              onChange={handleChange} 
              required 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors" 
              placeholder="e.g., Emperor Prithviraj Chauhan" 
            />
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Short Description</label>
            <input 
              type="text" 
              name="short_description" 
              value={characterForm.short_description} 
              onChange={handleChange} 
              required 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors" 
              placeholder="e.g., A fearless and just historical ruler." 
            />
          </div>

          {/* Backstory */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Backstory (System Prompt Context)</label>
            <textarea 
              name="backstory" 
              value={characterForm.backstory} 
              onChange={handleChange} 
              required 
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none" 
              placeholder="Detail their history, motivations, and secrets. This will be fed directly to the AI." 
            />
          </div>

          {/* Personality Traits */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Personality Traits</label>
            <textarea 
              name="personality_traits" 
              value={characterForm.personality_traits} 
              onChange={handleChange} 
              required 
              rows="2"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none" 
              placeholder="e.g., Formal, authoritative, speaks in a commanding tone." 
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-sm"
            >
              Initialize Character Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}