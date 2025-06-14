import React from 'react';
import EditorDemo from './pages/DemoPage';
import './App.css';

const App = () => {
  return (
    <div className='app-container'>
      <header className='app-header'>
        <h1 className='app-title'>📝 WYSIWYG Editor Demo</h1>
        <p className='app-subtitle'>
          Built using React + Draft.js (No UI libraries)
        </p>
      </header>

      <main className='app-main'>
        <EditorDemo />
      </main>

      <footer className='app-footer'>
        <div className='footer-info'>
          Created by <strong>Mariam M. Farouk</strong>
        </div>
        <div className='footer-info'>
          🌐 GitHub:{' '}
          <a
            href='https://github.com/Mariam-MF97'
            target='_blank'
            rel='noopener noreferrer'
            className='footer-link'
          >
            github.com/mariamfarouk
          </a>
        </div>
        <div className='footer-info'>
          📧 Email:{' '}
          <a href='mailto:mariam.mu.farouk@gmail.com' className='footer-email'>
            mariam.mu.farouk@gmail.com
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;
