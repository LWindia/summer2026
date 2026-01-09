// Define the type for the image object
export interface Image {
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
  priority: boolean;
}

// Define the type for a project
export interface Project {
  title: string;
  description: string;
  image: Image;
  content: string[];
  registerLink: string;
  originalPrice: string;
  price: string;
  projectCode: string;
}
interface CourseDetailsProps {
  title: string;
  description: string;
  content: string[];
  registerLink: string;
  originalPrice: number;
  price: number;
}

// Define the type for the entire data object
export interface NewData {
  projects: Project[];
}