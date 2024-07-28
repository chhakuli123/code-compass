import Link from 'next/link';
import Script from 'next/script';
import { FaGithub } from 'react-icons/fa';
import { LuArrowDown } from 'react-icons/lu';

const HeroSection = () => {
  return (
    <div className="flex items-center justify-center bg-gradient-to-b from-green-700 py-16 text-white">
      <div className="w-full max-w-5xl pt-20 text-center">
        <h1 className="animate-fade-in-up mb-6 text-5xl font-bold md:text-7xl">
          <span className="mb-2 block">Empower Your Team</span>
          <span className="block text-green-300">
            with Instant Project Insights
          </span>
        </h1>
        <p className="text-md animate-fade-in-up mx-auto mb-10 max-w-3xl font-medium text-gray-200 delay-200 md:text-xl">
          Streamline project understanding, enhance collaboration, and
          accelerate development cycles with AI-powered CodeCompass.
        </p>
        <div className="animate-fade-in-up delay-400 mb-12 flex flex-wrap justify-center gap-4">
          <Link
            href="#projects"
            className="inline-flex items-center rounded-full bg-white px-8 py-3 text-lg font-semibold text-green-800 transition duration-300 hover:bg-green-100"
          >
            Get Started <LuArrowDown className="ml-2" size={20} />
          </Link>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={'https://github.com/chhakuli123/code-compass'}
            className="inline-flex items-center rounded-full border-2 border-white bg-green-600 px-8 py-3 text-lg font-semibold text-white transition duration-300 hover:bg-green-500"
          >
            <FaGithub className="mr-2" size={20} />
            GitHub
          </Link>
        </div>
        <div className="animate-fade-in-up delay-600 mx-auto w-full">
          <Script
            src="https://js.storylane.io/js/v1/storylane.js"
            strategy="lazyOnload"
          />
          <div
            className="sl-embed"
            style={{
              position: 'relative',
              paddingBottom: 'calc(50.52% + 25px)',
              width: '100%',
              height: 0,
              transform: 'scale(1)',
            }}
          >
            <iframe
              loading="lazy"
              className="sl-demo"
              src="https://app.storylane.io/demo/qvwzg8sr6ue2"
              name="sl-embed"
              allow="fullscreen"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: '1px solid rgba(63,95,172,0.35)',
                boxShadow: '0px 0px 18px rgba(26, 19, 72, 0.15)',
                borderRadius: '10px',
                boxSizing: 'border-box',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
