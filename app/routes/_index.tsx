import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Hero from "../components/Hero";
import WhyChooseUs from "../components/WhyChooseUs";
import CourseCatalog from "../components/CourseCatalog";
import CourseDetailModal from "../components/CourseDetailModal";
import EnrollmentForm from "../components/EnrollmentForm";
import EnrollmentConfirmation from "../components/EnrollmentConfirmation";
import Testimonials from "../components/Testimonials";
import Instructors from "../components/Instructors";
import Contact from "../components/Contact";
// import Footer from "../components/Footer";

const Index = () => {
  // const navigate = useNavigate();
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false);
  const [showEnrollmentConfirmation, setShowEnrollmentConfirmation] =
    useState(false);

  // Mock course data for the selected course
  const selectedCourse = {
    id: selectedCourseId || "course-1",
    title: "Advanced JavaScript Programming",
    description:
      "Master modern JavaScript concepts and techniques to build professional web applications. This comprehensive course covers ES6+, asynchronous programming, functional programming paradigms, and advanced DOM manipulation.",
    image:
      "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&q=80",
    duration: "8 weeks",
    startDate: "June 15, 2023",
    level: "Intermediate",
    instructor: "Dr. Sarah Johnson",
    prerequisites: [
      "Basic JavaScript knowledge",
      "HTML & CSS fundamentals",
      "Some programming experience",
    ],
    curriculum: [
      {
        title: "Module 1: ES6+ Features",
        topics: [
          "Arrow functions",
          "Destructuring",
          "Spread/Rest operators",
          "Template literals",
          "Classes",
        ],
      },
      {
        title: "Module 2: Asynchronous JavaScript",
        topics: ["Promises", "Async/Await", "Fetch API", "Error handling"],
      },
      {
        title: "Module 3: Functional Programming",
        topics: [
          "Pure functions",
          "Higher-order functions",
          "Immutability",
          "Composition",
        ],
      },
    ],
    price: 499,
  };

  // Handle viewing course details
  const handleViewCourseDetails = (courseId: string) => {
    setSelectedCourseId(courseId);
    setShowCourseModal(true);
  };

  // Handle enrollment process
  const handleEnrollCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setShowCourseModal(false);
    setShowEnrollmentForm(true);
  };

  // Handle enrollment form submission
  const handleEnrollmentSubmit = () => {
    setShowEnrollmentForm(false);
    setShowEnrollmentConfirmation(true);
  };

  // Handle returning to course catalog
  const handleViewOtherCourses = () => {
    setShowEnrollmentConfirmation(false);
    const courseCatalog = document.getElementById("courses");
    if (courseCatalog) {
      courseCatalog.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle returning to homepage
  const handleReturnHome = () => {
    setShowEnrollmentConfirmation(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header
        logo="GreenProtons"
        logoImage="https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=50&q=80"
        navLinks={[
          { label: "Home", href: "/" },
          { label: "Courses", href: "#courses" },
          { label: "Instructors", href: "#about" },
          { label: "Testimonials", href: "#testimonials" },
          { label: "Contact", href: "#contact" },
        ]}
      />

      {/* Main Content */}
      <main>
        <Hero
          title="Master Programming Skills for the Future"
          description="Join our comprehensive programming courses designed to transform beginners into industry-ready professionals. Learn from expert instructors with hands-on projects and personalized guidance."
          ctaText="Explore Courses"
          onCtaClick={() => {
            const courseCatalog = document.getElementById("courses");
            if (courseCatalog) {
              courseCatalog.scrollIntoView({ behavior: "smooth" });
            }
          }}
          backgroundImage="https://images.unsplash.com/photo-1550439062-609e1531270e?w=1200&q=80"
        />
        <WhyChooseUs />
        <CourseCatalog onViewDetails={handleViewCourseDetails} />
        <Instructors />
        <Testimonials />
        <Contact />

        {showCourseModal && (
          <CourseDetailModal
            isOpen={showCourseModal}
            onOpenChange={setShowCourseModal}
            course={selectedCourse}
            onEnroll={handleEnrollCourse}
          />
        )}

        {showEnrollmentForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <EnrollmentForm
                courseId={selectedCourseId || undefined}
                onSubmitSuccess={handleEnrollmentSubmit}
                isOpen={showEnrollmentForm}
              />
            </div>
          </div>
        )}

        {showEnrollmentConfirmation && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
              <EnrollmentConfirmation
                studentName="John Doe"
                courseName={selectedCourse.title}
                courseId={selectedCourse.id}
                startDate={selectedCourse.startDate}
                instructorName={selectedCourse.instructor}
                onViewOtherCourses={handleViewOtherCourses}
                onReturnHome={handleReturnHome}
              />
            </div>
          </div>
        )}
      </main>

      {/* <Footer
        companyName="Programming Institute"
        companyDescription="Empowering the next generation of developers with cutting-edge programming education and hands-on learning experiences."
        contactEmail="contact@programminginstitute.com"
        contactPhone="+1 (555) 123-4567"
        address="123 Coding Avenue, Tech City, TC 98765"
      /> */}
    </div>
  );
};

export default Index;
