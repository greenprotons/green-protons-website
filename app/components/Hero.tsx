import React, { useState, useEffect } from "react";
import { Button } from "./ui/Button";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  title?: string;
  description?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  backgroundImage?: string;
}

interface CarouselSlide {
  image: string;
  title: string;
  description: string;
}

const Hero: React.FC<HeroSectionProps> = ({
  title = "Master Programming Skills for the Future",
  description = "Join our comprehensive programming courses designed to transform beginners into industry-ready professionals. Learn from expert instructors with hands-on projects and personalized guidance.",
  ctaText = "Explore Courses",
  onCtaClick = () => {
    const courseCatalog =
      document.getElementById("course-catalog") ||
      document.getElementById("courses");
    if (courseCatalog) {
      const headerHeight = 80; // Approximate header height
      const topOffset =
        courseCatalog.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  },
}) => {
  const carouselSlides: CarouselSlide[] = [
    {
      image:
        "https://images.unsplash.com/photo-1550439062-609e1531270e?w=1200&q=80",
      title: "Expert Software Architecture",
      description:
        "Learn from architects with 20+ years designing scalable systems",
    },
    {
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80",
      title: "Real-World Development Experience",
      description:
        "Benefit from practical knowledge of evolving technologies and frameworks",
    },
    {
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
      title: "Project Management Mastery",
      description:
        "Gain insights from certified project managers with extensive experience",
    },
    {
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
      title: "Agile & Scrum Expertise",
      description:
        "Train with certified Scrum Masters who have implemented agile practices",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselSlides.length]);

  return (
    <section
      className="relative w-full h-screen bg-gray-900 flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#0f172a" }}
      data-aos="fade-in"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 opacity-40 transition-opacity duration-1000">
        {carouselSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === index ? "opacity-100" : "opacity-0"}`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
          {title}
        </h1>

        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 h-auto text-lg font-semibold rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
            onClick={onCtaClick}
          >
            {ctaText}
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border-white hover:bg-white/10 px-8 py-6 h-auto text-lg font-semibold rounded-lg text-gray-300 hover:text-white flex items-center gap-2"
            onClick={() => window.open("#about", "_self")}
          >
            Learn More
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
      {/* Carousel Info */}
      <div className="w-full bg-gradient-to-t from-black/70 to-transparent py-8 transition-opacity duration-500 mt-auto">
        <div className="text-white max-w-2xl mx-auto px-4">
          <h3 className="text-xl font-bold mb-1">
            {carouselSlides[currentSlide].title}
          </h3>
          <p className="text-sm text-gray-200">
            {carouselSlides[currentSlide].description}
          </p>
        </div>
        <div className="flex justify-center mt-4 space-x-2">
          {carouselSlides.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${currentSlide === index ? "bg-white w-4" : "bg-white/50"}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500 rounded-full blur-3xl opacity-20" />
    </section>
  );
};

export default Hero;
