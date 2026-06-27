import MainLayout from "../layouts/MainLayout";

import Hero from "../components/home/Hero";
import Services from "../components/home/Services";
import HowItWorks from "../components/home/HowItWorks";
import Statistics from "../components/home/Statistics";
import Testimonials from "../components/home/Testimonials";
import CTA from "../components/home/CTA";

function Home() {
  return (
    <MainLayout>
      <Hero />
      <Services />
      <HowItWorks />
      <Statistics />
      <Testimonials />
      <CTA /> 
    </MainLayout>
  );
}

export default Home;