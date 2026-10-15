import React, { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import OurMission from './components/OurMission';
import OurVision from './components/OurVision';
import CoreValues from './components/CoreValues';
import OurPhilosophy from './components/OurPhilosophy';
import Services from './components/Services';
import CulturePage from './components/CulturePage';
import AboutUsPage from './components/AboutUsPage';
import Culture from './components/Culture';
import Careers from './components/Careers';
import ContactModal from './components/ContactModal';
import Footer from './components/Footer';

export default function App() {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [isCulturePageOpen, setIsCulturePageOpen] = useState(false);
  const [isAboutPageOpen, setIsAboutPageOpen] = useState(false);

  const savedHomeScrollPos = React.useRef(0);

  const isSubPageOpen = Boolean(isCulturePageOpen || isAboutPageOpen);

  const saveCurrentHomeScroll = () => {
    if (!isSubPageOpen) {
      savedHomeScrollPos.current = window.scrollY;
    }
  };

  useEffect(() => {
    const syncRouteFromHash = () => {
      const hash = window.location.hash;
      if (hash === '#culture') {
        setIsCulturePageOpen(true);
        setIsAboutPageOpen(false);
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      } else if (hash === '#about') {
        setIsAboutPageOpen(true);
        setIsCulturePageOpen(false);
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      } else if (!hash || hash === '#' || hash === '#hero') {
        setIsCulturePageOpen(false);
        setIsAboutPageOpen(false);
      } else {
        setIsCulturePageOpen(false);
        setIsAboutPageOpen(false);
        const targetId = hash.replace('#', '');
        setTimeout(() => {
          scrollToTargetSection(targetId, 'smooth');
        }, 150);
      }
    };

    // Run immediately on page load / refresh
    syncRouteFromHash();

    const handlePopState = (e) => {
      if (e.state && e.state.view === 'about') {
        setIsAboutPageOpen(true);
        setIsCulturePageOpen(false);
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      } else if (e.state && e.state.view === 'culture') {
        setIsCulturePageOpen(true);
        setIsAboutPageOpen(false);
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      } else {
        syncRouteFromHash();
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', syncRouteFromHash);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', syncRouteFromHash);
    };
  }, []);

  const handleOpenContact = () => setContactModalOpen(true);
  const handleCloseContact = () => setContactModalOpen(false);

  const handleOpenCareersScroll = () => {
    handleNavHeaderClick('#careers');
  };

  const handleBackToHome = () => {
    setIsCulturePageOpen(false);
    setIsAboutPageOpen(false);
    if (window.location.hash && (window.location.hash === '#culture' || window.location.hash === '#about')) {
      window.history.pushState(null, '', window.location.pathname + window.location.search);
    }
    requestAnimationFrame(() => {
      window.scrollTo({ top: savedHomeScrollPos.current, behavior: 'instant' });
    });
  };

  const scrollToTargetSection = (targetId, behavior = 'smooth') => {
    if (targetId === 'hero') {
      window.scrollTo({ top: 0, behavior });
      return;
    }
    const target = document.getElementById(targetId);
    if (target) {
      const headerOffset = 90;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: behavior
      });
    }
  };

  const handleNavHeaderClick = (href) => {
    if (href === '#contact') {
      handleOpenContact();
      return;
    }

    if (href === '#culture') {
      saveCurrentHomeScroll();
      setIsAboutPageOpen(false);
      setIsCulturePageOpen(true);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      window.history.pushState({ view: 'culture' }, '', '#culture');
      return;
    }

    const targetId = href.replace('#', '');

    if (isSubPageOpen) {
      // Exit detailed pages to home view & INSTANTLY jump to target section (no long scroll down from top 0)
      setIsCulturePageOpen(false);
      setIsAboutPageOpen(false);
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
      requestAnimationFrame(() => {
        scrollToTargetSection(targetId, 'instant');
      });
    } else {
      // Direct smooth scroll when already browsing Home view
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
      scrollToTargetSection(targetId, 'smooth');
    }
  };

  const currentViewKey = isAboutPageOpen
    ? 'about-page'
    : (isCulturePageOpen ? 'culture-page' : 'home-view');

  return (
    <div className="app-container">
      {/* 0. Initial Smooth Font Loading Preloader */}
      <Preloader />

      {/* 1. Global Floating Header */}
      <Header 
        onOpenContact={handleOpenContact} 
        onNavClick={handleNavHeaderClick}
        activeSectionId={
          isAboutPageOpen ? 'about'
          : isCulturePageOpen ? 'culture'
          : null
        }
      />

      {/* Render Dedicated Views or Main Landing Page with Dissolve Transition */}
      <main key={currentViewKey} className="page-view-wrapper">
        {isAboutPageOpen ? (
          <AboutUsPage 
            onBack={handleBackToHome}
            onOpenContact={handleOpenContact}
            onOpenCareers={handleOpenCareersScroll}
          />
        ) : isCulturePageOpen ? (
          <CulturePage 
            onBack={handleBackToHome}
            onOpenCareers={handleOpenCareersScroll}
          />
        ) : (
          <>
            {/* 2. Hero (with integrated compact Metrics & Live Engine Panel) */}
            <Hero />

            {/* 2.2 About Us Section */}
            <AboutSection />

            {/* 2.5 Our Mission & Our Vision */}
            <OurMission />
            <OurVision />
            <CoreValues />
            <OurPhilosophy />

            {/* 3. What We Do (Services) */}
            <Services />

            {/* Company Culture & Environment */}
            <Culture onSeeGallery={() => handleNavHeaderClick('#culture')} />

            {/* 12. Careers */}
            <Careers />
          </>
        )}
      </main>

      {/* Global Footer */}
      <Footer 
        onOpenContact={handleOpenContact} 
        onNavClick={handleNavHeaderClick}
      />

      {/* Global Interactive Project Contact Drawer */}
      <ContactModal 
        isOpen={contactModalOpen} 
        onClose={handleCloseContact} 
      />

      <style>{`
        .page-view-wrapper {
          animation: pageDissolveIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes pageDissolveIn {
          0% {
            opacity: 0;
            transform: translateY(12px);
          }
          100% {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}
