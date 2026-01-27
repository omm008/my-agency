import React from "react";
import { Helmet } from "react-helmet-async";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | WebAutomy</title>
        <meta
          name="description"
          content="How WebAutomy collects, uses, and protects user data."
        />
        <link rel="canonical" href="https://webautomy.com/privacy-policy" />
      </Helmet>

      <main className="bg-brand-black min-h-screen pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Privacy Policy
          </h1>
          {/* Add this below the main <h1> heading in both files */}
          <p className="text-neutral-500 text-sm mb-8">
            Last Updated: January 24, 2026
          </p>

          <p className="text-neutral-400 text-sm leading-relaxed mb-8">
            WebAutomy respects your privacy. This policy explains how we
            collect, use, and protect information shared through our website and
            services.
          </p>

          <section className="space-y-6 text-neutral-400 text-sm leading-relaxed">
            <div>
              <h2 className="text-white font-semibold mb-2">
                Information We Collect
              </h2>
              <p>
                We may collect your name, email address, phone number, and
                business details when you submit forms, contact us, or
                communicate via WhatsApp.
              </p>
            </div>

            <div>
              <h2 className="text-white font-semibold mb-2">
                How We Use Information
              </h2>
              <p>
                Information is used only to respond to inquiries, deliver
                services, improve our systems, and communicate with you.
              </p>
            </div>

            <div>
              <h2 className="text-white font-semibold mb-2">
                Third-Party Tools
              </h2>
              <p>
                We may use trusted tools such as hosting providers, analytics
                services, and messaging APIs. These services access data only as
                required to perform their function.
              </p>
            </div>

            <div>
              <h2 className="text-white font-semibold mb-2">Data Security</h2>
              <p>
                We implement reasonable technical measures to protect your
                information. No online system is 100% secure.
              </p>
            </div>

            <div>
              <h2 className="text-white font-semibold mb-2">Your Rights</h2>
              <p>
                You may request access, correction, or deletion of your data by
                contacting us.
              </p>
            </div>

            <div>
              <h2 className="text-white font-semibold mb-2">Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy, please
                contact us:
              </p>
              <ul className="list-none space-y-2">
                <li>
                  <strong className="text-white">Email:</strong>{" "}
                  <a
                    href="mailto:contact@webautomy.com"
                    className="hover:text-brand-blue"
                  >
                    contact@webautomy.com
                  </a>
                </li>

                <li>
                  <strong className="text-white">Registered Office:</strong>
                  <br />
                  WebAutomy (MSME Reg: UDYAM-MP-24-0090709)
                  <br />
                  {/* Yahan wahi same address daalna jo Udyam Certificate par hai */}
                  House No 149, Lala Lajpat rai ward, Ward 70, Siddha Nagar
                  <br />
                  Manegaon ,Ranjhi, Jabalpur, Madhya Pradesh, India - 482005
                </li>
              </ul>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default PrivacyPolicy;
