import React, { useEffect, useMemo } from "react";
import { DetailedServicePage } from "../types";

interface ServiceLandingPageProps {
  config: DetailedServicePage;
}

const renderRichContent = (content: string) => {
  return content.split(/\n\n+/).map((block, index) => {
    if (block.startsWith("### ")) {
      return (
        <h3 key={index} className="font-display text-2xl font-bold text-slate-900 mt-10 mb-4">
          {block.replace("### ", "")}
        </h3>
      );
    }

    if (block.startsWith("## ")) {
      return (
        <h2 key={index} className="font-display text-3xl font-bold text-slate-900 mt-12 mb-5">
          {block.replace("## ", "")}
        </h2>
      );
    }

    if (block.trim().startsWith("- ")) {
      return (
        <ul key={index} className="list-disc pl-6 space-y-3 text-slate-600 text-sm sm:text-base leading-relaxed">
          {block.trim().split(/\n/).map((item, itemIndex) => (
            <li key={itemIndex}>{item.replace(/^-\s+/, "")}</li>
          ))}
        </ul>
      );
    }

    return (
      <p key={index} className="text-slate-600 text-sm sm:text-base leading-relaxed" style={{ whiteSpace: "pre-wrap" }}>
        {block.replace(/\*\*/g, "")}
      </p>
    );
  });
};

export default function ServiceLandingPage({ config }: ServiceLandingPageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const serviceUrl = typeof window !== "undefined" ? window.location.href : "";

  const serviceSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": config.pageTitle,
    "serviceType": config.headline,
    "description": config.description,
    "url": serviceUrl,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Kshetrajna Technologies LLP",
      "image": "https://kshetrajna-technologies.up.railway.app/KT.png",
      "telephone": "+91 8849181691",
      "email": "kshetrajnatechnologies@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "323/1 - 37, Bhaktinagar-1, Bhabhan Road, Malani Vadi",
        "addressLocality": "Botad",
        "addressRegion": "Gujarat",
        "postalCode": "364710",
        "addressCountry": "IN"
      },
      "url": "https://kshetrajna-technologies.up.railway.app"
    },
    "areaServed": "Gujarat, India",
    "audience": {
      "@type": "BusinessAudience",
      "geographicArea": {
        "@type": "GeoShape",
        "address": "Gujarat, India"
      }
    }
  }), [config, serviceUrl]);

  const faqSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": config.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }), [config.faqs]);

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen py-16" id="service-landing-page">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.28em] text-blue-700 font-bold mb-3">Dedicated Service Page</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-tight">
            {config.headline}
          </h1>
          <p className="mt-6 text-slate-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            {config.subtitle}
          </p>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div className="space-y-8">
            <article className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">About this service</h2>
              <p className="text-slate-600 leading-relaxed">
                {config.description}
              </p>
            </article>

            <article className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
              <div className="prose prose-slate max-w-none text-slate-700">
                {renderRichContent(config.fullContent)}
              </div>
            </article>

            <article className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">What we build</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {config.services.map((item, index) => (
                  <div key={index} className="rounded-3xl border border-slate-200 p-5 bg-slate-50">
                    <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">How we deliver</h2>
              <ol className="list-decimal pl-6 space-y-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                {config.process.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ol>
            </article>

            <article className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Frequently Asked Questions</h2>
              <div className="space-y-5">
                {config.faqs.map((faq, index) => (
                  <div key={index} className="rounded-3xl border border-slate-200 p-5 bg-slate-50">
                    <p className="font-semibold text-slate-900">{faq.question}</p>
                    <p className="text-slate-600 text-sm leading-relaxed mt-2">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <aside className="space-y-8">
            <div className="bg-blue-700 text-white rounded-3xl p-8 shadow-lg">
              <p className="text-xs uppercase tracking-[0.3em] font-semibold text-blue-100 opacity-90">Why choose us</p>
              <h3 className="mt-4 text-2xl font-bold leading-tight">High-impact delivery</h3>
              <p className="mt-4 text-slate-100 leading-relaxed text-sm">
                We build service-specific solutions with faster decision cycles and practical business alignment for local customers.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Page highlights</h3>
              <ul className="space-y-3">
                {config.highlights.map((item, index) => (
                  <li key={index} className="text-slate-600 text-sm leading-relaxed">• {item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Action plan</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">{config.cta.text}</p>
              <a
                href={config.cta.buttonLink}
                className="inline-flex items-center justify-center w-full rounded-2xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-800 transition"
              >
                {config.cta.buttonText}
              </a>
            </div>
          </aside>
        </section>
      </div>

      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </div>
  );
}
