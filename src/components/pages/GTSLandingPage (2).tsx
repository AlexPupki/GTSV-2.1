// GTS Landing Page - All landing sections in one component

import { GTSHeroSection } from "../GTSHeroSection";
import { GTSAboutSection } from "../GTSAboutSection";
import { GTSCatalogWithScenariosSection } from "../GTSCatalogWithScenariosSection";
import { GTSFlashOffersSection } from "../GTSFlashOffersSection";
import { GTSNewsSection } from "../GTSNewsSection";
import { GTSComparisonSection } from "../GTSComparisonSection";
import { GTSInteractiveMapSection } from "../GTSInteractiveMapSection";
import { GTSUnifiedTestimonialsSection } from "../GTSUnifiedTestimonialsSection";
import { GTSMembershipSection } from "../GTSMembershipSection";
import { GTSFooter } from "../GTSFooter";


interface GTSLandingPageProps {
  onLoginClick: () => void;
}

export function GTSLandingPage({ onLoginClick }: GTSLandingPageProps) {

  return (
    <div className="min-h-screen">

      <main>
        <section id="hero">
          <GTSHeroSection onLogin={onLoginClick} />
        </section>
        
        <section id="about">
          <GTSAboutSection />
        </section>
        
        <section id="catalog">
          <GTSCatalogWithScenariosSection />
        </section>
        
        <section id="flash-offers">
          <GTSFlashOffersSection />
        </section>
        
        <section id="news">
          <GTSNewsSection />
        </section>
        
        <section id="comparison">
          <GTSComparisonSection />
        </section>
        
        <section id="interactive-map">
          <GTSInteractiveMapSection />
        </section>
        
        <section id="testimonials">
          <GTSUnifiedTestimonialsSection />
        </section>
        
        <section id="membership">
          <GTSMembershipSection />
        </section>
      </main>
      
      <GTSFooter 
        onNavigateToLogin={onLoginClick}
        onNavigateToUIKit={() => {}}
        onNavigateToDemo={() => {}}
        onNavigateToNewLeadDemo={() => {}}
      />
    </div>
  );
}