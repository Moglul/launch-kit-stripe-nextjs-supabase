
import React from 'react';
import { FadeIn } from './ui/motion';
import { Check } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: "Free Trial",
      price: "0",
      description: "Test all features for 14 days.",
      features: [
        "1 report per day",
        "Basic voice-to-text",
        "Email support",
      ],
      cta: "Start Your Free Trial",
      highlighted: false,
    },
    {
      name: "Basic Plan",
      price: "29",
      description: "For small teams",
      features: [
        "100 reports per month",
        "Advanced voice recognition",
        "PDF reports generation",
        "Priority email support",
        "Cloud storage (50GB)",
      ],
      cta: "Choose Basic Plan",
      highlighted: true,
    },
    {
      name: "Pro Plan",
      price: "79",
      description: "Advanced features & integrations",
      features: [
        "Unlimited reports",
        "Premium voice recognition",
        "Custom report templates & branding",
        "Priority phone & email support",
        "Cloud storage (100GB)",
      ],
      cta: "Choose Pro Plan",
      highlighted: false,
    },
  ];

  return (
    <section className="section-padding">
      <div className="container-tight">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center border border-zinc-200 rounded-full px-4 py-1 text-sm font-medium text-zinc-600 bg-white mb-4">
              Pricing
            </span>
            <h2 className="mb-4 text-zinc-900">Flexible Pricing for Every Team</h2>
            <p className="text-zinc-500 text-lg">
              Choose the plan that works best for your construction team's needs.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {plans.map((plan, index) => (
            <FadeIn key={index} direction="up" delay={0.1 * index}>
              <div className={`
                rounded-xl overflow-hidden h-full flex flex-col
                ${plan.highlighted 
                  ? 'border-2 border-black shadow-xl relative bg-white' 
                  : 'border border-zinc-100 shadow-subtle bg-white'}
              `}>
                {/* Removed the Most Popular badge */}
                <div className="p-8 bg-zinc-50 border-b border-zinc-100">
                  <h3 className="mb-2 text-zinc-900">{plan.name}</h3>
                  <p className="text-zinc-500 text-sm mb-4">{plan.description}</p>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-zinc-900">${plan.price}</span>
                    <span className="text-zinc-500 ml-2">/month</span>
                  </div>
                </div>
                
                <div className="p-8 flex-grow">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-black mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-zinc-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="p-8 pt-0">
                  <button 
                    className={`w-full ${plan.highlighted 
                      ? "bg-black hover:bg-zinc-800 text-white" 
                      : "border border-zinc-200 text-zinc-600 hover:bg-zinc-50"} px-4 py-2 rounded-md transition-colors`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="bg-zinc-50 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between">
            <div>
              <h4 className="text-zinc-900 mb-2">Enterprise</h4>
              <p className="text-zinc-500">
                Custom solutions for large companies. Contact us for a personalized quote.
              </p>
            </div>
            <button className="bg-black hover:bg-zinc-800 text-white px-4 py-2 rounded-md transition-colors mt-4 md:mt-0">
              Contact Sales
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Pricing;
