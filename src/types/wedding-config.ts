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
    parking: {
      text: string;
    };
  };
  translations: {
    navigation: {
      home: string;
      ourStory: string;
      details: string;
      gallery: string;
      celebrateUs: string;
      title: string;
    };
    hero: {
      gettingMarried: string;
      rsvpButton: string;
    };
    countdown: {
      title: string;
      days: string;
      hours: string;
      minutes: string;
      seconds: string;
    };
    story: {
      title: string;
    };
    details: {
      title: string;
      ceremonyTitle: string;
      ceremonyLabel: string;
      cocktailHourLabel: string;
      receptionLabel: string;
      venueTitle: string;
      dressCodeTitle: string;
      parkingTitle: string;
    };
    gallery: {
      title: string;
    },
    metadata: {
      title: string;
      description: string;
    };
  };
}

interface StorySection {
  title: string;
  time: string;
  description: string;
  imagesPath: string;
} 