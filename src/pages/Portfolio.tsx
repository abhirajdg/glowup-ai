import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Target, 
  TrendingUp, 
  Share2, 
  Download,
  Briefcase,
  FileText,
  Loader,
  Link as LinkIcon,
  AlertCircle
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardHeader, CardContent, CardFooter } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import { PDFDownloadLink } from '@react-pdf/renderer';
import BrandingGuidelinePDF from '../components/portfolio/BrandingGuidelinePDF';
import { generateBrandingGuidelines } from '../lib/openai';

const Portfolio: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const [brandingData, setBrandingData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    currentRole: '',
    industry: '',
    expertise: '',
    interests: '',
    goals: '',
    targetAudience: '',
    contentTypes: '',
    achievements: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateLinkedInUrl = (url: string) => {
    return url.includes('linkedin.com/in/') || url.includes('linkedin.com/pub/');
  };

  const generateBrandingGuideline = async () => {
    setError(null);
    setIsGenerating(true);
    
    try {
      if (linkedInUrl && !validateLinkedInUrl(linkedInUrl)) {
        throw new Error('Please enter a valid LinkedIn profile URL');
      }

      const input = linkedInUrl ? { linkedInUrl } : formData;
      const guidelines = await generateBrandingGuidelines(input);
      setBrandingData(guidelines);
    } catch (error) {
      console.error('Error generating branding guidelines:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate branding guidelines');
    } finally {
      setIsGenerating(false);
    }
  };

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
              Personal Brand Coach
            </h1>
            <p className="text-xl text-gray-600">
              Create a powerful personal brand strategy to boost your professional visibility and generate leads.
            </p>
          </motion.div>
        </div>

        {!brandingData ? (
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Create Your Brand Strategy</h2>
              <p className="text-gray-600 mt-1">
                Fill in your details or provide your LinkedIn profile URL to get started.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Input
                  label="LinkedIn Profile URL"
                  name="linkedInUrl"
                  value={linkedInUrl}
                  onChange={(e) => setLinkedInUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/yourprofile"
                  leftIcon={<LinkIcon size={16} />}
                  error={error}
                />
                <p className="text-sm text-gray-500">
                  Example: https://linkedin.com/in/username
                </p>
              </div>

              {error && (
                <div className="bg-error-50 text-error-700 p-3 rounded-md flex items-start">
                  <AlertCircle size={16} className="mt-0.5 mr-2 flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or fill in manually</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Current Role"
                  name="currentRole"
                  value={formData.currentRole}
                  onChange={handleInputChange}
                  placeholder="Senior Software Engineer"
                  disabled={!!linkedInUrl}
                />
                <Input
                  label="Industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  placeholder="Technology"
                  disabled={!!linkedInUrl}
                />
              </div>

              <Textarea
                label="Areas of Expertise"
                name="expertise"
                value={formData.expertise}
                onChange={handleInputChange}
                placeholder="List your key technical skills and domain expertise"
                rows={4}
                disabled={!!linkedInUrl}
              />

              <Textarea
                label="Professional Interests"
                name="interests"
                value={formData.interests}
                onChange={handleInputChange}
                placeholder="What topics are you passionate about in your field?"
                rows={4}
                disabled={!!linkedInUrl}
              />

              <Textarea
                label="Career Goals"
                name="goals"
                value={formData.goals}
                onChange={handleInputChange}
                placeholder="What are your short-term and long-term career objectives?"
                rows={4}
                disabled={!!linkedInUrl}
              />

              <Textarea
                label="Target Audience"
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleInputChange}
                placeholder="Who do you want to reach with your content?"
                rows={4}
                disabled={!!linkedInUrl}
              />

              <Textarea
                label="Preferred Content Types"
                name="contentTypes"
                value={formData.contentTypes}
                onChange={handleInputChange}
                placeholder="What types of content do you want to create? (articles, videos, podcasts, etc.)"
                rows={4}
                disabled={!!linkedInUrl}
              />

              <Textarea
                label="Key Achievements"
                name="achievements"
                value={formData.achievements}
                onChange={handleInputChange}
                placeholder="List your notable professional achievements"
                rows={4}
                disabled={!!linkedInUrl}
              />
            </CardContent>
            <CardFooter>
              <Button
                variant="primary"
                onClick={generateBrandingGuideline}
                disabled={isGenerating || (!linkedInUrl && !formData.currentRole)}
                className="w-full"
                icon={isGenerating ? <Loader className="animate-spin" /> : undefined}
              >
                {isGenerating ? 'Generating Guidelines...' : 'Generate Brand Strategy'}
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Users className="text-primary-600" size={24} />
                    <h2 className="text-xl font-semibold">Target Audience Personas</h2>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {brandingData.audiencePersonas.map((persona: any, index: number) => (
                    <div key={index} className="space-y-4">
                      <h3 className="font-semibold text-lg">{persona.title}</h3>
                      <p className="text-gray-600">{persona.description}</p>
                      <div>
                        <h4 className="font-medium mb-2">Key Interests</h4>
                        <div className="flex flex-wrap gap-2">
                          {persona.interests.map((interest: string, i: number) => (
                            <span key={i} className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm">
                              {interest}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="text-primary-600" size={24} />
                    <h2 className="text-xl font-semibold">Content Strategy</h2>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Recommended Topics</h3>
                    <ul className="space-y-2">
                      {brandingData.contentStrategy.topics.map((topic: string, index: number) => (
                        <li key={index} className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Content Formats</h3>
                    {brandingData.contentStrategy.formats.map((format: any, index: number) => (
                      <div key={index} className="mb-4">
                        <h4 className="font-medium">{format.type}</h4>
                        <p className="text-sm text-gray-600">
                          Frequency: {format.frequency}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {format.platforms.map((platform: string, i: number) => (
                            <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                              {platform}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Target className="text-primary-600" size={24} />
                  <h2 className="text-xl font-semibold">Profile Optimization</h2>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Recommended Headline</h3>
                  <p className="text-gray-700">{brandingData.profileOptimization.headline}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Professional Summary</h3>
                  <p className="text-gray-700">{brandingData.profileOptimization.summary}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Keywords to Include</h3>
                  <div className="flex flex-wrap gap-2">
                    {brandingData.profileOptimization.keywords.map((keyword: string, index: number) => (
                      <span key={index} className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Briefcase className="text-primary-600" size={24} />
                  <h2 className="text-xl font-semibold">Lead Generation Strategy</h2>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Portfolio Elements</h3>
                    <ul className="space-y-2">
                      {brandingData.leadGeneration.portfolio.sections.map((section: string, index: number) => (
                        <li key={index} className="flex items-center space-x-2">
                          <FileText size={16} className="text-primary-600" />
                          <span>{section}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Networking Strategy</h3>
                    <ul className="space-y-2">
                      {brandingData.leadGeneration.networking.strategies.map((strategy: string, index: number) => (
                        <li key={index} className="flex items-center space-x-2">
                          <Share2 size={16} className="text-primary-600" />
                          <span>{strategy}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setBrandingData(null);
                    setLinkedInUrl('');
                    setFormData({
                      currentRole: '',
                      industry: '',
                      expertise: '',
                      interests: '',
                      goals: '',
                      targetAudience: '',
                      contentTypes: '',
                      achievements: ''
                    });
                  }}
                >
                  Start Over
                </Button>
                <PDFDownloadLink
                  document={<BrandingGuidelinePDF data={brandingData} />}
                  fileName="personal-branding-guidelines.pdf"
                >
                  {({ loading }) => (
                    <Button
                      variant="primary"
                      icon={loading ? <Loader className="animate-spin" /> : <Download size={16} />}
                    >
                      {loading ? 'Preparing PDF...' : 'Download Guidelines'}
                    </Button>
                  )}
                </PDFDownloadLink>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;