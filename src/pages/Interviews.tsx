import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Video, 
  Mic, 
  MicOff, 
  X, 
  BarChart, 
  Clock,
  AlertCircle,
  CheckCircle,
  Code,
  Brain,
  Loader,
  Download
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import { InterviewQuestion, InterviewFeedback } from '../types';
import { conductMockInterview } from '../lib/openai';
import { generateInterviewPDF } from '../components/interviews/InterviewFeedbackPDF';

const Interviews: React.FC = () => {
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnswering, setIsAnswering] = useState(false);
  const [transcript, setTranscript] = useState<string>('');
  const [selectedTrack, setSelectedTrack] = useState<'frontend' | 'backend' | 'fullstack' | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<'junior' | 'mid' | 'senior' | null>(null);
  const [feedback, setFeedback] = useState<InterviewFeedback | null>(null);
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);
  
  // Technical questions by track and level
  const questions: Record<string, InterviewQuestion[]> = {
    frontend: {
      junior: [
        {
          id: '1',
          question: "Explain the difference between 'let', 'const', and 'var' in JavaScript. Provide examples of when you would use each.",
          category: 'technical',
          difficulty: 'easy',
          expectedTopics: ['scope', 'hoisting', 'block-scope', 'temporal dead zone']
        },
        {
          id: '2',
          question: "What is the virtual DOM in React and how does it improve performance? Walk me through the reconciliation process.",
          category: 'technical',
          difficulty: 'medium',
          expectedTopics: ['diffing algorithm', 'reconciliation', 'state updates', 'rendering optimization']
        }
      ],
      mid: [
        {
          id: '3',
          question: "Explain how React's useEffect hook works, including the cleanup function and dependency array. Provide examples of common pitfalls.",
          category: 'technical',
          difficulty: 'medium',
          expectedTopics: ['dependency array', 'cleanup function', 'infinite loops', 'stale closures']
        },
        {
          id: '4',
          question: "Describe your approach to optimizing the performance of a React application that's experiencing slowdown with large datasets.",
          category: 'technical',
          difficulty: 'hard',
          expectedTopics: ['virtualization', 'memoization', 'code splitting', 'lazy loading']
        }
      ],
      senior: [
        {
          id: '5',
          question: "Design a scalable state management solution for a large React application. Compare different approaches and explain their trade-offs.",
          category: 'technical',
          difficulty: 'hard',
          expectedTopics: ['Redux', 'Context API', 'atomic state', 'event sourcing']
        },
        {
          id: '6',
          question: "How would you architect a micro-frontend application? Discuss the challenges and solutions for sharing state and styling.",
          category: 'technical',
          difficulty: 'hard',
          expectedTopics: ['module federation', 'shared dependencies', 'runtime integration', 'deployment strategies']
        }
      ]
    },
    backend: {
      junior: [
        {
          id: '7',
          question: "Explain the differences between SQL and NoSQL databases. When would you choose one over the other?",
          category: 'technical',
          difficulty: 'easy',
          expectedTopics: ['data structure', 'scalability', 'ACID properties', 'use cases']
        },
        {
          id: '8',
          question: "What are promises in Node.js? How do they differ from callbacks? Provide examples of error handling in both approaches.",
          category: 'technical',
          difficulty: 'medium',
          expectedTopics: ['async/await', 'error handling', 'promise chaining', 'callback hell']
        }
      ],
      mid: [
        {
          id: '9',
          question: "Design a rate limiting system for a REST API. Consider different strategies and their trade-offs.",
          category: 'technical',
          difficulty: 'medium',
          expectedTopics: ['token bucket', 'sliding window', 'redis implementation', 'distributed systems']
        },
        {
          id: '10',
          question: "Explain how you would implement database sharding in a high-traffic application. Discuss the challenges and solutions.",
          category: 'technical',
          difficulty: 'hard',
          expectedTopics: ['partition key selection', 'consistent hashing', 'rebalancing', 'cross-shard queries']
        }
      ],
      senior: [
        {
          id: '11',
          question: "Design a distributed job processing system that ensures exactly-once delivery and handles failure recovery.",
          category: 'technical',
          difficulty: 'hard',
          expectedTopics: ['message queues', 'idempotency', 'dead letter queues', 'monitoring']
        },
        {
          id: '12',
          question: "How would you design a real-time notification system that scales to millions of users? Consider different architectural approaches.",
          category: 'technical',
          difficulty: 'hard',
          expectedTopics: ['websockets', 'pub/sub', 'fan-out', 'presence detection']
        }
      ]
    },
    fullstack: {
      junior: [
        {
          id: '13',
          question: "Explain the complete flow of a user authentication system, from frontend to backend, including security considerations.",
          category: 'technical',
          difficulty: 'medium',
          expectedTopics: ['JWT', 'password hashing', 'session management', 'CSRF protection']
        },
        {
          id: '14',
          question: "Walk through the process of deploying a full-stack application, including frontend, backend, and database considerations.",
          category: 'technical',
          difficulty: 'medium',
          expectedTopics: ['CI/CD', 'environment variables', 'database migrations', 'monitoring']
        }
      ],
      mid: [
        {
          id: '15',
          question: "Design and implement a real-time collaborative feature (like Google Docs). Discuss both frontend and backend considerations.",
          category: 'technical',
          difficulty: 'hard',
          expectedTopics: ['operational transformation', 'websockets', 'conflict resolution', 'state synchronization']
        },
        {
          id: '16',
          question: "How would you implement a search feature with autocomplete that's both fast and scalable? Consider frontend and backend optimizations.",
          category: 'technical',
          difficulty: 'hard',
          expectedTopics: ['debouncing', 'caching', 'indexing', 'typeahead optimization']
        }
      ],
      senior: [
        {
          id: '17',
          question: "Design a system for handling multi-tenant data in a SaaS application. Consider security, scalability, and maintenance.",
          category: 'technical',
          difficulty: 'hard',
          expectedTopics: ['data isolation', 'schema design', 'resource allocation', 'access control']
        },
        {
          id: '18',
          question: "How would you architect a system that needs to process large amounts of data in real-time while maintaining high availability?",
          category: 'technical',
          difficulty: 'hard',
          expectedTopics: ['stream processing', 'fault tolerance', 'data partitioning', 'monitoring']
        }
      ]
    }
  };

  const getCurrentQuestions = () => {
    if (!selectedTrack || !selectedLevel) return [];
    return questions[selectedTrack][selectedLevel];
  };

  const startInterview = () => {
    setIsInterviewActive(true);
    setCurrentQuestionIndex(0);
    setTranscript('');
    setFeedback(null);
  };

  const endInterview = () => {
    setIsInterviewActive(false);
    setIsAnswering(false);
    setIsFeedbackOpen(true);
  };

  const handleAnswer = async () => {
    if (!transcript) return;
    
    setIsGeneratingFeedback(true);
    try {
      const currentQuestion = getCurrentQuestions()[currentQuestionIndex];
      const response = await conductMockInterview(transcript, `${selectedTrack} ${selectedLevel} developer - ${currentQuestion.question}`);
      
      // Parse the feedback
      const feedbackData = JSON.parse(response);
      setFeedback(feedbackData);
      
      if (currentQuestionIndex < getCurrentQuestions().length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setTranscript('');
      } else {
        endInterview();
      }
    } catch (error) {
      console.error('Error generating feedback:', error);
    } finally {
      setIsGeneratingFeedback(false);
    }
  };

  const startAnswering = () => {
    setIsAnswering(true);
    // In a real implementation, this would start recording
    // For demo, we'll simulate with a sample transcript after a delay
    setTimeout(() => {
      setTranscript("Let me explain how React's virtual DOM works. The virtual DOM is a lightweight copy of the actual DOM that React maintains in memory. When state changes occur, React first updates this virtual representation and then compares it with the previous version through a process called reconciliation. This diffing process identifies the minimal set of changes needed to update the actual DOM, which is more efficient than directly manipulating the DOM for every change. The reconciliation process uses various optimizations and heuristics to maintain good performance.");
    }, 3000);
  };

  const stopAnswering = () => {
    setIsAnswering(false);
  };

  const renderTrackSelection = () => (
    <div className="max-w-3xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-4">Technical Interview Practice</h1>
        <p className="text-xl text-gray-600 mb-8">
          Select your track to begin a specialized technical interview.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {['frontend', 'backend', 'fullstack'].map((track) => (
            <Card 
              key={track}
              isInteractive
              onClick={() => setSelectedTrack(track as any)}
              className={`${selectedTrack === track ? 'ring-2 ring-primary-500' : ''}`}
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  {track === 'frontend' ? (
                    <Code size={28} className="text-primary-600" />
                  ) : track === 'backend' ? (
                    <Brain size={28} className="text-primary-600" />
                  ) : (
                    <MessageSquare size={28} className="text-primary-600" />
                  )}
                </div>
                <h3 className="text-lg font-semibold mb-2 capitalize">{track}</h3>
                <p className="text-gray-600 text-sm">
                  {track === 'frontend' 
                    ? 'UI, React, and browser technologies'
                    : track === 'backend'
                    ? 'APIs, databases, and system design'
                    : 'End-to-end application development'}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedTrack && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-12"
          >
            <h2 className="text-xl font-semibold mb-4">Select Your Level</h2>
            <div className="flex justify-center space-x-4">
              {['junior', 'mid', 'senior'].map((level) => (
                <Button
                  key={level}
                  variant={selectedLevel === level ? 'primary' : 'outline'}
                  onClick={() => setSelectedLevel(level as any)}
                  className="capitalize"
                >
                  {level} Level
                </Button>
              ))}
            </div>
          </motion.div>
        )}

        {selectedTrack && selectedLevel && (
          <Button
            variant="primary"
            size="lg"
            onClick={startInterview}
            className="mt-8"
          >
            Start Interview
          </Button>
        )}
      </motion.div>
    </div>
  );

  const renderInterviewSession = () => {
    const currentQuestion = getCurrentQuestions()[currentQuestionIndex];
    
    const handleDownloadFeedback = async () => {
      if (!feedback) return;
      
      const blob = await generateInterviewPDF(
        feedback,
        currentQuestion.question,
        selectedTrack || '',
        selectedLevel || ''
      );
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `interview-feedback-${selectedTrack}-${selectedLevel}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    };

    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Technical Interview</h2>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Question {currentQuestionIndex + 1} of {getCurrentQuestions().length}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={endInterview}
                  icon={<X size={16} />}
                >
                  End Session
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-1">
                  <MessageSquare size={16} className="text-primary-700" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Technical Question</p>
                  <p className="text-lg font-medium">
                    {currentQuestion.question}
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Your Answer</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock size={14} className="mr-1" />
                  <span>Take your time to think and explain thoroughly</span>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6 min-h-[200px]">
                {transcript ? (
                  <p className="text-gray-700">{transcript}</p>
                ) : (
                  <p className="text-gray-400 italic">
                    {isAnswering 
                      ? 'Recording your answer...' 
                      : 'Click "Start Recording" to begin your answer.'}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex justify-between">
              {isAnswering ? (
                <Button
                  variant="error"
                  onClick={stopAnswering}
                  icon={<MicOff size={16} />}
                >
                  Stop Recording
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={startAnswering}
                  icon={<Mic size={16} />}
                  disabled={!!transcript}
                >
                  Start Recording
                </Button>
              )}
              
              <Button
                variant="primary"
                onClick={handleAnswer}
                disabled={!transcript || isGeneratingFeedback}
                icon={isGeneratingFeedback ? <Loader className="animate-spin" /> : undefined}
              >
                {isGeneratingFeedback 
                  ? 'Analyzing Answer...' 
                  : currentQuestionIndex < getCurrentQuestions().length - 1 
                    ? 'Next Question' 
                    : 'Finish Interview'}
              </Button>
            </div>

            {feedback && (
              <div className="mt-8 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Feedback on Previous Answer</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<Download size={16} />}
                    onClick={handleDownloadFeedback}
                  >
                    Download Feedback
                  </Button>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-xl font-bold text-primary-700">
                          {feedback.confidenceScore}%
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">Overall Score</p>
                        <p className="text-sm text-gray-600">Based on technical accuracy and communication</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Strengths</h4>
                    <ul className="space-y-2">
                      {feedback.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle size={16} className="text-success-500 mt-1 mr-2" />
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Areas for Improvement</h4>
                    <ul className="space-y-2">
                      {feedback.improvements.map((improvement, index) => (
                        <li key={index} className="flex items-start">
                          <AlertCircle size={16} className="text-warning-500 mt-1 mr-2" />
                          <span>{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {isInterviewActive ? renderInterviewSession() : renderTrackSelection()}
      </div>
    </div>
  );
};

export default Interviews;