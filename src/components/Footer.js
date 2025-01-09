import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <div>
      <footer className="pb-2 bh pt-5 ">
        <b>© Copyright</b>  | Designed and developed by 
        <br />
        <a className="bh" href="https://www.linkedin.com/in/thesaraks/" style={{ textDecoration: 'none' }}>
          <b>Thesara Subasinghe</b>
        </a>
      </footer>
    </div>
  );
}

