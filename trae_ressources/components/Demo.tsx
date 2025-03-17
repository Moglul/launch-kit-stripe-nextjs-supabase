
import React, { useState } from 'react';
import { FadeIn } from './ui/motion';
import { Play, Pause } from 'lucide-react';
import Image from "next/image";

const Demo = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="section-padding bg-construction-50">
      <div className="container-tight">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="chip mb-4">Video Demo</div>
            <h2 className="mb-4 text-construction-700">See It in Action!</h2>
            <p className="text-construction-500 text-lg">
              Watch how our AI transforms voice notes into polished construction reports.
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="relative rounded-xl overflow-hidden shadow-xl border border-white">
            <div className="aspect-video bg-construction-200 relative">
              <Image
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80"
                alt="Demo video thumbnail"
                className="w-full h-full object-cover"
              />
              
              {/* Video overlay */}
              <div className="absolute inset-0 bg-construction-900/30 flex items-center justify-center">
                <button 
                  onClick={togglePlay}
                  className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/30"
                >
                  {isPlaying ? (
                    <Pause className="h-8 w-8 text-primary" />
                  ) : (
                    <Play className="h-8 w-8 text-primary ml-1" />
                  )}
                </button>
              </div>
            </div>

            {/* Video controls */}
            <div className="bg-white p-4 flex items-center">
              <div className="w-full bg-construction-100 h-1 rounded-full overflow-hidden">
                <div 
                  className="bg-primary h-full rounded-full" 
                  style={{ width: isPlaying ? '35%' : '0%', transition: 'width 0.3s ease' }}
                />
              </div>
              <div className="ml-4 text-sm text-construction-500 whitespace-nowrap">
                {isPlaying ? '1:45 / 5:00' : '0:00 / 5:00'}
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="mt-12 text-center">
          <FadeIn>
            <button className="btn-primary">
              Schedule a Live Demo
            </button>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default Demo;
