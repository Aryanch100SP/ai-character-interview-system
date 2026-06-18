import React, { useState } from 'react';

function Dashboard() {
  // Centralized state management for the character form
  const [characterData, setCharacterData] = useState({
    name: '',
    shortDescription: '',
    backstory: '',
    personalityTraits: ''
  });

  // Dynamically update the correct field as the user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCharacterData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle the submission
  const handleSave = (e) => {
    e.preventDefault();
    
    // For Week 2, we just log this to the console to prove state management works.
    // In Week 3, this will be replaced with an API POST request to your Node.js backend.
    console.log("Character Ready for DB Integration:", characterData);
    alert(`Successfully captured data for ${characterData.name}! Check your browser's Developer Console.`);
    
    // Optional: Clear the form after saving
    setCharacterData({ name: '', shortDescription: '', backstory: '', personalityTraits: '' });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard: Character Management</h1>
      
      <form onSubmit={handleSave} style={styles.card}>
        <h3>Create New Character</h3>
        
        <input 
            type="text" 
            name="name"
            placeholder="Character Name" 
            value={characterData.name}
            onChange={handleChange}
            style={styles.input}
            required
        />
        
        <input 
            type="text"
            name="shortDescription"
            placeholder="Short Description (e.g., A wise elder from the village)" 
            value={characterData.shortDescription}
            onChange={handleChange}
            style={styles.input}
            required
        />
        
        <textarea 
            name="backstory"
            placeholder="Detailed Backstory..." 
            value={characterData.backstory}
            onChange={handleChange}
            style={styles.textarea}
            required
        />
        
        <textarea 
            name="personalityTraits"
            placeholder="Personality Traits (e.g., stubborn, highly observant, speaks in metaphors)..." 
            value={characterData.personalityTraits}
            onChange={handleChange}
            style={styles.textarea}
            required
        />
        
        <button type="submit" style={styles.button}>Save Character</button>
      </form>
    </div>
  );
}

const styles = {
  card: { marginTop: '2rem', padding: '1rem', border: '1px dashed #ccc', display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '500px' },
  input: { padding: '0.5rem', fontSize: '1rem', fontFamily: 'inherit' },
  textarea: { padding: '0.5rem', fontSize: '1rem', minHeight: '80px', fontFamily: 'inherit' },
  button: { padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', fontWeight: 'bold' }
};

export default Dashboard;