import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importa Router, Routes e Route
import { AuthProvider } from './AuthProvider/authProvider';
import CustomNavbar from './Navbar/Navbar';
import HeroSection from './Hero/HeroSection';
import Services from './services/Services';
import RepairerList from './repairerCard/RepairerListOfCard';
import RepairForm from './RequestReparationPage/RepairForm';
import Footer from './Footer/Footer';
import Login from "./Login/login";
import About from "./About/about";
import UserDashboard from './Dashboard/UserDashboard'; // Importa UserDashboard
import RepairerDashboard from './Dashboard/RepairerDashboard'; // Importa RepairerDashboard
import './App.css'

function App() {
  const [showRepairForm, setShowRepairForm] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [visibleSection, setVisibleSection] = useState('hero'); // Stato per gestire la sezione visibile

  const toggleRepairForm = () => {
    setShowRepairForm(!showRepairForm);
  };

  const toggleLogin = () => setShowLogin(!showLogin);

  const showSection = (section) => {
    setVisibleSection(section);
  };

  return (
      <AuthProvider>
        <Router>
          <CustomNavbar onRepairClick={toggleRepairForm} onLoginClick={toggleLogin} showSection={showSection} />
          <Routes>
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/repairer-tasks" element={<RepairerDashboard />} />
            <Route path="/" element={
              <>
                {visibleSection === 'hero' && <HeroSection />}
                {visibleSection === 'about' && <About />}
                {visibleSection === 'services' && <Services />}
                {visibleSection === 'repairers' && <RepairerList />}
                {showRepairForm && <RepairForm />}
              </>
            } />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
  );
}

export default App;