import express from 'express';
import pool from '../db.js';
const router = express.Router();

// GET A SINGLE CHARACTER BY ID (For the Chat Room header)
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
    console.error("Fetch Single Character Error:", err.message);
    res.status(500).json({ error: "Failed to fetch character details" });
  }
});

// 1. Save character to database
router.post('/', async (req, res) => {
  try {
    const { name, short_description, backstory, personality_traits } = req.body;
    const creator_id = '00000000-0000-0000-0000-000000000000'; 
    const newCharacter = await pool.query(
      'INSERT INTO characters (creator_id, name, short_description, backstory, personality_traits) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [creator_id, name, short_description, backstory, personality_traits]
    );
    res.status(201).json(newCharacter.rows[0]);
  } catch (err) {
    console.error("Database Save Error:", err.message);
    res.status(500).json({ error: "Failed to save character to database" });
  }
});

// 2. GET ALL CHARACTERS FOR THE DASHBOARD
router.get('/', async (req, res) => {
  try {
    const allCharacters = await pool.query(
      'SELECT id, name, short_description, backstory, personality_traits FROM characters ORDER BY created_at DESC'
    );
    res.status(200).json(allCharacters.rows);
  } catch (err) {
    console.error("Database Fetch Error:", err.message);
    res.status(500).json({ error: "Failed to retrieve characters from database" });
  }
});

// 3. CHAT WITH CHARACTER (Bridge to Python AI Engine)
router.post('/:id/chat', async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const characterResult = await pool.query(
      'SELECT name, backstory, personality_traits FROM characters WHERE id = $1',
      [id]
    );

    if (characterResult.rows.length === 0) {
      return res.status(404).json({ error: "Character not found" });
    }
    const character = characterResult.rows[0];

    const pythonResponse = await fetch('https://ai-engine-service-frmb.onrender.com/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        character_name: character.name,
        backstory: character.backstory,
        personality_traits: character.personality_traits,
        message: message
      }),
    });

    if (!pythonResponse.ok) throw new Error("Python AI engine failed to process request");
    const aiData = await pythonResponse.json();
    res.status(200).json({ response: aiData.response });
  } catch (err) {
    console.error("Chat routing error:", err.message);
    res.status(500).json({ error: "Server error during AI generation loop" });
  }
});

// THE EXPORT MUST BE AT THE VERY BOTTOM
export default router;