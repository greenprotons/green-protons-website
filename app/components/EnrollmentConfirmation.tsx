import React from "react";
import { Button } from "./ui/Button";
import { CheckCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/Card";

interface EnrollmentConfirmationProps {
  studentName?: string;
  courseName?: string;
  courseId?: string;
  enrollmentDate?: string;
  startDate?: string;
  instructorName?: string;
  onViewOtherCourses?: () => void;
  onReturnHome?: () => void;
}

const EnrollmentConfirmation = ({
  studentName = "John Doe",
  courseName = "Advanced JavaScript Programming",
  courseId = "JS-2023",
  enrollmentDate = new Date().toLocaleDateString(),
  startDate = new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000,
  ).toLocaleDateString(),
  instructorName = "Dr. Sarah Johnson",
  onViewOtherCourses = () => {},
  onReturnHome = () => {},
}: EnrollmentConfirmationProps) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onReturnHome();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <Card
        className="w-full max-w-2xl mx-auto bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader className="flex flex-col items-center text-center">
          <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
            Enrollment Successful!
          </CardTitle>
          <CardDescription className="text-gray-600">
            Thank you for enrolling in our course. Your registration has been
            confirmed.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="bg-gray-50 p-6 rounded-md mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Enrollment Details
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Student Name:</span>
                <span className="font-medium text-gray-900">{studentName}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Course:</span>
                <span className="font-medium text-gray-900">{courseName}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Course ID:</span>
                <span className="font-medium text-gray-900">{courseId}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Enrollment Date:</span>
                <span className="font-medium text-gray-900">
                  {enrollmentDate}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Start Date:</span>
                <span className="font-medium text-gray-900">{startDate}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Instructor:</span>
                <span className="font-medium text-gray-900">
                  {instructorName}
                </span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-6">
              A confirmation email has been sent to your registered email
              address with additional information.
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center pb-6">
          <Button
            variant="default"
            onClick={onViewOtherCourses}
            className="w-full sm:w-auto"
          >
            View Other Courses
          </Button>

          <Button
            variant="outline"
            onClick={onReturnHome}
            className="w-full sm:w-auto"
          >
            Return to Homepage
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EnrollmentConfirmation;
