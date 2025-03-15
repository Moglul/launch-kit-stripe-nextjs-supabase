
import React from 'react';
import { FadeIn, StaggerContainer } from './ui/motion';
import { Mic, FileText, CheckSquare } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      title: "Speak Your Report",
      description: "Use your phone to describe your daily tasks and observations.",
      icon: <Mic className="h-6 w-6 text-white" />,
      color: "bg-black",
    },
    {
      title: "AI Auto-Fill",
      description: "Our intelligent AI drafts a report, organizing your speech into a structured format.",
      icon: <FileText className="h-6 w-6 text-white" />,
      color: "bg-zinc-800",
    },
    {
      title: "Review & Edit",
      description: "Quickly review the draft, make edits if needed, and finalize your report.",
      icon: <CheckSquare className="h-6 w-6 text-white" />,
      color: "bg-zinc-900",
    },
  ];

  return (
    <section className="section-padding">
      <div className="container-tight">
        <StaggerContainer className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn>
            <h2 className="mb-6 text-zinc-900">How It Works</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-zinc-600 text-lg">
              Three simple steps to transform your daily reporting process
            </p>
          </FadeIn>
        </StaggerContainer>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-[1px] h-[calc(100%-6rem)] bg-zinc-200 hidden md:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 relative">
            {steps.map((step, index) => (
              <FadeIn key={index} direction="up" delay={0.1 * index} className="relative z-10">
                <div className="bg-white rounded-xl p-8 shadow-subtle border border-zinc-100 h-full flex flex-col items-center text-center">
                  <div className={`w-12 h-12 rounded-full ${step.color} flex items-center justify-center mb-6`}>
                    {step.icon}
                  </div>
                  <div className="text-sm font-medium text-zinc-500 mb-3">{`Step ${index + 1}`}</div>
                  <h4 className="text-zinc-900 mb-3">{step.title}</h4>
                  <p className="text-zinc-600">
                    {step.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
