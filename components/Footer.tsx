
import React from 'react';
import { FadeIn } from './ui/motion';
import { Linkedin, Facebook, Twitter, Mail, Phone } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-zinc-900 text-white pt-16 pb-8">
      <div className="container-tight">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <FadeIn>
            <div>
              <Logo />
              <p className="mt-4 text-zinc-400 text-sm">
                Transforming construction reporting with AI-powered voice technology. Save time and increase accuracy.
              </p>
              <div className="flex space-x-4 mt-6">
                <a href="#" className="text-zinc-400 hover:text-white transition-colors" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-zinc-400 hover:text-white transition-colors" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-zinc-400 hover:text-white transition-colors" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.1}>
            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2">
                {['About Us', 'Features', 'Pricing', 'Blog', 'Careers'].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <div>
              <h5 className="font-semibold mb-4">Resources</h5>
              <ul className="space-y-2">
                {['Help Center', 'Documentation', 'Tutorials', 'Case Studies', 'Webinars'].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.3}>
            <div>
              <h5 className="font-semibold mb-4">Contact Us</h5>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Mail className="h-5 w-5 text-zinc-400 mr-3 mt-0.5" />
                  <a href="mailto:info@reportgen.com" className="text-zinc-400 hover:text-white transition-colors">
                    info@reportgen.com
                  </a>
                </li>
                <li className="flex items-start">
                  <Phone className="h-5 w-5 text-zinc-400 mr-3 mt-0.5" />
                  <a href="tel:+15555555555" className="text-zinc-400 hover:text-white transition-colors">
                    +1 (555) 555-5555
                  </a>
                </li>
              </ul>
              <div className="mt-6">
                <button className="border border-white/20 bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors">
                  Contact Sales
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
        
        <FadeIn>
          <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center">
            <div className="text-zinc-500 text-sm mb-4 md:mb-0">
              © {currentYear} ReportGen – All Rights Reserved
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-zinc-500 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
};

export default Footer;
