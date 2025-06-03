import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import Button from '../components/ui/Button';
import Card, { CardHeader, CardContent, CardFooter } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import { FileText, Download, Share, Edit, CheckSquare, Target, Loader } from 'lucide-react';
import ResumePreview from '../components/resume/ResumePreview';
import { generateResume } from '../lib/openai';

const Resume: React.FC = () => {
  const { portfolioData, setPortfolioData } = useAppContext();
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    workExperience: '',
    education: '',
    skills: '',
    achievements: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGenerateResume = async () => {
    setIsGenerating(true);
    try {
      const userInput = `
        Name: ${formData.name}
        Title: ${formData.title}
        Email: ${formData.email}
        Phone: ${formData.phone}
        Location: ${formData.location}
        LinkedIn: ${formData.linkedin}
        GitHub: ${formData.github}

        Work Experience:
        ${formData.workExperience}

        Education:
        ${formData.education}

        Skills:
        ${formData.skills}

        Key Achievements:
        ${formData.achievements}
      `;

      const generatedData = await generateResume(userInput);
      setPortfolioData(generatedData);
    } catch (error) {
      console.error('Error generating resume:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Generate Your Resume</h2>
                <p className="text-gray-600 mt-1">
                  Fill in your details and let AI create a professional resume for you.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                  />
                  <Input
                    label="Professional Title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Software Engineer"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                  />
                  <Input
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(555) 123-4567"
                  />
                </div>

                <Input
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="City, State"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="LinkedIn URL"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    placeholder="linkedin.com/in/johndoe"
                  />
                  <Input
                    label="GitHub URL"
                    name="github"
                    value={formData.github}
                    onChange={handleInputChange}
                    placeholder="github.com/johndoe"
                  />
                </div>
                
                <Textarea
                  label="Work Experience"
                  name="workExperience"
                  value={formData.workExperience}
                  onChange={handleInputChange}
                  placeholder="Describe your work experience, including company names, positions, dates, and key achievements"
                  rows={6}
                />
                
                <Textarea
                  label="Education"
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  placeholder="List your educational background, including institutions, degrees, and graduation dates"
                  rows={4}
                />
                
                <Input
                  label="Skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  placeholder="Enter your skills, separated by commas"
                />
                
                <Textarea
                  label="Key Achievements"
                  name="achievements"
                  value={formData.achievements}
                  onChange={handleInputChange}
                  placeholder="List your notable achievements and accomplishments"
                  rows={4}
                />
              </CardContent>
              <CardFooter>
                <Button
                  variant="primary"
                  onClick={handleGenerateResume}
                  disabled={isGenerating}
                  className="w-full"
                  icon={isGenerating ? <Loader className="animate-spin" /> : undefined}
                >
                  {isGenerating ? 'Generating Resume...' : 'Generate Resume'}
                </Button>
              </CardFooter>
            </Card>
            
            {portfolioData && <ResumePreview portfolioData={portfolioData} />}
          </div>
          
          <div className="lg:col-span-1 space-y-8">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Resume Actions</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  variant="primary"
                  className="w-full justify-start"
                  icon={<Download size={16} />}
                >
                  Download as PDF
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  icon={<Share size={16} />}
                >
                  Share Resume
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  icon={<Edit size={16} />}
                >
                  Edit Content
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Tips for Success</h2>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckSquare size={16} className="text-primary-600 mt-1 mr-2" />
                    <span className="text-sm">Use action verbs to describe your achievements</span>
                  </li>
                  <li className="flex items-start">
                    <CheckSquare size={16} className="text-primary-600 mt-1 mr-2" />
                    <span className="text-sm">Include specific metrics and results</span>
                  </li>
                  <li className="flex items-start">
                    <CheckSquare size={16} className="text-primary-600 mt-1 mr-2" />
                    <span className="text-sm">Keep descriptions clear and concise</span>
                  </li>
                  <li className="flex items-start">
                    <CheckSquare size={16} className="text-primary-600 mt-1 mr-2" />
                    <span className="text-sm">Tailor your resume to the job description</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;