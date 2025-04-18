export interface WeddingConfig {
  couple: {
    person1: string;
    person2: string;
  };
  event: {
    date: string;
    time: string;
    venue: {
      name: string;
      address: string;
      city: string;
      state: string;
      zipCode: string;
    };
  };
  schedule: {
    ceremony: string;
    cocktailHour: string;
    reception: string;
  };
  story: StorySection[];
  details: {
    dressCode: string;
    accommodation: {
      text: string;
    };
    parking: {
      text: string;
    };
  };
  images: {
    hero: string;
  };
}

interface StorySection {
  title: string;
  description: string;
  image: string;
} 