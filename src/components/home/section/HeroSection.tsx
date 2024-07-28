import Link from 'next/link';
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
        <div className="animate-fade-in-up delay-600 mx-auto flex h-96 w-full max-w-4xl items-center justify-center rounded-lg bg-white bg-opacity-10 backdrop-blur-lg"></div>
      </div>
    </div>
  );
};

export default HeroSection;
