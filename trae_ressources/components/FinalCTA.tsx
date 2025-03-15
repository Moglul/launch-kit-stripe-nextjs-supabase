
import React from 'react';
import { FadeIn } from './ui/motion';
import { ArrowRight } from 'lucide-react';

const FinalCTA = () => {
  return (
    <section className="section-padding bg-primary text-white">
      <div className="container-tight">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="mb-6">Ready to Simplify Your Reporting?</h2>
          </FadeIn>
          
          <FadeIn delay={0.1}>
            <p className="text-white/80 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Stop wasting hours on paperwork. Start speaking your reports today!
            </p>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary hover:bg-white/90 font-medium py-3 px-8 rounded-md inline-flex items-center transition-all group">
                <span>Get Started – Free Trial</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button className="border border-white/30 bg-transparent hover:bg-white/10 text-white font-medium py-3 px-8 rounded-md inline-flex items-center transition-all">
                <span>Schedule a Demo</span>
              </button>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.3} className="mt-12">
            <div className="flex flex-wrap justify-center gap-8">
              {['5,000+', '98%', '70%'].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold">{stat}</div>
                  <div className="text-white/70 text-sm">
                    {index === 0 ? 'Active Users' : index === 1 ? 'Accuracy Rate' : 'Time Saved'}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
