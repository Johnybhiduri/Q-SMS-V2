import Hero from "../components/home/Hero";
import LogoMarquee from "../components/home/LogoMarquee";
import HowItWorks from "../components/home/HowItWorks";
import ServicesPricing from "../components/home/ServicesPricing";
import WhyChooseUs from "../components/home/WhyChooseUs";
import SupportedCategories from "../components/home/SupportedCategories";
import Testimonials from "../components/home/Testimonials";
import SecurityPayments from "../components/home/SecurityPayments";
import CTASection from "../components/home/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <HowItWorks />
      <ServicesPricing />
      <WhyChooseUs />
      <SupportedCategories />
      <Testimonials />
      <SecurityPayments />
      <CTASection />
    </>
  );
}
