"use client";

import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Hero from './components/Hero';
import Problems from './components/Problems';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from '@/components/Footer';
import Logo from '@/components/Logo';
import UserDropdown from '@/components/UserDropdown';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const [scrolled, setScrolled] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);
  const [prevScrollPos, setPrevScrollPos] = React.useState(0);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setScrolled(currentScrollPos > 20);

      // Show/hide header based on scroll direction
      setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B1120]">
      {/* Navigation */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${
          scrolled ? 'bg-white/95 dark:bg-neutral-darker/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
        } ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Logo />
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Pricing</a>
              <a href="#how-it-works" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">How It Works</a>
              <a href="#faq" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">FAQ</a>
            </nav>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link 
                    href="/dashboard" 
                    className="text-slate-900 dark:text-white hover:text-slate-700 dark:hover:text-slate-300 transition-colors font-medium"
                  >
                    Dashboard
                  </Link>
                  <UserDropdown />
                </div>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    className="hidden md:block text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    Log In
                  </Link>
                  <Link 
                    href="/login" 
                    className="bg-zinc-900 hover:bg-zinc-800 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main>
        <Hero />
        <Problems />
        <div id="how-it-works">
          <HowItWorks />
        </div>
        <div id="features">
          <Features />
        </div>
        <div id="pricing">
          <Pricing />
        </div>
        <div id="faq">
          <FAQ />
        </div>
      </main>

      <Footer />
    </div>
  );
}

