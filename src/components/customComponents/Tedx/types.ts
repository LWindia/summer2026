export interface SpeakerProps {
    imageUrl: string;
    badge: string;
    firstName: string;
    lastName: string;
    link: string;
    socialLinks?: {
      instagram?: string;
      facebook?: string;
      linkedin?: string;
    };
  }
