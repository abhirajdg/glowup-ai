import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, pdf } from '@react-pdf/renderer';
import { InterviewFeedback } from '../../types';

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
    padding: 30,
    fontFamily: 'Inter'
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
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },
  scoreLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 10
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb'
  },
  list: {
    marginLeft: 15,
    marginBottom: 10
  },
  listItem: {
    fontSize: 12,
    marginBottom: 3
  }
});

interface InterviewFeedbackPDFProps {
  feedback: InterviewFeedback;
  question: string;
  track: string;
  level: string;
}

const InterviewFeedbackPDF: React.FC<InterviewFeedbackPDFProps> = ({ feedback, question, track, level }) => {
  const MyDocument = (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Technical Interview Feedback</Text>
          <Text style={styles.text}>Track: {track}</Text>
          <Text style={styles.text}>Level: {level}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Question</Text>
          <Text style={styles.text}>{question}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Overall Performance</Text>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreLabel}>Confidence Score:</Text>
            <Text style={styles.scoreValue}>{feedback.confidenceScore}%</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Strengths</Text>
          <View style={styles.list}>
            {feedback.strengths.map((strength, index) => (
              <Text key={index} style={styles.listItem}>• {strength}</Text>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Areas for Improvement</Text>
          <View style={styles.list}>
            {feedback.improvements.map((improvement, index) => (
              <Text key={index} style={styles.listItem}>• {improvement}</Text>
            ))}
          </View>
        </View>

        {feedback.suggestedAnswer && (
          <View style={styles.section}>
            <Text style={styles.heading}>Suggested Answer</Text>
            <Text style={styles.text}>{feedback.suggestedAnswer}</Text>
          </View>
        )}

        {feedback.technicalAccuracy !== undefined && (
          <View style={styles.section}>
            <Text style={styles.heading}>Technical Assessment</Text>
            <Text style={styles.text}>Technical Accuracy: {feedback.technicalAccuracy}%</Text>
            <Text style={styles.text}>Communication Score: {feedback.communicationScore}%</Text>
            {feedback.missingConcepts && feedback.missingConcepts.length > 0 && (
              <>
                <Text style={styles.subheading}>Missing Key Concepts:</Text>
                <View style={styles.list}>
                  {feedback.missingConcepts.map((concept, index) => (
                    <Text key={index} style={styles.listItem}>• {concept}</Text>
                  ))}
                </View>
              </>
            )}
          </View>
        )}
      </Page>
    </Document>
  );

  return MyDocument;
};

export const generateInterviewPDF = async (
  feedback: InterviewFeedback,
  question: string,
  track: string,
  level: string
) => {
  return await pdf(
    <InterviewFeedbackPDF
      feedback={feedback}
      question={question}
      track={track}
      level={level}
    />
  ).toBlob();
};

export default InterviewFeedbackPDF;