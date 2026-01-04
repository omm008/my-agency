import React from "react";
import Hero from "../components/layout/Hero";
import TransformationSlider from "../components/layout/TransformationSlider";
import DiscoveryWizard from "../components/layout/DiscoveryWizard";
import StickyScrollServices from "../components/layout/StickyScrollServices";

const Home = ({ isLoaded }) => {
  return (
    <main>
      <Hero isLoaded={isLoaded} />
      <StickyScrollServices />
      <TransformationSlider />
      <DiscoveryWizard />
    </main>
  );
};

export default Home;
