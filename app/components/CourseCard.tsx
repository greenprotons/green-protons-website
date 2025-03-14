import { Button } from "./ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Clock } from "lucide-react";

interface CourseCardProps {
  id?: string;
  title?: string;
  description?: string;
  image?: string;
  duration?: string;
  level?: "Beginner" | "Intermediate" | "Advanced";
  price?: number;
  onViewDetails?: (id: string) => void;
}

const CourseCard = ({
  id = "1",
  title = "Introduction to Web Development",
  description = "Learn the fundamentals of web development including HTML, CSS, and JavaScript to build responsive websites from scratch.",
  image = "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500&q=80",
  duration = "8 weeks",
  level = "Beginner",
  price = 299,
  onViewDetails = () => {},
}: CourseCardProps) => {
  const handleViewDetails = () => {
    onViewDetails(id);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-blue-100 text-blue-800";
      case "Advanced":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card
      className="overflow-hidden transition-all duration-300 hover:shadow-lg bg-white flex flex-col h-full"
      data-aos="fade-up"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-0 right-0 m-2">
          <Badge
            className={`${getLevelColor(level)} font-medium text-sm px-2 py-1`}
          >
            {level}
          </Badge>
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-gray-600 line-clamp-3 mb-4">
          {description}
        </CardDescription>
        <div className="flex justify-between items-center text-sm bg-gray-50 p-2 rounded-md">
          <span className="flex items-center gap-1 text-gray-600">
            <Clock size={16} />
            {duration}
          </span>
          <span className="font-semibold text-primary">${price}</span>
        </div>
      </CardContent>
      <CardFooter className="pt-0 mt-auto">
        <Button
          onClick={handleViewDetails}
          className="w-full"
          variant="default"
          data-course-view-details
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
