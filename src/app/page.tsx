import { Metadata } from "next";
import { SHOW_HOME_BLOG_TEASER_AND_NAV } from "@/feature-flags";
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
      {SHOW_HOME_BLOG_TEASER_AND_NAV ? <Resources /> : null}
      <Contact contactdataNumber="10"/>
    </>
  );
}
