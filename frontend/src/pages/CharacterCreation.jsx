import React, { useState } from 'react';

export default function CreateCharacter() {
  const [formData, setFormData] = useState({
    name: '',
    short_description: '',
    backstory: '',
    personality_traits: '',
    occupation: '',
    goals: '',
    core_values: '',
    fears: '',
    speaking_style: '',
    knowledge_boundaries: '',
    relationships: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // NOTE: Ensure this URL matches your actual deployed backend URL or local dev environment
      const response = await fetch('/api/characters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        alert("Character successfully deployed to the AI Engine!");
        // Reset form or redirect to dashboard here
        window.location.href = '/dashboard'; 
      } else {
        alert("Failed to create character. Check console for errors.");
      }
    } catch (error) {
      console.error("Error creating character", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-xl mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">Deploy a New AI Persona</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* SECTION 1: Basic Identity */}
        <div className="bg-gray-800 p-4 rounded border border-gray-700">
          <h3 className="text-xl font-semibold mb-4 text-gray-300">1. Basic Identity</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" placeholder="Character Name (e.g., Julian Thorne)" onChange={handleChange} required className="w-full bg-gray-700 border border-gray-600 rounded p-3 text-white focus:outline-none focus:border-blue-500" />
            <input name="occupation" placeholder="Occupation / Role (e.g., Veteran Theatre Actor)" onChange={handleChange} required className="w-full bg-gray-700 border border-gray-600 rounded p-3 text-white focus:outline-none focus:border-blue-500" />
            <input name="short_description" placeholder="Tagline (e.g., An eccentric actor who refuses to break character)" onChange={handleChange} required className="w-full bg-gray-700 border border-gray-600 rounded p-3 text-white focus:outline-none focus:border-blue-500 md:col-span-2" />
          </div>
        </div>

        {/* SECTION 2: Deep Psychology */}
        <div className="bg-gray-800 p-4 rounded border border-gray-700">
          <h3 className="text-xl font-semibold mb-4 text-gray-300">2. Deep Psychology & Lore</h3>
          <div className="space-y-4">
            <textarea name="backstory" placeholder="Backstory & Biography: Where did they come from? What defines their past?" onChange={handleChange} required className="w-full bg-gray-700 border border-gray-600 rounded p-3 text-white h-24 focus:outline-none focus:border-blue-500" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <textarea name="personality_traits" placeholder="General Personality Traits (e.g., Stubborn, highly articulate, easily offended)" onChange={handleChange} required className="w-full bg-gray-700 border border-gray-600 rounded p-3 text-white h-20 focus:outline-none focus:border-blue-500" />
              <textarea name="goals" placeholder="Goals & Motivations (e.g., To deliver one last perfect performance)" onChange={handleChange} required className="w-full bg-gray-700 border border-gray-600 rounded p-3 text-white h-20 focus:outline-none focus:border-blue-500" />
              <textarea name="core_values" placeholder="Core Values (e.g., Artistic integrity, vulnerability)" onChange={handleChange} required className="w-full bg-gray-700 border border-gray-600 rounded p-3 text-white h-20 focus:outline-none focus:border-blue-500" />
              <textarea name="fears" placeholder="Deepest Fears (e.g., Being forgotten, losing touch with reality)" onChange={handleChange} required className="w-full bg-gray-700 border border-gray-600 rounded p-3 text-white h-20 focus:outline-none focus:border-blue-500" />
            </div>
          </div>
        </div>

        {/* SECTION 3: AI Generation Constraints */}
        <div className="bg-gray-800 p-4 rounded border border-gray-700">
          <h3 className="text-xl font-semibold mb-4 text-gray-300">3. Engine Constraints</h3>
          <div className="space-y-4">
            <textarea name="speaking_style" placeholder="Speaking Style: How do they talk? (e.g., Highly dramatic, poetic, uses sweeping hand gestures in asterisks)" onChange={handleChange} required className="w-full bg-gray-700 border border-gray-600 rounded p-3 text-white h-20 focus:outline-none focus:border-blue-500" />
            <textarea name="knowledge_boundaries" placeholder="Knowledge Boundaries: What do they NOT know? (e.g., Cannot grasp modern technology or finances)" onChange={handleChange} required className="w-full bg-gray-700 border border-gray-600 rounded p-3 text-white h-20 focus:outline-none focus:border-blue-500" />
            <textarea name="relationships" placeholder="Relationships: How do they treat the user/interviewer? (e.g., Treats the user as an audience member)" onChange={handleChange} required className="w-full bg-gray-700 border border-gray-600 rounded p-3 text-white h-20 focus:outline-none focus:border-blue-500" />
          </div>
        </div>
        
        <button 
          type="submit" 
          disabled={isSubmitting}
          className={`w-full font-bold py-4 px-4 rounded text-lg transition-all ${
            isSubmitting ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white'
          }`}
        >
          {isSubmitting ? 'Deploying to Database...' : 'Initialize Character Profile'}
        </button>
      </form>
    </div>
  );
}