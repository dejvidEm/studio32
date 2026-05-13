import { Metadata } from "next";
import { SHOW_HOME_BLOG_TEASER_AND_NAV, SHOW_HOME_TEAM } from "@/feature-flags";
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
  alternates: { canonical: "/" },
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
      {SHOW_HOME_TEAM ? <Team teamdataNumber="06" /> : null}
      <Faq/>
      {SHOW_HOME_BLOG_TEASER_AND_NAV ? <Resources /> : null}
      <Contact contactdataNumber="10"/>
    </>
  );
}
