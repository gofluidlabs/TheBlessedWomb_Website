import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import Marquee from "@/components/Marquee";
import Process from "@/components/Process";
import Faq from "@/components/Faq";
import Team from "@/components/Team";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import Animations from "@/components/Animations";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyChooseUs />
        <Marquee />
        <Process />
        <Faq />
        <Team />
      </main>
      <Footer />
      <BackToTop />
      <Animations />
    </>
  );
}
