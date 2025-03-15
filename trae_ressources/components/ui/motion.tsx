
import React, { useState, useEffect, useRef } from 'react';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  threshold?: number;
}

export const FadeIn = ({
  children,
  delay = 0,
  duration = 0.5,
  className = '',
  direction = 'up',
  distance = 24,
  threshold = 0.1,
}: FadeInProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (domRef.current) {
              observer.unobserve(domRef.current);
            }
          }
        });
      },
      { threshold }
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  const getDirectionStyles = () => {
    if (direction === 'none') return {};
    
    const directionMap = {
      up: { transform: `translateY(${distance}px)` },
      down: { transform: `translateY(-${distance}px)` },
      left: { transform: `translateX(${distance}px)` },
      right: { transform: `translateX(-${distance}px)` },
    };

    return directionMap[direction];
  };

  const style = {
    opacity: 0,
    transition: `opacity ${duration}s ease-out ${delay}s, transform ${duration}s ease-out ${delay}s`,
    ...getDirectionStyles(),
    ...(isVisible && {
      opacity: 1,
      transform: 'translate(0, 0)',
    }),
  };

  return (
    <div ref={domRef} style={style} className={className}>
      {children}
    </div>
  );
};

export const StaggerContainer = ({ 
  children, 
  className = '',
  staggerDelay = 0.1,
  initialDelay = 0 
}: { 
  children: React.ReactNode; 
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
}) => {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        
        return React.cloneElement(child as React.ReactElement<FadeInProps>, {
          delay: initialDelay + index * staggerDelay,
        });
      })}
    </div>
  );
};

export const ParallaxScroll = ({ 
  children, 
  speed = 0.5,
  className = '' 
}: { 
  children: React.ReactNode; 
  speed?: number;
  className?: string;
}) => {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const { top } = ref.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      if (top < windowHeight && top > -ref.current.offsetHeight) {
        const newOffset = (windowHeight - top) * speed;
        setOffset(newOffset);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  const style = {
    transform: `translateY(${offset * -0.1}px)`,
    transition: 'transform 0.1s ease-out',
  };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
};
