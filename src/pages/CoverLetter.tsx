import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Share, Edit, Loader, CheckSquare } from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardHeader, CardContent, CardFooter } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import { generateCoverLetter } from '../lib/openai';

const CoverLetter: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [coverLetter, setCoverLetter] = useState<string>('');
  const [formData, setFormData] = useState({
    fullName: '',
    currentTitle: '',
    email: '',
    phone: '',
    companyName: '',
    hiringManager: '',
    jobTitle: '',
    jobDescription: '',
    relevantExperience: '',
    whyInterested: '',
    additionalInfo: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGenerateCoverLetter = async () => {
    setIsGenerating(true);
    try {
      const userInput = `
        Candidate Information:
        Name: ${formData.fullName}
        Current Title: ${formData.currentTitle}
        Email: ${formData.email}
        Phone: ${formData.phone}

        Job Details:
        Company: ${formData.companyName}
        Hiring Manager: ${formData.hiringManager}
        Job Title: ${formData.jobTitle}

        Job Description:
        ${formData.jobDescription}

        Relevant Experience:
        ${formData.relevantExperience}

        Why Interested:
        ${formData.whyInterested}

        Additional Information:
        ${formData.additionalInfo}
      `;

      const generatedLetter = await generateCoverLetter(userInput, formData.jobDescription);
      setCoverLetter(generatedLetter);
    } catch (error) {
      console.error('Error generating cover letter:', error);
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
                <h2 className="text-xl font-semibold">Cover Letter Generator</h2>
                <p className="text-gray-600 mt-1">
                  Create a personalized cover letter that highlights your qualifications and enthusiasm for the role.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                  />
                  <Input
                    label="Current Title"
                    name="currentTitle"
                    value={formData.currentTitle}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Company Name"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Target Company Inc."
                  />
                  <Input
                    label="Hiring Manager's Name"
                    name="hiringManager"
                    value={formData.hiringManager}
                    onChange={handleInputChange}
                    placeholder="Jane Smith"
                  />
                </div>

                <Input
                  label="Job Title"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  placeholder="Senior Software Engineer"
                />

                <Textarea
                  label="Job Description"
                  name="jobDescription"
                  value={formData.jobDescription}
                  onChange={handleInputChange}
                  placeholder="Paste the job description here..."
                  rows={6}
                />

                <Textarea
                  label="Relevant Experience"
                  name="relevantExperience"
                  value={formData.relevantExperience}
                  onChange={handleInputChange}
                  placeholder="Describe your relevant experience and achievements..."
                  rows={4}
                />

                <Textarea
                  label="Why are you interested in this role?"
                  name="whyInterested"
                  value={formData.whyInterested}
                  onChange={handleInputChange}
                  placeholder="Explain why you're interested in this position and company..."
                  rows={4}
                />

                <Textarea
                  label="Additional Information"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  placeholder="Any other information you'd like to include..."
                  rows={4}
                />
              </CardContent>
              <CardFooter>
                <Button
                  variant="primary"
                  onClick={handleGenerateCoverLetter}
                  disabled={isGenerating}
                  className="w-full"
                  icon={isGenerating ? <Loader className="animate-spin" /> : undefined}
                >
                  {isGenerating ? 'Generating Cover Letter...' : 'Generate Cover Letter'}
                </Button>
              </CardFooter>
            </Card>

            {coverLetter && (
              <Card className="mt-8">
                <CardHeader>
                  <h2 className="text-xl font-semibold">Generated Cover Letter</h2>
                </CardHeader>
                <CardContent>
                  <div className="bg-white p-6 rounded-lg border border-gray-200 whitespace-pre-wrap font-serif">
                    {coverLetter}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-4">
                  <Button
                    variant="outline"
                    icon={<Share size={16} />}
                  >
                    Share
                  </Button>
                  <Button
                    variant="primary"
                    icon={<Download size={16} />}
                  >
                    Download
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>

          <div className="lg:col-span-1 space-y-8">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Writing Tips</h2>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckSquare size={16} className="text-primary-600 mt-1 mr-2" />
                    <span className="text-sm">Address the hiring manager by name whenever possible</span>
                  </li>
                  <li className="flex items-start">
                    <CheckSquare size={16} className="text-primary-600 mt-1 mr-2" />
                    <span className="text-sm">Customize each letter for the specific job and company</span>
                  </li>
                  <li className="flex items-start">
                    <CheckSquare size={16} className="text-primary-600 mt-1 mr-2" />
                    <span className="text-sm">Highlight relevant achievements and experiences</span>
                  </li>
                  <li className="flex items-start">
                    <CheckSquare size={16} className="text-primary-600 mt-1 mr-2" />
                    <span className="text-sm">Show enthusiasm for the role and company</span>
                  </li>
                  <li className="flex items-start">
                    <CheckSquare size={16} className="text-primary-600 mt-1 mr-2" />
                    <span className="text-sm">Keep it concise - aim for one page</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Format Preview</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-gray-600">
                  <p>Your cover letter will include:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Professional header with contact information</li>
                    <li>Formal greeting to hiring manager</li>
                    <li>Opening paragraph introducing yourself</li>
                    <li>Body paragraphs highlighting experience</li>
                    <li>Closing paragraph with call to action</li>
                    <li>Professional signature</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetter;