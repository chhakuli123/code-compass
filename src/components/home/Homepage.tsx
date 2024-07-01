import Navbar from '@/layout/navbar/Navbar';

import HeroSection from './section/HeroSection';

const Homepage = () => {
  return (
    <div className="bg-primary-950">
      <Navbar />
      <HeroSection />
    </div>
  );
};

export default Homepage;
