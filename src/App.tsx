import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import Resume from './pages/Resume';
import CoverLetter from './pages/CoverLetter';
import Interviews from './pages/Interviews';
import Coach from './pages/Coach';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/cover-letter" element={<CoverLetter />} />
              <Route path="/interviews" element={<Interviews />} />
              <Route path="/coach" element={<Coach />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;