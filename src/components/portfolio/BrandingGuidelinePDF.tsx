import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica'
  },
  section: {
    marginBottom: 20
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#2563eb'
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#1e40af'
  },
  subheading: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#374151'
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    lineHeight: 1.5
  },
  list: {
    marginLeft: 15,
    marginBottom: 10
  },
  listItem: {
    fontSize: 12,
    marginBottom: 3
  },
  tag: {
    backgroundColor: '#eff6ff',
    padding: '4 8',
    borderRadius: 12,
    fontSize: 10,
    color: '#2563eb',
    marginRight: 5,
    marginBottom: 5
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10
  }
});

interface BrandingGuidelinePDFProps {
  data: any;
}

const BrandingGuidelinePDF: React.FC<BrandingGuidelinePDFProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Personal Branding Guidelines</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Target Audience Personas</Text>
        {data.audiencePersonas.map((persona: any, index: number) => (
          <View key={index} style={{ marginBottom: 15 }}>
            <Text style={styles.subheading}>{persona.title}</Text>
            <Text style={styles.text}>{persona.description}</Text>
            <View style={styles.tagContainer}>
              {persona.interests.map((interest: string, i: number) => (
                <Text key={i} style={styles.tag}>{interest}</Text>
              ))}
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Content Strategy</Text>
        <Text style={styles.subheading}>Recommended Topics</Text>
        <View style={styles.list}>
          {data.contentStrategy.topics.map((topic: string, index: number) => (
            <Text key={index} style={styles.listItem}>• {topic}</Text>
          ))}
        </View>

        <Text style={styles.subheading}>Content Formats</Text>
        {data.contentStrategy.formats.map((format: any, index: number) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <Text style={styles.text}>{format.type}</Text>
            <Text style={styles.text}>Frequency: {format.frequency}</Text>
            <View style={styles.tagContainer}>
              {format.platforms.map((platform: string, i: number) => (
                <Text key={i} style={styles.tag}>{platform}</Text>
              ))}
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Profile Optimization</Text>
        <Text style={styles.subheading}>Recommended Headline</Text>
        <Text style={styles.text}>{data.profileOptimization.headline}</Text>

        <Text style={styles.subheading}>Professional Summary</Text>
        <Text style={styles.text}>{data.profileOptimization.summary}</Text>

        <Text style={styles.subheading}>Keywords to Include</Text>
        <View style={styles.tagContainer}>
          {data.profileOptimization.keywords.map((keyword: string, index: number) => (
            <Text key={index} style={styles.tag}>{keyword}</Text>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Lead Generation Strategy</Text>
        <Text style={styles.subheading}>Portfolio Elements</Text>
        <View style={styles.list}>
          {data.leadGeneration.portfolio.sections.map((section: string, index: number) => (
            <Text key={index} style={styles.listItem}>• {section}</Text>
          ))}
        </View>

        <Text style={styles.subheading}>Networking Strategy</Text>
        <View style={styles.list}>
          {data.leadGeneration.networking.strategies.map((strategy: string, index: number) => (
            <Text key={index} style={styles.listItem}>• {strategy}</Text>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default BrandingGuidelinePDF;