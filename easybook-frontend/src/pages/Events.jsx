import { useState } from 'react';
import { Calendar, MapPin, Clock, Users, Ticket } from 'lucide-react';

const Events = () => {
  const [events] = useState([
    { id: 1, title: 'Sunburn Festival', genre: 'Music', date: '2024-02-15', rating: 9.2, poster: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', duration: '3 Days', description: 'Electronic music festival', venue: 'Goa', price: 2500 },
    { id: 2, title: 'Comedy Nights Live', genre: 'Comedy', date: '2024-02-20', rating: 8.5, poster: 'https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg', duration: '2 Hours', description: 'Stand-up comedy show', venue: 'Mumbai', price: 800 },
    { id: 3, title: 'Tech Conference 2024', genre: 'Technology', date: '2024-03-01', rating: 8.8, poster: 'https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg', duration: '1 Day', description: 'Technology conference', venue: 'Bangalore', price: 1500 },
    { id: 4, title: 'Food Festival', genre: 'Food', date: '2024-02-25', rating: 8.0, poster: 'https://image.tmdb.org/t/p/w500/A4j8S6moJS2zNtRR8oWF08gRnL5.jpg', duration: '2 Days', description: 'Food and culture festival', venue: 'Delhi', price: 500 }
  ]);

  return (
    <div className="container">
      <section style={{ textAlign: 'center', padding: '60px 0 40px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: '800', color: '#333', marginBottom: '20px' }}>
          Live Events
        </h1>
        <p style={{ fontSize: '20px', color: '#666' }}>
          Book tickets for concerts, festivals, and live events
        </p>
      </section>

      <div className="movies-grid">
        {events.map(event => (
          <div key={event.id} className="movie-card">
            <div style={{ position: 'relative' }}>
              <img 
                src={event.poster} 
                alt={event.title} 
                className="movie-poster"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x450/333/fff?text=' + encodeURIComponent(event.title);
                }}
              />
              <div className="movie-rating">
                <Calendar size={12} />
                {new Date(event.date).toLocaleDateString()}
              </div>
            </div>
            <div className="movie-info">
              <h3 className="movie-title">{event.title}</h3>
              <p className="movie-genre">{event.genre}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#666', marginBottom: '5px' }}>
                <MapPin size={12} />
                {event.venue}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#666', marginBottom: '5px' }}>
                <Clock size={12} />
                {event.duration}
              </div>
              <p style={{ fontSize: '14px', color: '#dc2626', fontWeight: '600' }}>₹{event.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;