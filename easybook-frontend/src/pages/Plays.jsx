import { useState } from 'react';
import { Theater, Calendar, MapPin, Clock } from 'lucide-react';

const Plays = () => {
  const [plays] = useState([
    { id: 1, title: 'Hamlet', genre: 'Drama', date: '2024-02-18', rating: 9.0, poster: 'https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg', duration: '3 Hours', description: 'Shakespeare classic', venue: 'National Theatre', price: 1200 },
    { id: 2, title: 'The Lion King', genre: 'Musical', date: '2024-02-22', rating: 9.5, poster: 'https://image.tmdb.org/t/p/w500/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg', duration: '2.5 Hours', description: 'Disney musical', venue: 'Broadway Theatre', price: 2000 },
    { id: 3, title: 'Romeo & Juliet', genre: 'Romance', date: '2024-03-05', rating: 8.7, poster: 'https://image.tmdb.org/t/p/w500/kGzFbGhp99zva6oZODW5atUtnqi.jpg', duration: '2 Hours', description: 'Classic love story', venue: 'Royal Opera House', price: 1500 },
    { id: 4, title: 'Chicago', genre: 'Musical', date: '2024-02-28', rating: 8.9, poster: 'https://image.tmdb.org/t/p/w500/v1Sg3GuHDz9uhrKqYozOeCMLSpj.jpg', duration: '2.5 Hours', description: 'Jazz age musical', venue: 'West End Theatre', price: 1800 }
  ]);

  return (
    <div className="container">
      <section style={{ textAlign: 'center', padding: '60px 0 40px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: '800', color: '#333', marginBottom: '20px' }}>
          Theatre Plays
        </h1>
        <p style={{ fontSize: '20px', color: '#666' }}>
          Experience live theatre and musical performances
        </p>
      </section>

      <div className="movies-grid">
        {plays.map(play => (
          <div key={play.id} className="movie-card">
            <div style={{ position: 'relative' }}>
              <img 
                src={play.poster} 
                alt={play.title} 
                className="movie-poster"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x450/333/fff?text=' + encodeURIComponent(play.title);
                }}
              />
              <div className="movie-rating">
                <Theater size={12} />
                {play.rating}/10
              </div>
            </div>
            <div className="movie-info">
              <h3 className="movie-title">{play.title}</h3>
              <p className="movie-genre">{play.genre}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#666', marginBottom: '5px' }}>
                <Calendar size={12} />
                {new Date(play.date).toLocaleDateString()}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#666', marginBottom: '5px' }}>
                <MapPin size={12} />
                {play.venue}
              </div>
              <p style={{ fontSize: '14px', color: '#dc2626', fontWeight: '600' }}>₹{play.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plays;