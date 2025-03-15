
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '@/trae_ressources/components/Hero';
import Problem from '@/components/Problems';
import HowItWorks from '@/trae_ressources/components/HowItWorks';
import Features from '@/components/Features';
import Pricing from '@/trae_ressources/components/Pricing';
import FAQ from '@/trae_ressources/components/FAQ';
import Footer from '@/trae_ressources/components/Footer';
import Logo from '@/trae_ressources/components/Logo';
import UserDropdown from '@/components/UserDropdown';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

const Index = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView();
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}>
        <div className="container-tight py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Logo />
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-zinc-600 hover:text-zinc-900 transition-colors">Features</a>
              <a href="#pricing" className="text-zinc-600 hover:text-zinc-900 transition-colors">Pricing</a>
              <a href="#how-it-works" className="text-zinc-600 hover:text-zinc-900 transition-colors">How It Works</a>
              <a href="#faq" className="text-zinc-600 hover:text-zinc-900 transition-colors">FAQ</a>
            </nav>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link to="/dashboard" className="text-zinc-900 hover:text-zinc-700 transition-colors font-medium">
                    Dashboard
                  </Link>
                  <UserDropdown />
                </div>
              ) : (
                <>
                  <Link to="/auth" className="hidden md:block text-zinc-600 hover:text-zinc-900 transition-colors">
                    Log In
                  </Link>
                  <Link to="/auth" className="bg-zinc-900 hover:bg-zinc-800 text-white px-4 py-2 rounded-md text-sm">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main>
        <Hero />
        <Problem />
        <div id="how-it-works">
          <HowItWorks />
        </div>
        {/* <Testimonials /> */}
        <div id="features">
          <Features />
        </div>
        {/* <Demo /> */}
        <div id="pricing">
          <Pricing />
        </div>
        <div id="faq">
          <FAQ />
        </div>
        {/* <FinalCTA /> */}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
