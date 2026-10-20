import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import NodeBackground from './components/NodeBackground';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';

function App() {
  const [view, setView] = useState('home');

  return (
    <div className="app-container">
      <NodeBackground />
      
      <main className="content-wrapper">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Hero onViewChange={setView} />
              <Skills />
              <Contact />
            </motion.div>
          )}

          {view === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Projects onBack={() => setView('home')} />
            </motion.div>
          )}

          {view === 'certs' && (
            <motion.div
              key="certs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Certifications onBack={() => setView('home')} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
