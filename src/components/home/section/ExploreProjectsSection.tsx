'use client';

import React from 'react';
import { motion } from 'framer-motion';

import { projects } from './helper/projects';
import ProjectCard from './ProjectCart';

const ExploreProjectsSection = () => {
  return (
    <section id="projects" className="relative py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          className="mb-6 text-center text-5xl font-bold text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Explore Projects{' '}
        </motion.h2>
        <motion.p
          className="mx-auto mb-16 max-w-3xl text-center text-xl text-gray-300"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Dive into our showcase projects and experience the power of
          CodeCompass in action.
        </motion.p>

        <div className="relative">
          {/* Vertical Timeline */}
          <div className="absolute bottom-0 left-1/2 top-0 w-1 -translate-x-1/2 transform rounded-lg bg-green-600"></div>

          {projects.map((project, index) => (
            <React.Fragment key={index}>
              <ProjectCard {...project} isRight={index % 2 === 0} />
              {/* Timeline Node */}
              <div
                className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-green-400"
                style={{ top: `${(index + 0.5) * (100 / projects.length)}%` }}
              ></div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreProjectsSection;
