import React, { useEffect } from "react";
import { Hero } from "../../components/landing/Hero";
import { AvailabilityCalendarSection } from "../../components/landing/AvailabilityCalendarSection";
import { IntroSection } from "../../components/landing/IntroSection";
import { EventTypesSection } from "../../components/landing/EventTypesSection";
import { PackagesSection } from "../../components/landing/PackagesSection";
import { ExperienceSection } from "../../components/landing/ExperienceSection";
import { ProblemSolutionSection } from "../../components/landing/ProblemSolutionSection";
import { FinalCtaSection } from "../../components/landing/FinalCtaSection";
import { LocationContact } from "../../components/landing/LocationContact";
import { useTrackOnMount } from "../../analytics/analytics";

export const HomePage = () => {
  useTrackOnMount("demo_viewed", {
    view_type: "landing_home",
    route: "/"
  });

  useEffect(() => {
    // Si viene con ancla hash e.g. #paquetes, #contacto, #disponibilidad, #experiencias
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const elem = document.getElementById(id);
      if (elem) {
        setTimeout(() => {
          elem.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    }
  }, []);

  return (
    <div className="homepage-editorial-wrap">
      <Hero />
      <AvailabilityCalendarSection />
      <IntroSection />
      <EventTypesSection />
      <PackagesSection />
      <ExperienceSection />
      <ProblemSolutionSection />
      <LocationContact />
      <FinalCtaSection />
    </div>
  );
};
