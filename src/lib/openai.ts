import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true
});

export const generateBrandingGuidelines = async (input: any) => {
  const isLinkedInUrl = input.linkedInUrl && input.linkedInUrl.includes('linkedin.com');
  
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are an expert personal branding consultant specializing in tech professionals. Create detailed, personalized branding guidelines based on the provided information.
        
        ${isLinkedInUrl ? 'The input contains a LinkedIn profile URL. Analyze the profile structure and common patterns to extract relevant information.' : ''}

        Format the response as a JSON object with the following structure:
        {
          "audiencePersonas": [
            {
              "title": "Persona name",
              "description": "Detailed description",
              "interests": ["Interest 1", "Interest 2"],
              "painPoints": ["Pain point 1", "Pain point 2"],
              "engagementStrategy": "How to engage with this persona"
            }
          ],
          "contentStrategy": {
            "topics": ["Topic 1", "Topic 2"],
            "formats": [
              {
                "type": "Content type",
                "frequency": "How often",
                "platforms": ["Platform 1", "Platform 2"]
              }
            ],
            "bestPractices": ["Practice 1", "Practice 2"]
          },
          "profileOptimization": {
            "headline": "Optimized professional headline",
            "summary": "Professional summary",
            "keywords": ["Keyword 1", "Keyword 2"],
            "recommendations": ["Recommendation 1", "Recommendation 2"]
          },
          "leadGeneration": {
            "portfolio": {
              "sections": ["Section 1", "Section 2"],
              "callToActions": ["CTA 1", "CTA 2"]
            },
            "networking": {
              "strategies": ["Strategy 1", "Strategy 2"],
              "events": ["Event type 1", "Event type 2"]
            }
          }
        }

        Guidelines for generating content:
        1. Audience Personas:
           - Must be based on industry trends and target role requirements
           - Include 2-3 distinct personas with clear characteristics
           - Pain points should be specific and validated by market research
           - Engagement strategies must be platform-specific and actionable

        2. Content Strategy:
           - Topics must be trending in the target industry
           - Content formats should match platform best practices
           - Frequency based on platform algorithms and audience behavior
           - Include specific examples for each content type

        3. Profile Optimization:
           - Headline must include relevant keywords for searchability
           - Summary should tell a compelling career story
           - Keywords based on job market analysis
           - Recommendations must be measurable and time-bound

        4. Lead Generation:
           - Portfolio sections must showcase relevant expertise
           - CTAs should have clear value propositions
           - Networking strategies must be industry-specific
           - Event suggestions based on professional level

        Ensure all recommendations are:
        - Data-driven and industry-validated
        - Specific to career stage and goals
        - Measurable with clear success metrics
        - Aligned with current market demands`
      },
      {
        role: "user",
        content: isLinkedInUrl
          ? `Analyze this LinkedIn profile: ${input.linkedInUrl} and generate personal branding guidelines.`
          : `Generate personal branding guidelines for a professional with the following details:
            Current Role: ${input.currentRole}
            Industry: ${input.industry}
            Expertise: ${input.expertise}
            Interests: ${input.interests}
            Goals: ${input.goals}
            Target Audience: ${input.targetAudience}
            Content Types: ${input.contentTypes}
            Achievements: ${input.achievements}`
      }
    ],
    model: "gpt-4-turbo-preview",
    response_format: { type: "json_object" }
  });

  return JSON.parse(completion.choices[0].message.content || '{}');
};

export const generateResume = async (userInput: string) => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are an expert resume writer. Create a professional resume based on the provided information.
        Format the response as a JSON object with the following structure:
        {
          "name": "Full Name",
          "title": "Professional Title",
          "about": "Professional Summary",
          "contact": {
            "email": "email@example.com",
            "phone": "Phone number",
            "location": "City, State",
            "linkedin": "LinkedIn URL",
            "github": "GitHub URL"
          },
          "experience": [
            {
              "id": "unique-id",
              "company": "Company Name",
              "position": "Job Title",
              "startDate": "Start Date",
              "endDate": "End Date",
              "description": "Job Description",
              "achievements": ["Achievement 1", "Achievement 2"]
            }
          ],
          "education": [
            {
              "id": "unique-id",
              "institution": "School Name",
              "degree": "Degree Type",
              "field": "Field of Study",
              "startDate": "Start Date",
              "endDate": "End Date"
            }
          ],
          "skills": ["Skill 1", "Skill 2"]
        }
        Extract all relevant information from the user input and create a complete, professional resume structure.
        Ensure all dates are formatted consistently (e.g., 'MMM YYYY').
        Generate realistic IDs for experience and education entries.
        If any information is missing, use reasonable defaults based on the context.`
      },
      {
        role: "user",
        content: userInput
      }
    ],
    model: "gpt-4-turbo-preview",
    response_format: { type: "json_object" }
  });

  return JSON.parse(completion.choices[0].message.content || '{}');
};

export const generateCoverLetter = async (userInput: string, jobDescription: string) => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are an expert cover letter writer. Create a compelling cover letter that matches the candidate's experience with the job requirements."
      },
      {
        role: "user",
        content: `Create a cover letter for this candidate: ${userInput}\n\nJob Description: ${jobDescription}`
      }
    ],
    model: "gpt-4-turbo-preview",
  });

  return completion.choices[0].message.content;
};

export const conductMockInterview = async (userAnswer: string, jobRole: string) => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are an expert interviewer. Provide detailed feedback on the candidate's answer."
      },
      {
        role: "user",
        content: `Candidate's answer for ${jobRole} position: ${userAnswer}`
      }
    ],
    model: "gpt-4-turbo-preview",
  });

  return completion.choices[0].message.content;
};

export const provideCareerAdvice = async (userProfile: string, careerGoals: string) => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are an expert career coach. Provide personalized career advice and identify skill gaps."
      },
      {
        role: "user",
        content: `User Profile: ${userProfile}\n\nCareer Goals: ${careerGoals}`
      }
    ],
    model: "gpt-4-turbo-preview",
  });

  return completion.choices[0].message.content;
};