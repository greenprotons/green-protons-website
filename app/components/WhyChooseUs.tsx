import React from "react";
import { Card, CardContent } from "./ui/Card";
import {
  Code,
  Users,
  Briefcase,
  Award,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  colorScheme: {
    bgColor: string;
    iconColor: string;
  };
}

const FeatureCard = ({
  icon,
  title,
  description,
  colorScheme,
}: FeatureCardProps) => {
  return (
    <Card
      className="bg-white shadow-md hover:shadow-xl transition-all duration-300 h-full"
      data-aos="fade-up"
    >
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className={`p-3 ${colorScheme.bgColor} rounded-full mb-4`}>
            <div className={`${colorScheme.iconColor}`}>{icon}</div>
          </div>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

interface WhyChooseUsSectionProps {
  title?: string;
  subtitle?: string;
  features?: Array<{
    icon: keyof typeof iconComponents;
    title: string;
    description: string;
    colorScheme?: {
      bgColor: string;
      iconColor: string;
    };
  }>;
  experienceYears?: number;
  studentsCount?: number;
  coursesCount?: number;
  instructorsCount?: number;
}

const iconComponents = {
  Code: <Code size={24} />,
  Users: <Users size={24} />,
  Briefcase: <Briefcase size={24} />,
  Award: <Award size={24} />,
  CheckCircle: <CheckCircle size={24} />,
  TrendingUp: <TrendingUp size={24} />,
};

const colorSchemes = {
  software: { bgColor: "bg-blue-100", iconColor: "text-blue-600" },
  development: { bgColor: "bg-green-100", iconColor: "text-green-600" },
  management: { bgColor: "bg-purple-100", iconColor: "text-purple-600" },
  agile: { bgColor: "bg-yellow-100", iconColor: "text-yellow-600" },
  curriculum: { bgColor: "bg-red-100", iconColor: "text-red-600" },
  career: { bgColor: "bg-indigo-100", iconColor: "text-indigo-600" },
};

const WhyChooseUs = ({
  title = "Our Core Competencies",
  subtitle = "With over two decades of industry experience, our team of experts provides unparalleled education in software development and project management.",
  features = [
    {
      icon: "Code",
      title: "Expert Software Architecture",
      description:
        "Learn from architects with 20+ years designing scalable, maintainable systems across various industries. Master patterns, practices, and architectural thinking that form the foundation of robust software.",
      colorScheme: colorSchemes.software,
    },
    {
      icon: "Briefcase",
      title: "Real-World Development Experience",
      description:
        "Our instructors bring decades of hands-on development experience from startups to enterprise organizations. Benefit from practical knowledge of evolving technologies, frameworks, and best practices.",
      colorScheme: colorSchemes.development,
    },
    {
      icon: "Users",
      title: "Project Management Mastery",
      description:
        "Gain insights from certified project managers with experience leading complex software initiatives. Learn methodologies, risk management, and communication skills essential for successful project delivery.",
      colorScheme: colorSchemes.management,
    },
    {
      icon: "Award",
      title: "Agile & Scrum Expertise",
      description:
        "Train with certified Scrum Masters who have implemented agile practices across hundreds of projects. Understand how to apply agile principles to deliver value incrementally and adapt to changing requirements.",
      colorScheme: colorSchemes.agile,
    },
    {
      icon: "CheckCircle",
      title: "Industry-Relevant Curriculum",
      description:
        "Our courses are continuously updated to reflect current industry demands and emerging technologies. Learn skills that employers actually need, taught by professionals who use them daily.",
      colorScheme: colorSchemes.curriculum,
    },
    {
      icon: "TrendingUp",
      title: "Career Growth Focus",
      description:
        "Beyond technical skills, we emphasize career development, leadership, and soft skills that help you advance professionally. Our graduates consistently achieve senior and leadership positions.",
      colorScheme: colorSchemes.career,
    },
  ],
  experienceYears = 20,
  studentsCount = 15000,
  coursesCount = 50,
  instructorsCount = 25,
}: WhyChooseUsSectionProps) => {
  return (
    <section
      className="py-16 px-4 bg-gradient-to-b from-white to-gray-50"
      id="why-choose-us"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div
            className="bg-white p-6 rounded-lg shadow-md text-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
              {experienceYears}+
            </div>
            <div className="text-sm text-gray-600">Years Experience</div>
          </div>
          <div
            className="bg-white p-6 rounded-lg shadow-md text-center"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
              {studentsCount}+
            </div>
            <div className="text-sm text-gray-600">Students Taught</div>
          </div>
          <div
            className="bg-white p-6 rounded-lg shadow-md text-center"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
              {coursesCount}+
            </div>
            <div className="text-sm text-gray-600">Specialized Courses</div>
          </div>
          <div
            className="bg-white p-6 rounded-lg shadow-md text-center"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
              {instructorsCount}+
            </div>
            <div className="text-sm text-gray-600">Expert Instructors</div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={iconComponents[feature.icon]}
              title={feature.title}
              description={feature.description}
              colorScheme={feature.colorScheme || colorSchemes.software}
            />
          ))}
        </div>

        {/* Testimonial Highlight */}
        <div
          className="mt-16 bg-blue-600 text-white p-8 rounded-xl shadow-lg"
          data-aos="fade-up"
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/4 mb-6 md:mb-0 flex justify-center">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=ceo"
                alt="CEO"
                className="w-24 h-24 rounded-full bg-white p-1"
              />
            </div>
            <div className="md:w-3/4 md:pl-8">
              <blockquote className="text-lg italic mb-4">
                &quot;For over two decades, I&apos;ve led teams building enterprise
                software across finance, healthcare, and e-commerce. Our
                institute distills this experience into practical,
                career-focused education that prepares you for real-world
                challenges. We don&apos;t just teach coding—we mentor the next
                generation of technical leaders.&quot;
              </blockquote>
              <div className="font-semibold">Dr. James Wilson</div>
              <div className="text-blue-200 text-sm">
                Founder & Chief Instructor • Former CTO at TechGlobal
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
