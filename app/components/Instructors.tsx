import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/Card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import {
  Linkedin,
  Twitter,
  Globe,
  ChevronLeft,
  ChevronRight,
  UserRound,
} from "lucide-react";
import InstructorProfileModal from "./InstructorProfileModal";
import { Button } from "./ui/Button";

interface Instructor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  bio: string;
  expertise: string[];
  education?: string[];
  experience?: string[];
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

interface InstructorsSectionProps {
  instructors?: Instructor[];
}

const Instructors = ({
  instructors = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      title: "Lead JavaScript Instructor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      bio: "Dr. Johnson has over 10 years of experience in web development and has worked with major tech companies before joining our teaching team.",
      expertise: ["JavaScript", "React", "Node.js", "Web Performance"],
      education: [
        "Ph.D. in Computer Science, Stanford University",
        "M.S. in Software Engineering, MIT",
        "B.S. in Computer Science, UC Berkeley",
      ],
      experience: [
        "Senior Frontend Engineer at Google (2015-2020)",
        "Software Architect at Microsoft (2010-2015)",
        "Web Developer at Amazon (2008-2010)",
      ],
      socialLinks: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        website: "https://example.com",
      },
    },
    {
      id: "2",
      name: "Prof. Michael Rodriguez",
      title: "Data Science Specialist",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      bio: "With a PhD in Computer Science and extensive research in machine learning, Prof. Rodriguez brings academic rigor and practical insights to our data science courses.",
      expertise: ["Python", "Machine Learning", "Data Analysis", "AI"],
      education: [
        "Ph.D. in Computer Science, Harvard University",
        "M.S. in Statistics, UCLA",
        "B.S. in Mathematics, University of Michigan",
      ],
      experience: [
        "Lead Data Scientist at Netflix (2018-2023)",
        "Research Scientist at IBM (2013-2018)",
        "Data Analyst at Facebook (2010-2013)",
      ],
      socialLinks: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
      },
    },
    {
      id: "3",
      name: "Emily Chen",
      title: "Frontend Development Expert",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
      bio: "Emily has led frontend teams at several startups and specializes in creating beautiful, performant user interfaces with modern frameworks.",
      expertise: ["React", "CSS", "UI/UX", "Performance Optimization"],
      education: [
        "M.S. in Human-Computer Interaction, Carnegie Mellon University",
        "B.A. in Design, Rhode Island School of Design",
      ],
      experience: [
        "UI/UX Lead at Airbnb (2019-2023)",
        "Frontend Developer at Uber (2016-2019)",
        "UI Designer at Twitter (2014-2016)",
      ],
      socialLinks: {
        linkedin: "https://linkedin.com",
        website: "https://example.com",
      },
    },
    {
      id: "4",
      name: "John Smith",
      title: "Mobile Development Instructor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      bio: "John brings years of industry experience building mobile applications for iOS and Android platforms using both native and cross-platform technologies.",
      expertise: ["Flutter", "React Native", "iOS", "Android"],
      socialLinks: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
      },
    },
    {
      id: "5",
      name: "Dr. Lisa Wang",
      title: "Cybersecurity Expert",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
      bio: "Dr. Wang is a renowned cybersecurity expert with experience in both corporate and government sectors, specializing in ethical hacking and security architecture.",
      expertise: [
        "Cybersecurity",
        "Ethical Hacking",
        "Network Security",
        "Cryptography",
      ],
      socialLinks: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
      },
    },
    {
      id: "6",
      name: "Robert Taylor",
      title: "DevOps Specialist",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert",
      bio: "Robert has led DevOps transformations at several Fortune 500 companies and brings practical knowledge of modern infrastructure and deployment practices.",
      expertise: ["Docker", "Kubernetes", "CI/CD", "Cloud Architecture"],
      socialLinks: {
        linkedin: "https://linkedin.com",
        website: "https://example.com",
      },
    },
  ],
}: InstructorsSectionProps) => {
  const [selectedInstructor, setSelectedInstructor] =
    useState<Instructor | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const itemsPerView = 3;

  const handleViewProfile = (instructor: Instructor) => {
    setSelectedInstructor(instructor);
    setShowProfileModal(true);
  };

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    if (currentIndex + 1 < instructors.length - (itemsPerView - 1)) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back to the beginning
    }
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      // Go to the last possible index
      setCurrentIndex(instructors.length - itemsPerView);
    }
  };

  useEffect(() => {
    // Reset animation state after transition completes
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  // Calculate which instructors to show with a sliding window
  const endIndex = Math.min(currentIndex + itemsPerView, instructors.length);
  const visibleInstructors = instructors.slice(currentIndex, endIndex);

  // Fill remaining slots if we're at the end
  const fillerCount = itemsPerView - visibleInstructors.length;
  const displayInstructors = [...visibleInstructors];
  if (fillerCount > 0) {
    displayInstructors.push(...instructors.slice(0, fillerCount));
  }

  return (
    <>
      <section
        className="py-16 px-4 bg-gradient-to-b from-blue-50 to-white"
        id="about"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet Our Expert Instructors
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Learn from industry professionals with years of real-world
              experience and a passion for teaching.
            </p>
          </div>

          <div className="relative">
            {/* Carousel Controls - Left */}
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full hover:bg-blue-100 shadow-md"
              aria-label="Previous instructors"
              disabled={isAnimating}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            {/* Carousel Container */}
            <div className="overflow-hidden mx-12">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(0px)` }}
              >
                {displayInstructors.map((instructor, index) => (
                  <div
                    key={`${instructor.id}-${index}`}
                    className="w-full md:w-1/3 px-3 flex-shrink-0 transition-opacity duration-500"
                    data-aos="fade-up"
                    data-aos-delay={`${index * 100}`}
                  >
                    <Card
                      className="bg-white shadow-sm transition-all duration-300 h-full flex flex-col hover:bg-blue-50 cursor-pointer"
                      onClick={() => handleViewProfile(instructor)}
                    >
                      <CardContent className="pt-6 px-6 pb-6 flex flex-col h-full">
                        <div className="flex flex-col items-center text-center mb-4">
                          <Avatar className="h-24 w-24 mb-4 ring-2 ring-offset-2 ring-blue-500">
                            <AvatarImage
                              src={instructor.avatar}
                              alt={instructor.name}
                            />
                            <AvatarFallback>
                              {instructor.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-lg h-6">
                              {instructor.name}
                            </h3>
                            <p className="text-blue-600 text-sm font-medium h-5">
                              {instructor.title}
                            </p>
                          </div>
                        </div>

                        <p className="text-gray-600 text-sm mb-4 h-24 overflow-y-auto">
                          {instructor.bio}
                        </p>

                        <div className="mb-4 h-24">
                          <h4 className="text-sm font-semibold mb-2">
                            Areas of Expertise:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {instructor.expertise.map((skill, index) => (
                              <span
                                key={index}
                                className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full hover:bg-blue-100 hover:text-blue-800 transition-colors"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Controls - Right */}
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full hover:bg-blue-100 shadow-md"
              aria-label="Next instructors"
              disabled={isAnimating}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({
                length: instructors.length - itemsPerView + 1,
              }).map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all ${currentIndex === index ? "bg-blue-600 w-4" : "bg-gray-300"}`}
                  onClick={() => {
                    setIsAnimating(true);
                    setCurrentIndex(index);
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Instructor Profile Modal */}
      {selectedInstructor && (
        <InstructorProfileModal
          isOpen={showProfileModal}
          onOpenChange={setShowProfileModal}
          instructor={selectedInstructor}
        />
      )}
    </>
  );
};

export default Instructors;
