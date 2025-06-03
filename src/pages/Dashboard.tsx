import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Users, 
  MessageSquare, 
  Briefcase, 
  Zap
} from 'lucide-react';
import FeatureCard from '../components/dashboard/FeatureCard';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Build Your Professional Brand With AI
          </h1>
          <p className="text-xl text-gray-600">
            Create a stunning portfolio, perfect your resume, and ace your interviews with our AI-powered tools.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            title="Personal Branding with AI"
            description="Create a powerful personal brand strategy and grow your professional network with AI-driven insights."
            icon={<Users size={24} />}
            to="/portfolio"
            gradient="from-primary-500 to-primary-700"
            progress={75}
          />
          
          <FeatureCard
            title="Resume Generator"
            description="Build an ATS-friendly resume tailored to your target industry and roles."
            icon={<FileText size={24} />}
            to="/resume"
            gradient="from-secondary-500 to-secondary-700"
            progress={50}
          />
          
          <FeatureCard
            title="Cover Letter Writer"
            description="Generate customized cover letters that highlight your relevant experience."
            icon={<MessageSquare size={24} />}
            to="/cover-letter"
            gradient="from-accent-500 to-accent-700"
            progress={25}
          />
          
          <FeatureCard
            title="Mock Interviewer"
            description="Practice with our AI interviewer and get real-time feedback to improve."
            icon={<MessageSquare size={24} />}
            to="/interviews"
            gradient="from-success-500 to-success-700"
          />
          
          <FeatureCard
            title="Job Finder"
            description="Discover opportunities that match your skills and experience."
            icon={<Briefcase size={24} />}
            to="https://amazing-mermaid-6a7b20.netlify.app"
            gradient="from-warning-500 to-warning-700"
          />
          
          <FeatureCard
            title="Career Coach"
            description="Get personalized advice to advance your career and close skill gaps."
            icon={<Zap size={24} />}
            to="/coach"
            gradient="from-error-500 to-error-700"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;