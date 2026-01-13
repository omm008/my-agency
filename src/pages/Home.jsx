import React from "react";
import Hero from "../components/layout/Hero";
import TransformationSlider from "../components/layout/TransformationSlider";
import DiscoveryWizard from "../components/layout/DiscoveryWizard";
import StickyScrollServices from "../components/layout/StickyScrollServices";
import { Helmet } from "react-helmet-async";

const Home = ({ isLoaded }) => {
  return (
    <>
      <Helmet>
        <title>WebAutomy - Web Design, SEO & Automation Agency</title>
        <meta
          name="description"
          content="WebAutomy helps businesses grow with high-converting websites, Google Maps SEO, and automation solutions."
        />
        <link rel="canonical" href="https://webautomy.com/" />
      </Helmet>

      <main>
        <Hero isLoaded={isLoaded} />
        <section className="max-w-3xl mx-auto px-4 mt-24 text-center">
          <p className="text-neutral-600 text-sm leading-relaxed">
            WebAutomy is a digital agency specializing in web design, SEO,
            Google Maps optimization, and automation solutions for businesses.
          </p>
        </section>

        <StickyScrollServices />
        <TransformationSlider />
        <DiscoveryWizard />
      </main>
    </>
  );
};

export default Home;
