import { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import { Button } from "./ui/Button";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
// import { Tabs, TabsList, TabsTrigger } from "./ui/Tabs";
// import { Input } from "./ui/Input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/Select";

interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  price: number;
  category: string;
}

interface CourseCatalogProps {
  courses?: Course[];
  onViewDetails?: (id: string) => void;
}

const CourseCatalog = ({
  courses = [
    {
      id: "1",
      title: "Introduction to Web Development",
      description:
        "Learn the fundamentals of web development including HTML, CSS, and JavaScript to build responsive websites from scratch.",
      image:
        "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500&q=80",
      duration: "8 weeks",
      level: "Beginner",
      price: 299,
      category: "Web Development",
    },
    {
      id: "2",
      title: "Advanced React & Redux",
      description:
        "Master React.js and Redux by building complex applications with advanced state management, hooks, and modern practices.",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&q=80",
      duration: "10 weeks",
      level: "Advanced",
      price: 499,
      category: "Web Development",
    },
    {
      id: "3",
      title: "Python for Data Science",
      description:
        "Explore data analysis, visualization, and machine learning using Python, pandas, NumPy, and scikit-learn.",
      image:
        "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=500&q=80",
      duration: "12 weeks",
      level: "Intermediate",
      price: 399,
      category: "Data Science",
    },
    {
      id: "4",
      title: "Mobile App Development with Flutter",
      description:
        "Build cross-platform mobile applications for iOS and Android using Google's Flutter framework and Dart programming language.",
      image:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&q=80",
      duration: "10 weeks",
      level: "Intermediate",
      price: 449,
      category: "Mobile Development",
    },
    {
      id: "5",
      title: "DevOps Engineering",
      description:
        "Learn CI/CD pipelines, containerization with Docker, orchestration with Kubernetes, and cloud infrastructure automation.",
      image:
        "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=500&q=80",
      duration: "14 weeks",
      level: "Advanced",
      price: 599,
      category: "DevOps",
    },
    {
      id: "6",
      title: "UI/UX Design Fundamentals",
      description:
        "Master the principles of user interface and user experience design, wireframing, prototyping, and usability testing.",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&q=80",
      duration: "8 weeks",
      level: "Beginner",
      price: 349,
      category: "Design",
    },
    {
      id: "7",
      title: "Blockchain Development",
      description:
        "Understand blockchain technology and learn to build decentralized applications using Ethereum, Solidity, and Web3.js.",
      image:
        "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=500&q=80",
      duration: "12 weeks",
      level: "Advanced",
      price: 549,
      category: "Blockchain",
    },
    {
      id: "8",
      title: "Cybersecurity Fundamentals",
      description:
        "Learn essential security concepts, threat detection, vulnerability assessment, and security best practices.",
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&q=80",
      duration: "10 weeks",
      level: "Beginner",
      price: 399,
      category: "Security",
    },
    {
      id: "9",
      title: "Cloud Computing with AWS",
      description:
        "Master Amazon Web Services (AWS) cloud platform, including EC2, S3, Lambda, and other essential services for modern applications.",
      image:
        "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500&q=80",
      duration: "10 weeks",
      level: "Intermediate",
      price: 479,
      category: "Cloud Computing",
    },
  ],
  onViewDetails = () => {},
}: CourseCatalogProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [view, setView] = useState("grid");
  const itemsPerView = view === "grid" ? 6 : 3;

  // Extract unique categories from courses
  const categories = [
    "all",
    ...new Set(courses.map((course) => course.category)),
  ];
  const levels = ["all", "Beginner", "Intermediate", "Advanced"];

  // Filter courses based on search term, category, and level
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || course.category === selectedCategory;
    const matchesLevel =
      selectedLevel === "all" || course.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  const nextSlide = () => {
    if (isAnimating || filteredCourses.length <= itemsPerView) return;
    setIsAnimating(true);
    if (currentIndex + itemsPerView < filteredCourses.length) {
      setCurrentIndex(currentIndex + itemsPerView);
    } else {
      setCurrentIndex(0); // Loop back to the beginning
    }
  };

  const prevSlide = () => {
    if (isAnimating || filteredCourses.length <= itemsPerView) return;
    setIsAnimating(true);
    if (currentIndex > 0) {
      setCurrentIndex(Math.max(0, currentIndex - itemsPerView));
    } else {
      // Go to the last possible index
      const lastPageIndex =
        Math.floor(filteredCourses.length / itemsPerView) * itemsPerView;
      setCurrentIndex(
        lastPageIndex >= filteredCourses.length
          ? lastPageIndex - itemsPerView
          : lastPageIndex,
      );
    }
  };

  useEffect(() => {
    // Reset animation state after transition completes
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  // Reset current index when filters change
  useEffect(() => {
    setCurrentIndex(0);
  }, [searchTerm, selectedCategory, selectedLevel, view]);

  // Calculate which courses to show with a sliding window
  const endIndex = Math.min(
    currentIndex + itemsPerView,
    filteredCourses.length,
  );
  const visibleCourses = filteredCourses.slice(currentIndex, endIndex);

  // Fill remaining slots if we're at the end and need to loop
  const fillerCount = itemsPerView - visibleCourses.length;
  const displayCourses = [...visibleCourses];
  if (fillerCount > 0 && filteredCourses.length > itemsPerView) {
    displayCourses.push(...filteredCourses.slice(0, fillerCount));
  }

  return (
    <section
      className="py-16 px-4 md:px-8 bg-gradient-to-b from-gray-100 to-white"
      id="courses"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Course Catalog
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our comprehensive selection of programming courses designed
            to take your skills to the next level.
          </p>
        </div>

        {/* Filters Section */}
        {/* <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-1/3">
              <Input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-search"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 w-full md:w-auto">
              <div className="w-full md:w-auto">
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full md:w-auto">
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level === "all" ? "All Levels" : level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full md:w-auto">
                <Tabs
                  value={view}
                  onValueChange={setView}
                  className="w-full md:w-[180px]"
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="grid">Grid</TabsTrigger>
                    <TabsTrigger value="carousel">Carousel</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </div>
        </div> */}

        {filteredCourses.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <div className="text-gray-400 mb-4">
              <Filter className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No courses found</h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="relative">
            {view === "carousel" && filteredCourses.length > itemsPerView && (
              <>
                {/* Carousel Controls - Left */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevSlide}
                  className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 rounded-full hover:bg-blue-100 shadow-md"
                  aria-label="Previous courses"
                  disabled={isAnimating}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>

                {/* Carousel Controls - Right */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextSlide}
                  className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 rounded-full hover:bg-blue-100 shadow-md"
                  aria-label="Next courses"
                  disabled={isAnimating}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </>
            )}

            {/* Course Display Area */}
            <div className={view === "carousel" ? "overflow-hidden mx-12" : ""}>
              <div
                className={`transition-transform duration-500 ease-in-out gap-6 ${view === "carousel" ? "flex" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}
                style={
                  view === "carousel" ? { transform: `translateX(0px)` } : {}
                }
              >
                {(view === "carousel" ? displayCourses : filteredCourses).map(
                  (course) => (
                    <div
                      key={course.id}
                      className={`${view === "carousel" ? "w-full flex-1 min-w-0 flex-shrink-0" : ""} transition-opacity duration-500 mb-6`}
                    >
                      <CourseCard
                        id={course.id}
                        title={course.title}
                        description={course.description}
                        image={course.image}
                        duration={course.duration}
                        level={course.level}
                        price={course.price}
                        onViewDetails={onViewDetails}
                      />
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Carousel Indicators */}
            {view === "carousel" && filteredCourses.length > itemsPerView && (
              <div className="flex justify-center mt-8 gap-2">
                {Array.from({
                  length: Math.ceil(filteredCourses.length / itemsPerView),
                }).map((_, index) => (
                  <button
                    key={index}
                    className={`h-2 w-2 rounded-full transition-all ${Math.floor(currentIndex / itemsPerView) === index ? "bg-blue-600 w-4" : "bg-gray-300"}`}
                    onClick={() => {
                      setIsAnimating(true);
                      setCurrentIndex(index * itemsPerView);
                    }}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default CourseCatalog;
