import React from 'react';
import { motion } from 'framer-motion';
import { PortfolioData } from '../../types';
import { Download, Share } from 'lucide-react';
import Button from '../ui/Button';

interface ResumePreviewProps {
  portfolioData: PortfolioData;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ portfolioData }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Resume Preview</h2>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              icon={<Share size={16} />}
            >
              Share
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={<Download size={16} />}
            >
              Download
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-8 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-md p-8 mx-auto max-w-[21cm] rounded-md"
          style={{ minHeight: '29.7cm' }}
        >
          <header className="mb-6 pb-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">{portfolioData.name}</h1>
            <p className="text-lg text-primary-600 mt-1">{portfolioData.title}</p>
            
            <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-600">
              {portfolioData.contact.email && (
                <div>Email: {portfolioData.contact.email}</div>
              )}
              {portfolioData.contact.phone && (
                <div>Phone: {portfolioData.contact.phone}</div>
              )}
              {portfolioData.contact.location && (
                <div>Location: {portfolioData.contact.location}</div>
              )}
              {portfolioData.contact.linkedIn && (
                <div>LinkedIn: {portfolioData.contact.linkedIn}</div>
              )}
            </div>
          </header>
          
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Professional Summary</h2>
            <p className="text-gray-700">{portfolioData.about}</p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {portfolioData.skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
          
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Work Experience</h2>
            <div className="space-y-4">
              {portfolioData.experience.map((exp) => (
                <div key={exp.id} className="border-l-2 border-primary-200 pl-4">
                  <h3 className="font-medium text-gray-900">{exp.position}</h3>
                  <div className="flex justify-between text-sm">
                    <p className="text-primary-600">{exp.company}</p>
                    <p className="text-gray-500">{exp.startDate} - {exp.endDate}</p>
                  </div>
                  <p className="mt-2 text-gray-700 text-sm">{exp.description}</p>
                  {exp.achievements.length > 0 && (
                    <ul className="mt-2 list-disc list-inside text-sm text-gray-700 space-y-1">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
          
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Education</h2>
            <div className="space-y-4">
              {portfolioData.education.map((edu) => (
                <div key={edu.id} className="border-l-2 border-primary-200 pl-4">
                  <h3 className="font-medium text-gray-900">{edu.degree} in {edu.field}</h3>
                  <div className="flex justify-between text-sm">
                    <p className="text-primary-600">{edu.institution}</p>
                    <p className="text-gray-500">{edu.startDate} - {edu.endDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default ResumePreview;