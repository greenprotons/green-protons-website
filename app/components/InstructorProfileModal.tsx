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
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { Linkedin, Twitter, Globe, X } from "lucide-react";

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

interface InstructorProfileModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  instructor: Instructor;
}

const InstructorProfileModal = ({
  isOpen,
  onOpenChange,
  instructor,
}: InstructorProfileModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Instructor Image and Basic Info - Left Column */}
          <div className="md:col-span-1">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-32 w-32 mb-4 ring-2 ring-offset-2 ring-blue-500">
                <AvatarImage src={instructor.avatar} alt={instructor.name} />
                <AvatarFallback>{instructor.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <h2 className="text-xl font-bold text-gray-900">
                {instructor.name}
              </h2>
              <p className="text-blue-600 font-medium">{instructor.title}</p>

              {instructor.socialLinks && (
                <div className="flex justify-center space-x-4 mt-4">
                  {instructor.socialLinks.linkedin && (
                    <a
                      href={instructor.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      <Linkedin size={20} />
                    </a>
                  )}
                  {instructor.socialLinks.twitter && (
                    <a
                      href={instructor.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-blue-400 transition-colors"
                    >
                      <Twitter size={20} />
                    </a>
                  )}
                  {instructor.socialLinks.website && (
                    <a
                      href={instructor.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-gray-800 transition-colors"
                    >
                      <Globe size={20} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Instructor Details - Right Column */}
          <div className="md:col-span-2">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900 sr-only">
                {instructor.name}
              </DialogTitle>
              <DialogDescription className="text-base text-gray-700 mt-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Biography
                </h3>
                <p className="mb-6">{instructor.bio}</p>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Areas of Expertise
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {instructor.expertise.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {instructor.education && (
                  <>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Education
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 mb-6">
                      {instructor.education.map((edu, index) => (
                        <li key={index} className="text-gray-700">
                          {edu}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {instructor.experience && (
                  <>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Professional Experience
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 mb-6">
                      {instructor.experience.map((exp, index) => (
                        <li key={index} className="text-gray-700">
                          {exp}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="mt-6">
              <Button
                onClick={() => onOpenChange(false)}
                variant="outline"
                className="w-full md:w-auto"
              >
                Close
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InstructorProfileModal;
