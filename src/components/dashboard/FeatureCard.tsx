import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  gradient?: string;
  progress?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  to,
  gradient = 'from-primary-500 to-accent-500',
  progress,
}) => {
  return (
    <Link to={to}>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-sm overflow-hidden h-full border border-gray-100 hover:shadow-md transition-shadow"
      >
        <div className={`h-2 bg-gradient-to-r ${gradient}`}>
          {progress !== undefined && (
            <div className="h-full bg-gray-200\" style={{ width: `${100 - progress}%` }}></div>
          )}
        </div>
        <div className="p-6">
          <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600 mb-4">
            {icon}
          </div>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          
          <div className="flex items-center text-primary-600 font-medium">
            <span>Get started</span>
            <ArrowRight size={16} className="ml-2" />
          </div>
          
          {progress !== undefined && (
            <div className="mt-4">
              <div className="flex justify-between mb-1 text-xs text-gray-500">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );
};

export default FeatureCard;