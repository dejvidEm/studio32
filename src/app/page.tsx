import { Metadata } from "next";
import Aboutus from "./components/home/about-us";
import Contact from "./components/home/contact";
import Faq from "./components/home/faq";
import HeroSection from "./components/home/hero";
import Portfolio from "./components/home/portfolio";
import Resources from "./components/home/resources";
import Services from "./components/home/services";
import StatsFacts from "./components/home/stats-facts";
import Team from "./components/home/team";
import Testimonial from "./components/home/testimonial";

export const metadata: Metadata = {
    title: "Studio32",
};

/** Dočasne vypnuté — na obnovenie sekcie s blogom na domovskej obrazovke nastav na `true`. */
const SHOW_HOME_RESOURCES_BLOG_SECTION = false;

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsFacts/>
      <Portfolio/>
      <Services/>
      <Aboutus/>
      <Testimonial/>
      <Team teamdataNumber="06"/>
      <Faq/>
      {SHOW_HOME_RESOURCES_BLOG_SECTION ? <Resources /> : null}
      <Contact contactdataNumber="10"/>
    </>
  );
}
