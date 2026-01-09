export interface Module {
    id: number;
    title: string;
    description: string;
    content: string[];
  }
  
  // Define the props for the component
  export interface DisplayCourseContentProps {
    modules: Module[];
  }