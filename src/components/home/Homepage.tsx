import Footer from '@/layout/footer/Footer';

import ExploreProjectsSection from './section/ExploreProjectsSection';
import FeaturesSection from './section/FeaturesSection';
import HeroSection from './section/HeroSection';

const Homepage = () => {
  return (
    <div className="bg-primary-950">
      <HeroSection />
      <ExploreProjectsSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default Homepage;
