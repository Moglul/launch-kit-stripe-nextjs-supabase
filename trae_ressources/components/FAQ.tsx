
import React, { useState } from 'react';
import { FadeIn } from './ui/motion';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Is my data secure?",
      answer: "Yes, we use industry-standard encryption to protect your data. All reports and voice recordings are stored securely, and we follow strict data protection protocols. Your data is never shared with third parties without your explicit consent."
    },
    {
      question: "Can I edit the AI-generated report?",
      answer: "Absolutely! Our platform allows you to review and enhance the AI-generated reports as needed. Simply review the draft, make any necessary edits or additions, and then finalize your report."
    },
    {
      question: "Is there a mobile app?",
      answer: "Yes, our mobile app is available on both iOS and Android platforms. The app allows you to record voice notes, review and edit reports, and submit them from anywhere, making it perfect for on-site reporting."
    },
    {
      question: "What languages are supported?",
      answer: "Our platform currently supports English, Spanish, French, German, and Portuguese. We're continuously adding support for additional languages to serve our global user base better."
    },
    {
      question: "How accurate is the voice recognition?",
      answer: "Our voice recognition technology is specifically trained on construction terminology and has a 98% accuracy rate in field testing. The system continues to learn and improve with use, becoming more accurate with your specific vocabulary over time."
    }
  ];

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section-padding">
      <div className="container-tight">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center border border-zinc-200 rounded-full px-4 py-1 text-sm font-medium text-zinc-600 bg-white mb-4">
              Support
            </span>
            <h2 className="mb-4 text-zinc-900">Frequently Asked Questions</h2>
            <p className="text-zinc-500 text-lg">
              Find answers to common questions about our AI-powered reporting platform.
            </p>
          </div>
        </FadeIn>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FadeIn key={index} delay={0.1 * index}>
              <div className="mb-4 border border-zinc-100 rounded-lg overflow-hidden">
                <button
                  className="w-full text-left p-5 flex justify-between items-center bg-white hover:bg-zinc-50 transition-colors"
                  onClick={() => toggleQuestion(index)}
                >
                  <h4 className="text-zinc-900 font-medium">{faq.question}</h4>
                  <ChevronDown 
                    className={`h-5 w-5 text-zinc-500 transition-transform duration-200 ${
                      openIndex === index ? 'transform rotate-180' : ''
                    }`} 
                  />
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="p-5 pt-0 text-zinc-600 bg-white">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <div className="bg-zinc-50 rounded-xl p-8 mt-12 text-center max-w-3xl mx-auto">
            <h4 className="text-zinc-900 mb-3">Still have questions?</h4>
            <p className="text-zinc-500 mb-6">
              Our support team is ready to help you with any questions you might have.
            </p>
            <button className="bg-black hover:bg-zinc-800 text-white px-4 py-2 rounded-md transition-colors">
              Contact Support
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default FAQ;
