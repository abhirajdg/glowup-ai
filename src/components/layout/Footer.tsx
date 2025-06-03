import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Sparkles } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles size={24} className="text-primary" />
              <span className="text-xl font-bold font-space-grotesk bg-gradient-to-r from-primary via-accent-pink to-accent-blue bg-clip-text text-transparent">
                GlowUp.AI
              </span>
            </div>
            <p className="text-gray-400 mb-4 font-satoshi">
              ✨ From 'who dis?' to 'you're hired' - Your AI-powered career glow up starts here.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/abhirajdg/glowup-ai" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-accent-lime transition-colors"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/in/abhirajdg" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-accent-lime transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <p className="text-gray-400 text-center font-satoshi">
            &copy; {new Date().getFullYear()} GlowUp.AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;