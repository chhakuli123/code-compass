'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { features } from './featuresData';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => (
  <div className="group flex flex-col items-center rounded-2xl bg-gradient-to-b from-green-800 to-green-900 p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
    <div className="mb-6 transform text-green-300 transition-transform duration-300 group-hover:scale-110">
      {icon}
    </div>
    <h3 className="mb-3 text-2xl font-bold text-white transition-colors duration-300 group-hover:text-green-300">
      {title}
    </h3>
    <p className="text-center text-gray-300">{description}</p>
  </div>
);

const FeaturesSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <motion.section
      className="py-16"
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      id="features"
    >
      <div className="container mx-auto px-4">
        <h2 className="mb-6 text-center text-5xl font-bold text-white">
          Key Features
        </h2>
        <p className="mx-auto mb-16 max-w-3xl text-center text-xl text-gray-300">
          CodeCompass empowers your team with cutting-edge tools to navigate,
          understand, and optimize your codebase like never before.
        </p>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturesSection;
