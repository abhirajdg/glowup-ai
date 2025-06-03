import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { name: 'Personal Branding', path: '/portfolio' },
    { name: 'Resume', path: '/resume' },
    { name: 'Cover Letter', path: '/cover-letter' },
    { name: 'Interviews', path: '/interviews' },
    { name: 'Career Coach', path: '/coach' },
    { name: 'Job Search', path: 'https://amazing-mermaid-6a7b20.netlify.app' },
  ];

  const navbarClasses = `
    fixed top-0 left-0 right-0 z-50 transition-all duration-300
    ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'}
  `;

  return (
    <header className={navbarClasses}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 10 }}
              className="text-primary"
            >
              <Sparkles size={28} />
            </motion.div>
            <span className="text-xl font-bold font-space-grotesk bg-gradient-to-r from-primary via-accent-pink to-accent-blue bg-clip-text text-transparent">
              GlowUp.AI
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                target={link.path.startsWith('http') ? '_blank' : undefined}
                rel={link.path.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`text-sm font-medium transition-colors hover:text-accent-lime ${
                  location.pathname === link.path
                    ? 'text-primary'
                    : 'text-secondary-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden rounded-md p-2 text-secondary-700 hover:bg-primary/10"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-white"
        >
          <div className="px-4 pt-2 pb-4 space-y-1 sm:px-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                target={link.path.startsWith('http') ? '_blank' : undefined}
                rel={link.path.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.path
                    ? 'bg-primary/10 text-primary'
                    : 'text-secondary-800 hover:bg-primary/5'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;