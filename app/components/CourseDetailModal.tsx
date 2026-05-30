import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "./ui/Dialog";
import { Button } from "./ui/Button";
import { Clock, Calendar, BookOpen, Award, CheckCircle, X } from "lucide-react";

interface CourseDetailModalProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  course?: {
    id: string;
    title: string;
    description: string;
    image: string;
    duration: string;
    startDate: string;
    level: string;
    instructor: string;
    prerequisites: string[];
    curriculum: {
      title: string;
      topics: string[];
    }[];
    price: number;
  };
  onEnroll?: (courseId: string) => void;
}

const CourseDetailModal = ({
  isOpen = true,
  onOpenChange,
  course = {
    id: "course-1",
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
  },
  onEnroll = () => console.log("Enrolled in course"),
}: CourseDetailModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Course Image - Left Column */}
          <div className="md:col-span-1">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />

            <div className="mt-4 space-y-3 bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <span className="text-sm">{course.duration}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span className="text-sm">Starts: {course.startDate}</span>
              </div>

              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <span className="text-sm">Level: {course.level}</span>
              </div>

              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-blue-600" />
                <span className="text-sm">Instructor: {course.instructor}</span>
              </div>

              <div className="pt-2">
                <span className="text-2xl font-bold text-blue-700">
                  ${course.price}
                </span>
              </div>
            </div>
          </div>

          {/* Course Details - Right Column */}
          <div className="md:col-span-2">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                {course.title}
              </DialogTitle>
              <DialogDescription className="text-base text-gray-700 mt-2">
                {course.description}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Prerequisites
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                {course.prerequisites.map((prerequisite, index) => (
                  <li key={index} className="text-gray-700">
                    {prerequisite}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Curriculum
              </h3>
              <div className="space-y-4">
                {course.curriculum.map((module, moduleIndex) => (
                  <div key={moduleIndex} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900">
                      {module.title}
                    </h4>
                    <ul className="mt-2 space-y-1">
                      {module.topics.map((topic, topicIndex) => (
                        <li key={topicIndex} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter className="mt-8">
              <Button
                onClick={() => onEnroll(course.id)}
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                size="lg"
              >
                Enroll Now
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseDetailModal;
