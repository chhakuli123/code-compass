import { motion } from 'framer-motion';
import { LuChevronRight, LuCode, LuStar, LuUsers } from 'react-icons/lu';

import { ProjectCardProps } from 'types';

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  language,
  lastUpdated,
  stars,
  contributors,
  isRight,
}) => (
  <motion.div
    className={`flex ${isRight ? 'justify-start' : 'justify-end'}  relative`}
    initial={{ opacity: 0, x: isRight ? 100 : -100 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <div
      className={`w-full md:w-5/12 ${
        isRight ? 'md:ml-auto md:pr-8' : 'md:mr-auto md:pl-8'
      }`}
    >
      <div className="rounded-xl bg-gradient-to-br from-green-700 to-primary-900 p-6 shadow-lg transition-all duration-300 hover:shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <LuCode className="mr-2 text-green-300" size={24} />
            <h3 className="text-xl font-bold text-white">{title}</h3>
          </div>
          <span className="rounded-full bg-green-900 px-3 py-1 text-sm font-semibold text-green-300">
            {language}
          </span>
        </div>
        <p className="mb-4 text-gray-300">{description}</p>
        <div className="flex items-center justify-between text-gray-300">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <LuStar className="mr-1" /> {stars}
            </span>
            <span className="flex items-center">
              <LuUsers className="mr-1" /> {contributors}
            </span>
          </div>
          <span className="text-sm">Updated {lastUpdated}</span>
        </div>
        <div className="mt-4 flex justify-end">
          <button className="flex items-center rounded-full bg-green-500 px-4 py-2 text-white transition-colors duration-300 hover:bg-green-400">
            Explore <LuChevronRight className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  </motion.div>
);

export default ProjectCard;
