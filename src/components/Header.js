import React from 'react';
import './Header.css'; 

export default function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        {/* Logo can be added here */}
      </div>
      <h1 className="title">
        <span className="bold-title">SoundSearch</span> by Thesara
      </h1>
    </header>
  );
}
