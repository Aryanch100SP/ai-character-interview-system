import express from 'express';
import pool from '../db.js';

const router = express.Router();

// 1. CREATE a New Character
// When the React form submits, it sends data here to be saved in PostgreSQL.
router.post('/', async (req, res) => {
  try {
    const { name, short_description, backstory, personality_traits } = req.body;

    // A fake creator_id for now, until we build a user login system
    const defaultCreatorId = '00000000-0000-0000-0000-000000000000'; 

    const newCharacter = await pool.query(
      `INSERT INTO characters (creator_id, name, short_description, backstory, personality_traits) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [defaultCreatorId, name, short_description, backstory, personality_traits]
    );

    res.status(201).json(newCharacter.rows[0]);
  } catch (err) {
    console.error("Error creating character:", err.message);
    res.status(500).json({ error: "Server error while creating character" });
  }
});

// 2. GET All Characters
// The React Dashboard will call this to display the character cards.
router.get('/', async (req, res) => {
  try {
    const allCharacters = await pool.query(
      'SELECT * FROM characters ORDER BY created_at DESC'
    );
    res.status(200).json(allCharacters.rows);
  } catch (err) {
    console.error("Error fetching characters:", err.message);
    res.status(500).json({ error: "Server error while fetching characters" });
  }
});

export default router;
// 3. GET a Single Character by ID
// The Chat Room will call this to load the specific character you are interviewing.
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const character = await pool.query(
      'SELECT * FROM characters WHERE id = $1',
      [id]
    );
    
    if (character.rows.length === 0) {
      return res.status(404).json({ error: "Character not found" });
    }
    
    res.status(200).json(character.rows[0]);
  } catch (err) {
    console.error("Error fetching character:", err.message);
    res.status(500).json({ error: "Server error while fetching character" });
  }
  // 4. CHAT WITH CHARACTER (Bridge to Python AI Engine)
router.post('/:id/chat', async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;

    // 1. Fetch character's specific traits and backstory from Neon Cloud DB
    const characterResult = await pool.query(
      'SELECT name, backstory, personality_traits FROM characters WHERE id = $1',
      [id]
    );

    if (characterResult.rows.length === 0) {
      return res.status(404).json({ error: "Character not found" });
    }

    const character = characterResult.rows[0];

    // 2. Safely forward this data to your Python FastAPI server running on Render
    const pythonResponse = await fetch('https://ai-engine-service-frmb.onrender.com/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        character_name: character.name,
        backstory: character.backstory,
        personality_traits: character.personality_traits,
        message: message
      }),
    });

    if (!pythonResponse.ok) {
      throw new Error("Python AI engine failed to process request");
    }

    const aiData = await pythonResponse.json();
    
    // 3. Return the dynamic Gemini response back to the React UI
    res.status(200).json({ response: aiData.response });

  } catch (err) {
    console.error("Chat routing error:", err.message);
    res.status(500).json({ error: "Server error during AI generation loop" });
  }
});
});