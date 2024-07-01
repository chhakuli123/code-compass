'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { LuGithub, LuLinkedin, LuTwitter } from 'react-icons/lu';
import { useInView } from 'react-intersection-observer';

const Footer = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <motion.footer
      ref={ref}
      className="bg-green-900 py-8 text-white"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">CodeCompass</h3>
            <p className="text-sm text-gray-300">
              Empowering teams with AI-driven project insights.
            </p>
          </div>
          <div className="flex space-x-4">
            <Link
              href="https://github.com/chhakuli123/code-compass"
              className="text-white transition-colors hover:text-green-300"
            >
              <LuGithub size={24} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/arnab-chatterjee01/"
              className="text-white transition-colors hover:text-green-300"
            >
              <LuLinkedin size={24} />
            </Link>
            <Link
              href="https://x.com/ChhakuliZingare"
              className="text-white transition-colors hover:text-green-300"
            >
              <LuTwitter size={24} />
            </Link>
          </div>
        </div>
        <div className="mt-6 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} CodeCompass | Built by Arnab and
            Chhakuli
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
