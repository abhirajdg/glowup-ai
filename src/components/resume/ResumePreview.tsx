import React from 'react';
import { motion } from 'framer-motion';
import { PortfolioData } from '../../types';
import { Download, Share } from 'lucide-react';
import Button from '../ui/Button';
import { Document, Page, Text, View, StyleSheet, Font, pdf } from '@react-pdf/renderer';

// Register fonts
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hiA.woff2', fontWeight: 700 }
  ]
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Inter'
  },
  header: {
    marginBottom: 20
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4
  },
  title: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 12
  },
  contact: {
    fontSize: 10,
    color: '#6B7280',
    marginBottom: 4
  },
  section: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#111827',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 4
  },
  experienceItem: {
    marginBottom: 12
  },
  companyName: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  position: {
    fontSize: 11,
    color: '#4B5563'
  },
  dates: {
    fontSize: 10,
    color: '#6B7280',
    marginBottom: 4
  },
  description: {
    fontSize: 10,
    color: '#374151',
    marginBottom: 4
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4
  },
  skill: {
    fontSize: 10,
    backgroundColor: '#F3F4F6',
    padding: '4 8',
    borderRadius: 4,
    color: '#374151'
  }
});

const ResumePDF: React.FC<{ data: PortfolioData }> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.contact}>{data.contact.email}</Text>
        {data.contact.phone && <Text style={styles.contact}>{data.contact.phone}</Text>}
        {data.contact.location && <Text style={styles.contact}>{data.contact.location}</Text>}
        {data.contact.linkedIn && <Text style={styles.contact}>{data.contact.linkedIn}</Text>}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Summary</Text>
        <Text style={styles.description}>{data.about}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        {data.experience.map((exp) => (
          <View key={exp.id} style={styles.experienceItem}>
            <Text style={styles.companyName}>{exp.company}</Text>
            <Text style={styles.position}>{exp.position}</Text>
            <Text style={styles.dates}>{exp.startDate} - {exp.endDate}</Text>
            <Text style={styles.description}>{exp.description}</Text>
            {exp.achievements.map((achievement, index) => (
              <Text key={index} style={styles.description}>• {achievement}</Text>
            ))}
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        {data.education.map((edu) => (
          <View key={edu.id} style={styles.experienceItem}>
            <Text style={styles.companyName}>{edu.institution}</Text>
            <Text style={styles.position}>{edu.degree} in {edu.field}</Text>
            <Text style={styles.dates}>{edu.startDate} - {edu.endDate}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.skills}>
          {data.skills.map((skill, index) => (
            <Text key={index} style={styles.skill}>{skill}</Text>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

interface ResumePreviewProps {
  portfolioData: PortfolioData;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ portfolioData }) => {
  const handleDownload = async () => {
    const blob = await pdf(<ResumePDF data={portfolioData} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${portfolioData.name.toLowerCase().replace(/\s+/g, '-')}-resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mt-8">
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
              onClick={handleDownload}
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