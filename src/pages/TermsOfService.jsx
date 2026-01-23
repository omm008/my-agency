import React from "react";
import { Helmet } from "react-helmet-async";

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | WebAutomy</title>
        <meta
          name="description"
          content="Terms governing the use of WebAutomy services."
        />
        <link rel="canonical" href="https://webautomy.com/terms-of-service" />
      </Helmet>

      <main className="bg-brand-black min-h-screen pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Terms of Service
          </h1>
          {/* Add this below the main <h1> heading in both files */}
          <p className="text-neutral-500 text-sm mb-8">
            Last Updated: January 24, 2026
          </p>

          <p className="text-neutral-400 text-sm leading-relaxed mb-8">
            By accessing or using WebAutomy, you agree to the following terms.
          </p>

          <section className="space-y-6 text-neutral-400 text-sm leading-relaxed">
            <div>
              <h2 className="text-white font-semibold mb-2">Services</h2>
              <p>
                WebAutomy provides web development, SEO, automation, and related
                digital services as agreed per project.
              </p>
            </div>

            <div>
              <h2 className="text-white font-semibold mb-2">No Guarantees</h2>
              <p>
                We follow best practices but do not guarantee rankings, traffic,
                or revenue outcomes.
              </p>
            </div>

            <div>
              <h2 className="text-white font-semibold mb-2">Payments</h2>
              <p>
                Pricing, timelines, and payment terms are agreed before project
                initiation. Delayed payments may pause services.
              </p>
            </div>

            <div>
              <h2 className="text-white font-semibold mb-2">
                Intellectual Property
              </h2>
              <p>
                Work remains the property of WebAutomy until full payment is
                received unless otherwise agreed in writing.
              </p>
            </div>

            <div>
              <h2 className="text-white font-semibold mb-2">
                Limitation of Liability
              </h2>
              <p>
                WebAutomy is not liable for indirect or consequential damages
                arising from service usage.
              </p>
            </div>

            <div>
              <h2 className="text-white font-semibold mb-2">Governing Law</h2>
              <p>
                These terms shall be governed and construed in accordance with
                the laws of
                <strong> Madhya Pradesh, India</strong>, without regard to its
                conflict of law provisions. Any disputes shall be subject to the
                exclusive jurisdiction of the courts in Jabalpur.
              </p>
            </div>

            <div>
              <h2 className="text-white font-semibold mb-2">Contact</h2>
              <a
                href="mailto:contact@webautomy.com?subject=Inquiry%20from%20WebAutomy%20Website"
                className="text-white hover:text-brand-blue transition-colors"
              >
                contact@webautomy.com
              </a>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default TermsOfService;
