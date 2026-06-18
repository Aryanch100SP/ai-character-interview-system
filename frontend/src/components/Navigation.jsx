import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav style={styles.nav}>
      <h2>AI Character Engine</h2>
      <ul style={styles.navLinks}>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/chat">Interview Chat</Link></li>
      </ul>
    </nav>
  );
}

const styles = {
  nav: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    padding: '1rem', 
    backgroundColor: '#282c34', 
    color: 'white' 
  },
  navLinks: { 
    listStyle: 'none', 
    display: 'flex', 
    gap: '1rem' 
  }
};

export default Navigation;