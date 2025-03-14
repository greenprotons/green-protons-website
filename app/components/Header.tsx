import React, { useState, useEffect } from "react";
import { Button } from "./ui/Button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  logo?: string;
  logoImage?: string;
  navLinks?: Array<{ label: string; href: string }>;
}

const Header = ({
  logo = "GreenProtons",
  logoImage = "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=50&q=80",
  navLinks = [
    { label: "Home", href: "/" },
    { label: "Why Choose Us", href: "#why-choose-us" },
    { label: "Courses", href: "#courses" },
    { label: "Instructors", href: "#about" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ],
}: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.getElementById(href.substring(1));
      if (element) {
        const headerHeight = 80; // Approximate header height
        const topOffset =
          element.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;
        window.scrollTo({ top: topOffset, behavior: "smooth" });
        setMobileMenuOpen(false);
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${scrolled ? "bg-gray-100 shadow-md" : "bg-white shadow-sm"}`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link
            to="/"
            className="font-bold text-blue-600 flex items-center gap-2"
          >
            <img
              src={logoImage}
              alt="GreenProtons Logo"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="text-2xl">{logo}</span>
              <span className="text-xs text-gray-600 -mt-1">
                Coding Excellence for the Future
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-gray-700 hover:text-blue-600 transition-colors"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => {
              const courseCatalog = document.getElementById("courses");
              if (courseCatalog) {
                const headerHeight = 80; // Approximate header height
                const topOffset =
                  courseCatalog.getBoundingClientRect().top +
                  window.pageYOffset -
                  headerHeight;
                window.scrollTo({ top: topOffset, behavior: "smooth" });
              }
            }}
          >
            Enroll Now
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-md">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white w-full"
              onClick={() => {
                setMobileMenuOpen(false);
                const courseCatalog = document.getElementById("courses");
                if (courseCatalog) {
                  const headerHeight = 80; // Approximate header height
                  const topOffset =
                    courseCatalog.getBoundingClientRect().top +
                    window.pageYOffset -
                    headerHeight;
                  window.scrollTo({ top: topOffset, behavior: "smooth" });
                }
              }}
            >
              Enroll Now
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
