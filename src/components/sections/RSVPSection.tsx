'use client';

import { useState } from 'react';
import { useWeddingStore } from '@/store/useWeddingStore';

export function RSVPSection() {
  const { config } = useWeddingStore();
  const { translations } = config;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attending: 'yes',
    guests: '1',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section id="rsvp" className="section-padding bg-muted">
      <div className="container-padding max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-playfair text-center mb-16 text-primary">
          {translations.navigation.rsvp}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-ring"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-ring"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Will you be attending?
            </label>
            <div className="space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="attending"
                  value="yes"
                  checked={formData.attending === 'yes'}
                  onChange={handleChange}
                  className="form-radio text-primary"
                />
                <span className="ml-2 text-foreground">Yes, I will attend</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="attending"
                  value="no"
                  checked={formData.attending === 'no'}
                  onChange={handleChange}
                  className="form-radio text-primary"
                />
                <span className="ml-2 text-foreground">No, I cannot attend</span>
              </label>
            </div>
          </div>

          {formData.attending === 'yes' && (
            <div>
              <label htmlFor="guests" className="block text-sm font-medium text-foreground mb-1">
                Number of Guests
              </label>
              <select
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-ring"
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
              Message (Optional)
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-ring"
              placeholder="Leave a message for the happy couple..."
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors duration-300"
            >
              Send RSVP
            </button>
          </div>
        </form>
      </div>
    </section>
  );
} 