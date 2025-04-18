import { getWeddingConfig } from "@/utils/config";

export async function DetailsSection() {
  const { schedule, event, details } = await getWeddingConfig();

  return (
    <section id="details" className="section-padding bg-white">
      <div className="container-padding max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-playfair text-center mb-16 text-primary">Wedding Details</h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-playfair mb-4 text-primary">Ceremony & Reception</h3>
              <p className="text-gray-600">{schedule.ceremony} - Ceremony</p>
              <p className="text-gray-600">{schedule.cocktailHour} - Cocktail Hour</p>
              <p className="text-gray-600">{schedule.reception} - Reception</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-playfair mb-4 text-primary">Venue</h3>
              <p className="text-gray-600">{event.venue.name}</p>
              <p className="text-gray-600">{event.venue.address}</p>
              <p className="text-gray-600">{event.venue.city}, {event.venue.state} {event.venue.zipCode}</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-playfair mb-4 text-primary">Dress Code</h3>
              <p className="text-gray-600">{details.dressCode}</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-playfair mb-4 text-primary">Accommodations</h3>
              <p className="text-gray-600">{details.accommodation.text}</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-playfair mb-4 text-primary">Parking</h3>
              <p className="text-gray-600">{details.parking.text}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 