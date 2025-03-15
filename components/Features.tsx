
import React from 'react';
import { FadeIn, StaggerContainer } from './ui/motion';
import { Mic, Globe, Smartphone, Cloud, Check } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const Features = () => {
  const features = [
    {
      title: "Voice-to-Report AI",
      description: "Accurate transcription tailored for construction terminology.",
      icon: <Mic className="h-6 w-6 text-white" />,
    },
    {
      title: "Multi-Language Support",
      description: "Report in your preferred language.",
      icon: <Globe className="h-6 w-6 text-white" />,
    },
    {
      title: "Mobile Friendly",
      description: "Report from anywhere – even on-site.",
      icon: <Smartphone className="h-6 w-6 text-white" />,
    },
    {
      title: "Secure Cloud Storage",
      description: "Access reports anytime, from any device.",
      icon: <Cloud className="h-6 w-6 text-white" />,
    },
  ];

  return (
    <section className="py-24 bg-zinc-50">
      <div className="container-tight">
        <StaggerContainer className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn>
            <span className="inline-flex items-center border border-zinc-200 rounded-full px-4 py-1 text-sm font-medium text-zinc-600 bg-white mb-4">
              Features
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight mb-6 text-zinc-900">
              Why Choose Our AI-Powered Reporting Tool?
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-zinc-500">
              Built specifically for the construction industry, our platform streamlines daily reporting with powerful features.
            </p>
          </FadeIn>
        </StaggerContainer>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {features.map((feature, index) => (
            <FadeIn key={index} direction="up" delay={0.1 * index}>
              <Card>
                <CardContent className="p-6 flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                    <div className="text-white">{feature.icon}</div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-zinc-900 mb-2">{feature.title}</h4>
                    <p className="text-zinc-500">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
