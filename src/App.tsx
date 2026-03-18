/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import TranslationPage from './pages/TranslationPage';
import DevelopmentPage from './pages/DevelopmentPage';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-bg-primary text-text-default selection:bg-brand-default selection:text-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/translation" element={<TranslationPage />} />
            <Route path="/development" element={<DevelopmentPage />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        
        <footer className="border-t border-border-default py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-brand-default font-bold text-xl tracking-tighter">BILLY.</div>
            <div className="text-text-secondary text-sm">
              © {new Date().getFullYear()} Billy. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm font-medium text-text-secondary">
              <a href="#" className="hover:text-text-default transition-colors">Twitter</a>
              <a href="#" className="hover:text-text-default transition-colors">GitHub</a>
              <a href="#" className="hover:text-text-default transition-colors">Email</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}
