
import React, { useState } from 'react';
import { FadeIn } from './ui/motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Image from "next/image";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Reporting used to take hours. Now, I just speak and review. It's that simple!",
      author: "Sarah Johnson",
      position: "Site Manager, XYZ Construction",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
    },
    {
      quote: "Accurate and efficient. A game-changer for our daily operations.",
      author: "Michael Chen",
      position: "Project Lead, ABC Builders",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100",
    },
    {
      quote: "The voice recognition is incredibly accurate, even with construction terminology.",
      author: "Emily Rodriguez",
      position: "Operations Director, BuildRight Inc.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100",
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="section-padding bg-construction-800 text-white">
      <div className="container-tight">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="chip bg-white/10 text-white mb-4">Testimonials</div>
            <h2 className="mb-4">Trusted by Construction Teams Worldwide</h2>
            <p className="text-construction-300 max-w-2xl mx-auto">
              Hear from professionals who have transformed their reporting process with our solution.
            </p>
          </div>
        </FadeIn>

        <div className="max-w-4xl mx-auto">
          <FadeIn key={currentIndex}>
            <div className="bg-construction-700/50 rounded-xl p-8 md:p-12 border border-construction-600/30 relative">
              <Quote className="absolute top-8 left-8 h-12 w-12 text-primary/20" />
              
              <div className="text-center">
                <blockquote className="text-xl md:text-2xl mb-8 relative z-10">
                  "{testimonials[currentIndex].quote}"
                </blockquote>
                
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white mr-4">
                    <Image 
                      src={testimonials[currentIndex].avatar}
                      alt={testimonials[currentIndex].author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-lg">{testimonials[currentIndex].author}</div>
                    <div className="text-construction-300">{testimonials[currentIndex].position}</div>
                  </div>
                </div>
                
                <div className="flex justify-center space-x-4">
                  <button 
                    onClick={prevTestimonial}
                    className="p-2 rounded-full bg-construction-600/30 hover:bg-construction-600/50 transition-colors"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={nextTestimonial}
                    className="p-2 rounded-full bg-construction-600/30 hover:bg-construction-600/50 transition-colors"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
