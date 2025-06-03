import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Target, 
  TrendingUp, 
  BookOpen, 
  Award, 
  BarChart, 
  Loader,
  CheckCircle,
  ArrowRight,
  Brain,
  Briefcase,
  GraduationCap
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardHeader, CardContent, CardFooter } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import { provideCareerAdvice } from '../lib/openai';

const Coach: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'assessment' | 'plan' | 'resources'>('assessment');
  const [careerAdvice, setCareerAdvice] = useState<any>(null);
  const [formData, setFormData] = useState({
    currentRole: '',
    yearsOfExperience: '',
    skills: '',
    industry: '',
    careerGoals: '',
    interests: '',
    challenges: '',
    preferredWorkStyle: '',
    desiredSalary: '',
    location: '',
    education: '',
    certifications: '',
    workHistory: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGenerateAdvice = async () => {
    setIsGenerating(true);
    try {
      const userProfile = `
        Current Role: ${formData.currentRole}
        Years of Experience: ${formData.yearsOfExperience}
        Skills: ${formData.skills}
        Industry: ${formData.industry}
        Education: ${formData.education}
        Certifications: ${formData.certifications}
        Work History: ${formData.workHistory}
        Location: ${formData.location}
        Preferred Work Style: ${formData.preferredWorkStyle}
        Desired Salary: ${formData.desiredSalary}
      `;

      const careerGoals = `
        Career Goals: ${formData.careerGoals}
        Interests: ${formData.interests}
        Challenges: ${formData.challenges}
      `;

      const advice = await provideCareerAdvice(userProfile, careerGoals);
      setCareerAdvice(JSON.parse(advice));
      setActiveTab('plan');
    } catch (error) {
      console.error('Error generating career advice:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const renderAssessment = () => (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold">Career Assessment</h2>
        <p className="text-gray-600 mt-1">
          Tell us about your background and aspirations to receive personalized career guidance.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Current Role"
            name="currentRole"
            value={formData.currentRole}
            onChange={handleInputChange}
            placeholder="e.g., Senior Software Engineer"
          />
          <Input
            label="Years of Experience"
            name="yearsOfExperience"
            type="number"
            value={formData.yearsOfExperience}
            onChange={handleInputChange}
            placeholder="e.g., 5"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Industry"
            name="industry"
            value={formData.industry}
            onChange={handleInputChange}
            placeholder="e.g., Technology"
          />
          <Input
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="e.g., San Francisco, CA"
          />
        </div>

        <Textarea
          label="Skills"
          name="skills"
          value={formData.skills}
          onChange={handleInputChange}
          placeholder="List your technical and soft skills..."
          rows={4}
        />

        <Textarea
          label="Career Goals"
          name="careerGoals"
          value={formData.careerGoals}
          onChange={handleInputChange}
          placeholder="What are your short-term and long-term career goals?"
          rows={4}
        />

        <Textarea
          label="Work History"
          name="workHistory"
          value={formData.workHistory}
          onChange={handleInputChange}
          placeholder="Briefly describe your relevant work experience..."
          rows={4}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Education"
            name="education"
            value={formData.education}
            onChange={handleInputChange}
            placeholder="Highest degree earned"
          />
          <Input
            label="Certifications"
            name="certifications"
            value={formData.certifications}
            onChange={handleInputChange}
            placeholder="Relevant certifications"
          />
        </div>

        <Textarea
          label="Professional Interests"
          name="interests"
          value={formData.interests}
          onChange={handleInputChange}
          placeholder="What aspects of your work interest you the most?"
          rows={4}
        />

        <Textarea
          label="Current Challenges"
          name="challenges"
          value={formData.challenges}
          onChange={handleInputChange}
          placeholder="What challenges are you facing in your career?"
          rows={4}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Preferred Work Style"
            name="preferredWorkStyle"
            value={formData.preferredWorkStyle}
            onChange={handleInputChange}
            placeholder="e.g., Remote, Hybrid, On-site"
          />
          <Input
            label="Desired Salary Range"
            name="desiredSalary"
            value={formData.desiredSalary}
            onChange={handleInputChange}
            placeholder="e.g., $120,000 - $150,000"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="primary"
          onClick={handleGenerateAdvice}
          disabled={isGenerating}
          className="w-full"
          icon={isGenerating ? <Loader className="animate-spin" /> : undefined}
        >
          {isGenerating ? 'Analyzing Your Profile...' : 'Get Career Advice'}
        </Button>
      </CardFooter>
    </Card>
  );

  const renderCareerPlan = () => (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Career Development Plan</h2>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-primary-50 p-6 rounded-lg">
              <div className="flex items-center space-x-3 mb-4">
                <Target className="text-primary-600" size={24} />
                <h3 className="font-semibold">Career Direction</h3>
              </div>
              <p className="text-gray-700">{careerAdvice?.careerDirection}</p>
            </div>

            <div className="bg-secondary-50 p-6 rounded-lg">
              <div className="flex items-center space-x-3 mb-4">
                <TrendingUp className="text-secondary-600" size={24} />
                <h3 className="font-semibold">Growth Potential</h3>
              </div>
              <p className="text-gray-700">{careerAdvice?.growthPotential}</p>
            </div>

            <div className="bg-accent-50 p-6 rounded-lg">
              <div className="flex items-center space-x-3 mb-4">
                <Award className="text-accent-600" size={24} />
                <h3 className="font-semibold">Key Strengths</h3>
              </div>
              <ul className="list-disc list-inside text-gray-700">
                {careerAdvice?.strengths.map((strength: string, index: number) => (
                  <li key={index}>{strength}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-semibold mb-4">Skill Gap Analysis</h3>
            <div className="space-y-4">
              {careerAdvice?.skillGaps.map((gap: any, index: number) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{gap.skill}</span>
                    <span className="text-sm text-gray-500">Priority: {gap.priority}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full" 
                      style={{ width: `${gap.currentLevel}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">{gap.recommendation}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-semibold mb-4">Action Items</h3>
            <div className="space-y-4">
              {careerAdvice?.actionItems.map((item: any, index: number) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-600 text-sm font-medium">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                        Timeline: {item.timeline}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Industry Insights</h2>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold mb-4">Market Trends</h3>
              <ul className="space-y-3">
                {careerAdvice?.marketTrends.map((trend: string, index: number) => (
                  <li key={index} className="flex items-start space-x-3">
                    <TrendingUp size={16} className="text-primary-600 mt-1" />
                    <span>{trend}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold mb-4">Salary Insights</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Current Market Range</span>
                    <span>{careerAdvice?.salaryInsights.marketRange}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-success-600 h-2 rounded-full" 
                      style={{ width: '70%' }}
                    ></div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{careerAdvice?.salaryInsights.analysis}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderLearningResources = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {careerAdvice?.learningPaths.map((path: any, index: number) => (
          <Card key={index} isInteractive>
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                {path.type === 'Technical' ? (
                  <Brain className="text-primary-600\" size={24} />
                ) : path.type === 'Leadership' ? (
                  <Briefcase className="text-primary-600" size={24} />
                ) : (
                  <GraduationCap className="text-primary-600" size={24} />
                )}
              </div>
              <h3 className="font-semibold mb-2">{path.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{path.description}</p>
              <div className="space-y-2">
                {path.resources.map((resource: any, i: number) => (
                  <a
                    key={i}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{resource.title}</span>
                      <ArrowRight size={16} className="text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{resource.duration}</p>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Recommended Certifications</h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {careerAdvice?.certifications.map((cert: any, index: number) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="text-primary-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{cert.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{cert.description}</p>
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center text-sm">
                        <Clock className="text-gray-400 mr-2" size={14} />
                        <span>{cert.duration}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <DollarSign className="text-gray-400 mr-2" size={14} />
                        <span>{cert.cost}</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4"
                      icon={<ExternalLink size={14} />}
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Your AI Career Coach
            </h1>
            <p className="text-xl text-gray-600">
              Get personalized career guidance and actionable steps to achieve your professional goals.
            </p>
          </motion.div>
        </div>

        {careerAdvice && (
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
              <button
                onClick={() => setActiveTab('assessment')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'assessment'
                    ? 'bg-primary-100 text-primary-800'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Assessment
              </button>
              <button
                onClick={() => setActiveTab('plan')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'plan'
                    ? 'bg-primary-100 text-primary-800'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Career Plan
              </button>
              <button
                onClick={() => setActiveTab('resources')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'resources'
                    ? 'bg-primary-100 text-primary-800'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Resources
              </button>
            </div>
          </div>
        )}

        {activeTab === 'assessment' && renderAssessment()}
        {activeTab === 'plan' && careerAdvice && renderCareerPlan()}
        {activeTab === 'resources' && careerAdvice && renderLearningResources()}
      </div>
    </div>
  );
};

export default Coach;