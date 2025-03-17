"use client";

import React from 'react';
import { FadeIn, StaggerContainer } from '../../components/ui/motion';
import { ArrowRight, Mic, FileText } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24 bg-white">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 to-transparent -z-10" />
      <div className="container-tight relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <StaggerContainer>
              <FadeIn delay={0.1}>
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-6xl mb-6 text-zinc-900 leading-[1.1]">
                  Effortless Daily Reports for Construction Teams
                </h1>
              </FadeIn>

              <FadeIn delay={0.2}>
                <h3 className="scroll-m-20 text-2xl font-normal tracking-tight mb-8 text-zinc-500">
                  Speak. Review. Submit.
                  <span className="block text-lg font-normal">
                    Turn voice notes into detailed site reports with AI-powered accuracy.
                  </span>
                </h3>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-black hover:bg-zinc-800 text-white px-8">
                    Get Started for Free
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button variant="outline" size="lg" className="border-zinc-200 text-zinc-600 hover:bg-zinc-50">
                    How It Works
                  </Button>
                </div>
              </FadeIn>
            </StaggerContainer>
          </div>

          <FadeIn delay={0.3} direction="left">
            <div className="relative">
              <Card className="overflow-hidden shadow-xl border border-zinc-100">
                <CardContent className="p-0">
                  <div className="aspect-[4/3]">
                    <img
                      src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80"
                      alt="Construction worker using ReportGen"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="absolute -bottom-6 -left-6 w-64 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border border-zinc-100">
                <CardContent className="p-4">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center mr-3 mt-1">
                      <Mic className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">Voice Recording</div>
                      <div className="text-xs text-muted-foreground">Just speak naturally</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="absolute -top-6 -right-6 w-64 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border border-zinc-100">
                <CardContent className="p-4">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center mr-3 mt-1">
                      <FileText className="h-5 w-5 text-zinc-900" />
                    </div>
                    <div>
                      <div className="font-medium">Auto-Generated Report</div>
                      <div className="text-xs text-muted-foreground">Ready in seconds</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default Hero;