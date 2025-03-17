"use client";

import React from 'react';
import { FadeIn, StaggerContainer } from './ui/motion';
import { Clock, Zap, CheckCircle } from 'lucide-react';

const Problems = () => {
  return (
    <section className="section-padding bg-zinc-50">
      <div className="container-tight">
        <StaggerContainer className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn>
            <h2 className="mb-6 text-zinc-900 text-3xl font-semibold">Tired of Spending Hours on Daily Reports?</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-zinc-500 text-lg md:text-xl">
              Manual reporting is time-consuming and prone to errors. Our AI-driven platform lets you dictate your daily site activities, converting your speech into a draft report ready for review.
            </p>
          </FadeIn>
        </StaggerContainer>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <FadeIn direction="up" delay={0.1}>
            <div className="bg-white rounded-xl p-8 shadow-lg border border-zinc-200 h-full">
              <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center mb-6">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-zinc-900 mb-3 font-semibold">Save Time</h4>
              <p className="text-zinc-500">
                Dictate reports on the go, no more manual typing. Reduce report creation time by up to 70%.
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <div className="bg-white rounded-xl p-8 shadow-lg border border-zinc-200 h-full">
              <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-zinc-900 mb-3 font-semibold">Boost Accuracy</h4>
              <p className="text-zinc-500">
                AI captures all details, reducing errors. Our smart system ensures nothing is missed in your reports.
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.3}>
            <div className="bg-white rounded-xl p-8 shadow-lg border border-zinc-200 h-full">
              <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center mb-6">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-zinc-900 mb-3 font-semibold">Easy Review & Edit</h4>
              <p className="text-zinc-500">
                Make quick adjustments before submission. Full control over the final report with intuitive editing tools.
              </p>
            </div>
          </FadeIn>
        </div>

        <FadeIn>
          <div className="text-center">
            <button className="bg-black hover:bg-zinc-800 text-white px-8 py-3 rounded-md font-medium transition-colors">
              Try It Now - Free Trial Available
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Problems;