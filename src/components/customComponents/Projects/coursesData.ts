// Course data for the 4 main courses displayed on homepage
export interface Course {
  courseName: string;
  tagline: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  price: string;
  originalPrice?: string;
  paymentLink: string;
  brochurePdfUrl: string;
}

export const courses: Course[] = [
  {
    courseName: "MERN Full Stack Web Development",
    tagline: "Become a Full Stack Web Developer | Learn MERN Stack, Frontend & Backend Development with hands-on projects",
    image: {
      src: "/assets/cards/MERN.jpg",
      alt: "MERN Full Stack Web Development",
      width: 400,
      height: 300,
    },
    price: "6,500",
    originalPrice: "10,000",
    paymentLink: "https://rzp.io/rzp/summer-mern",
    brochurePdfUrl: "https://drive.google.com/file/d/115vELDFKaxrCeqwGpIHS4kQl5kky-c9m/view?usp=sharing",
  },
  {
    courseName: "Data Science with Machine Learning & AI",
    tagline: "Master Data Science, Machine Learning & AI | Build real-world ML models and AI applications",
    image: {
      src: "/assets/cards/Data-Science.jpg",
      alt: "Data Science with Machine Learning & AI",
      width: 400,
      height: 300,
    },
    price: "5,500",
    originalPrice: "8,000",
    paymentLink: "https://rzp.io/rzp/summer-ml",
    brochurePdfUrl: "https://drive.google.com/file/d/1rGB0UKQ83ryPrlUtxhCPJdeIKVNiy_ia/view?usp=sharing",
  },
  {
    courseName: "Data Analytics",
    tagline: "Learn Data Analytics | Analyze data, create insights, and make data-driven decisions",
    image: {
      src: "/assets/cards/Data-Analytics.jpg",
      alt: "Data Analytics",
      width: 400,
      height: 300,
    },
    price: "5,500",
    originalPrice: "8,000",
    paymentLink: "https://rzp.io/rzp/summer-data-analytics",
    brochurePdfUrl: "https://drive.google.com/file/d/1Igm3VU4l-520sGe6_742INifBkm3DR3V/view?usp=sharing",
  },
  {
    courseName: "Salesforce",
    tagline: "Master Salesforce | Learn CRM, cloud computing, and Salesforce development",
    image: {
      src: "/assets/cards/Salesforce.jpg",
      alt: "Salesforce",
      width: 400,
      height: 300,
    },
    price: "6,500",
    originalPrice: "10,000",
    paymentLink: "https://rzp.io/rzp/summer-salesforce",
    brochurePdfUrl: "https://drive.google.com/file/d/1i3FjADtQxfdZWQF_oksEc1jBwC_jCcYA/view?usp=sharing",
  },
];

