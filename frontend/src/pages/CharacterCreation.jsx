import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCharacterContext } from '../context/CharacterContext';

export default function CharacterCreation() {
  const { state, dispatch } = useCharacterContext();
  const navigate = useNavigate();
  const { characterForm } = state; 
  const [isSubmitting, setIsSubmitting] = useState(false); // To prevent double-clicks

  const handleChange = (e) => {
    dispatch({
      type: 'UPDATE_FORM_FIELD',
      field: e.target.name,
      value: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send the data to your Node.js Backend!
      const response = await fetch('[https://ai-character-interview-system-gwmf.onrender.com/api/characters](https://ai-character-interview-system-gwmf.onrender.com/api/characters)', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(characterForm),
      });

      if (response.ok) {
        // If the backend says "201 Created", we succeed!
        const savedCharacter = await response.json();
        alert(`Success! ${savedCharacter.name} saved to PostgreSQL.`);
        
        dispatch({ type: 'RESET_FORM' }); 
        navigate('/'); 
      } else {
        const errorData = await response.json();
        alert(`Failed to save: ${errorData.error}`);
      }
    } catch (err) {
      console.error("Network Error:", err);
      alert("Could not connect to the backend server. Is it running?");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-8 py-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Design New Character</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Character Name</label>
            <input type="text" name="name" value={characterForm.name} onChange={handleChange} required 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors" 
              placeholder="e.g., Emperor Prithviraj Chauhan" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Short Description</label>
            <input type="text" name="short_description" value={characterForm.short_description} onChange={handleChange} required 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors" 
              placeholder="e.g., A fearless and just historical ruler." />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Backstory (System Prompt Context)</label>
            <textarea name="backstory" value={characterForm.backstory} onChange={handleChange} required rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors resize-none" 
              placeholder="Detail their history, motivations, and secrets. This will be fed directly to the AI." />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Personality Traits</label>
            <textarea name="personality_traits" value={characterForm.personality_traits} onChange={handleChange} required rows="2"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors resize-none" 
              placeholder="e.g., Formal, authoritative, speaks in a commanding tone." />
          </div>

          <div className="pt-4">
            <button type="submit" disabled={isSubmitting}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-sm"
            >
              {isSubmitting ? 'Saving to Database...' : 'Initialize Character Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}