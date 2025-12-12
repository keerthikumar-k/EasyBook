import { useState } from 'react';
import { Play, Calendar, Clock, Users } from 'lucide-react';

const Stream = () => {
  const [streams] = useState([
    { id: 1, title: 'Scam 1992', genre: 'Drama', language: 'Hindi', rating: 9.5, poster: 'https://image.tmdb.org/t/p/w500/6rOMGlpEgP4WnmCSzFcnCVJL7eH.jpg', duration: '10 Episodes', description: 'Financial thriller series', platform: 'SonyLIV' },
    { id: 2, title: 'The Family Man', genre: 'Thriller', language: 'Hindi', rating: 8.7, poster: 'https://image.tmdb.org/t/p/w500/dkj4iowjGDWCU2t0kNTz1lqzDZ8.jpg', duration: '2 Seasons', description: 'Action thriller series', platform: 'Amazon Prime' },
    { id: 3, title: 'Mumbai Diaries 26/11', genre: 'Drama', language: 'Hindi', rating: 8.4, poster: 'https://image.tmdb.org/t/p/w500/wvdWb5kTQipdMDqCclC6Y3zr4j8.jpg', duration: '8 Episodes', description: 'Medical drama', platform: 'Amazon Prime' },
    { id: 4, title: 'Arya', genre: 'Crime', language: 'Tamil', rating: 8.2, poster: 'https://image.tmdb.org/t/p/w500/mYM8x2Atv4MaLulaV0KVJWI1Djv.jpg', duration: '8 Episodes', description: 'Crime thriller', platform: 'Disney+ Hotstar' }
  ]);

  return (
    <div className="container">
      <section style={{ textAlign: 'center', padding: '60px 0 40px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: '800', color: '#333', marginBottom: '20px' }}>
          Stream Online
        </h1>
        <p style={{ fontSize: '20px', color: '#666' }}>
          Watch the latest web series and shows online
        </p>
      </section>

      <div className="movies-grid">
        {streams.map(stream => (
          <div key={stream.id} className="movie-card">
            <div style={{ position: 'relative' }}>
              <img 
                src={stream.poster} 
                alt={stream.title} 
                className="movie-poster"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x450/333/fff?text=' + encodeURIComponent(stream.title);
                }}
              />
              <div className="movie-rating">
                <Play size={12} fill="currentColor" />
                {stream.rating}/10
              </div>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'rgba(0,0,0,0.7)',
                borderRadius: '50%',
                padding: '15px',
                cursor: 'pointer'
              }}>
                <Play size={24} color="white" fill="white" />
              </div>
            </div>
            <div className="movie-info">
              <h3 className="movie-title">{stream.title}</h3>
              <p className="movie-genre">{stream.genre}</p>
              <p style={{ fontSize: '12px', color: '#999', marginBottom: '5px' }}>{stream.language}</p>
              <p style={{ fontSize: '12px', color: '#dc2626', fontWeight: '600' }}>{stream.platform}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stream;