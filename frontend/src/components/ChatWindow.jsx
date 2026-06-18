import React from 'react';

function ChatWindow() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Interview Session</h2>
      <p>Currently interviewing: <strong>[Select Character]</strong></p>
      
      {/* Chat Display Shell */}
      <div style={styles.chatBox}>
        <p style={{ color: '#888' }}>Conversation history will appear here...</p>
      </div>

      {/* Input Shell */}
      <div style={styles.inputArea}>
        <input type="text" placeholder="Ask your character a question..." style={styles.input} />
        <button style={styles.button}>Send</button>
      </div>
    </div>
  );
}

const styles = {
  chatBox: { 
    height: '400px', 
    border: '1px solid #ccc', 
    padding: '1rem', 
    overflowY: 'scroll', 
    marginBottom: '1rem' 
  },
  inputArea: { 
    display: 'flex', 
    gap: '0.5rem' 
  },
  input: { 
    flex: 1, 
    padding: '0.5rem', 
    fontSize: '1rem' 
  },
  button: { 
    padding: '0.5rem 1rem', 
    cursor: 'pointer', 
    backgroundColor: '#28a745', 
    color: 'white', 
    border: 'none',
    fontWeight: 'bold'
  }
};

export default ChatWindow;