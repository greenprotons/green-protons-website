import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/Card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/Button";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  course?: string;
}

interface TestimonialsProps {
  testimonials?: Testimonial[];
}

const Testimonials = ({
  testimonials = [
    {
      id: "1",
      name: "Sarah Johnson",
      role: "Web Developer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      content:
        "The Advanced JavaScript course completely transformed my career. The instructor was incredibly knowledgeable and the hands-on projects gave me real-world experience that I use daily in my job.",
      course: "Advanced JavaScript Programming",
    },
    {
      id: "2",
      name: "Michael Chen",
      role: "Data Scientist",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      content:
        "As someone transitioning into data science, the Python course provided exactly what I needed. The curriculum was comprehensive and the support from instructors was exceptional.",
      course: "Python for Data Science",
    },
    {
      id: "3",
      name: "Jessica Williams",
      role: "Frontend Developer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jessica",
      content:
        "I've taken several online courses, but none compare to the quality of instruction I received here. The React course helped me land my dream job at a tech startup.",
      course: "Advanced React & Redux",
    },
    {
      id: "4",
      name: "David Thompson",
      role: "Mobile Developer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      content:
        "The Flutter course was incredibly practical and well-structured. I was able to build and publish my first app within weeks of completing the course.",
      course: "Mobile App Development with Flutter",
    },
    {
      id: "5",
      name: "Emma Rodriguez",
      role: "DevOps Engineer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
      content:
        "The DevOps Engineering course gave me the skills to implement CI/CD pipelines and containerization strategies that have dramatically improved our deployment process.",
      course: "DevOps Engineering",
    },
    {
      id: "6",
      name: "Alex Kim",
      role: "UI/UX Designer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      content:
        "The UI/UX Design Fundamentals course provided me with a solid foundation in design principles and practical skills that I use every day in my design work.",
      course: "UI/UX Design Fundamentals",
    },
  ],
}: TestimonialsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const itemsPerView = 3;

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    if (currentIndex + itemsPerView < testimonials.length) {
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
      setCurrentIndex(testimonials.length - itemsPerView);
    }
  };

  useEffect(() => {
    // Reset animation state after transition completes
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  // Calculate which testimonials to show with a sliding window
  const endIndex = Math.min(currentIndex + itemsPerView, testimonials.length);
  const visibleTestimonials = testimonials.slice(currentIndex, endIndex);

  // Fill remaining slots if we're at the end
  const fillerCount = itemsPerView - visibleTestimonials.length;
  const displayTestimonials = [...visibleTestimonials];
  if (fillerCount > 0) {
    displayTestimonials.push(...testimonials.slice(0, fillerCount));
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-indigo-50 to-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Student Success Stories
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from our graduates about how our courses have helped them
            advance their careers and achieve their goals.
          </p>
        </div>

        <div className="relative">
          {/* Carousel Controls - Left */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full hover:bg-blue-100 shadow-md"
            aria-label="Previous testimonials"
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
              {displayTestimonials.map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${index}`}
                  className="w-full md:w-1/3 px-4 flex-shrink-0 transition-opacity duration-500"
                >
                  <Card className="bg-white shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
                    <CardContent className="pt-6 px-6 pb-6 flex flex-col flex-grow">
                      <div className="flex flex-col items-center text-center mb-4">
                        <Avatar className="h-16 w-16 mb-4 ring-2 ring-offset-2 ring-blue-500 transition-all duration-300 hover:ring-4">
                          <AvatarImage
                            src={testimonial.avatar}
                            alt={testimonial.name}
                          />
                          <AvatarFallback>
                            {testimonial.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-lg hover:text-blue-600 transition-colors">
                            {testimonial.name}
                          </h3>
                          <p className="text-gray-500 text-sm">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                      <div className="relative flex-grow">
                        <svg
                          className="absolute -top-4 -left-2 h-8 w-8 text-gray-200 transform -scale-x-100"
                          fill="currentColor"
                          viewBox="0 0 32 32"
                          aria-hidden="true"
                        >
                          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                        </svg>
                        <p className="relative text-gray-600 italic hover:text-gray-800 transition-colors">
                          {testimonial.content}
                        </p>
                      </div>

                      {testimonial.course && (
                        <div className="mt-4 pt-3 border-t border-gray-100">
                          <p className="text-sm text-blue-600 font-medium hover:text-blue-800 transition-colors">
                            Course: {testimonial.course}
                          </p>
                        </div>
                      )}
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
            aria-label="Next testimonials"
            disabled={isAnimating}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: testimonials.length - itemsPerView + 1 }).map(
              (_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all ${currentIndex === index ? "bg-blue-600 w-4" : "bg-gray-300"}`}
                  onClick={() => {
                    setIsAnimating(true);
                    setCurrentIndex(index);
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
