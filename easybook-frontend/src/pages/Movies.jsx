import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Film, Calendar, Clock } from 'lucide-react';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [selectedCity, setSelectedCity] = useState('Mumbai');

  useEffect(() => {
    const city = localStorage.getItem('selectedCity') || 'Mumbai';
    setSelectedCity(city);
    setMovies(getMoviesByLocation(city));
  }, []);

  const getMoviesByLocation = (city) => {
    const tamilNaduCities = ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli'];
    
    if (tamilNaduCities.includes(city)) {
      return [
        { id: 1, title: 'Vikram', genre: 'Action', language: 'Tamil', rating: 8.9, poster: '/images/vikram.jpg', duration: 174, description: 'Action thriller', showtimes: [{theater: 'Sathyam Cinemas', time: '7:00 PM', price: 200}] },
        { id: 2, title: 'Beast', genre: 'Action', language: 'Tamil', rating: 7.8, poster: '/images/beast.webp', duration: 155, description: 'Action comedy', showtimes: [{theater: 'AGS Cinemas', time: '8:30 PM', price: 180}] },
        { id: 3, title: 'PS1 - Ponniyan Selvan', genre: 'Drama', language: 'Tamil', rating: 8.5, poster: '/images/ps1.jpg', duration: 167, description: 'Historical drama', showtimes: [{theater: 'PVR Cinemas', time: '6:30 PM', price: 220}] },
        { id: 4, title: 'Varisu', genre: 'Family', language: 'Tamil', rating: 7.5, poster: '/images/varisu.jpg', duration: 169, description: 'Family drama', showtimes: [{theater: 'Rohini Cinemas', time: '9:00 PM', price: 190}] },
        { id: 5, title: 'Thunivu', genre: 'Thriller', language: 'Tamil', rating: 8.1, poster: '/images/thunivu.jpg', duration: 146, description: 'Heist thriller', showtimes: [{theater: 'INOX', time: '7:30 PM', price: 210}] },
        { id: 6, title: 'Jailer', genre: 'Action', language: 'Tamil', rating: 8.7, poster: '/images/jailer.jpeg', duration: 168, description: 'Action comedy', showtimes: [{theater: 'Escape Cinemas', time: '8:00 PM', price: 230}] },
        { id: 7, title: 'Leo', genre: 'Action', language: 'Tamil', rating: 8.3, poster: '/images/leo.webp', duration: 164, description: 'Action thriller', showtimes: [{theater: 'Kamala Cinemas', time: '6:00 PM', price: 200}] },
        { id: 8, title: 'Kaithi', genre: 'Action', language: 'Tamil', rating: 8.4, poster: '/images/kaithi.webp', duration: 145, description: 'Action thriller', showtimes: [{theater: 'Luxe Cinemas', time: '9:30 PM', price: 250}] }
      ];
    } else {
      return [
        { id: 1, title: 'Avatar', genre: 'Action', language: 'English', rating: 8.5, poster: 'https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg', duration: 180, description: 'Epic sci-fi adventure', showtimes: [{theater: 'PVR Cinemas', time: '6:00 PM', price: 250}] },
        { id: 2, title: 'RRR', genre: 'Action', language: 'Hindi', rating: 9.0, poster: 'https://image.tmdb.org/t/p/w500/wD6jUzANhJMuadiSgn7jOvwZafJ.jpg', duration: 187, description: 'Period action drama', showtimes: [{theater: 'INOX', time: '9:00 PM', price: 300}] },
        { id: 3, title: 'Spider-Man', genre: 'Action', language: 'English', rating: 8.7, poster: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg', duration: 148, description: 'Superhero adventure', showtimes: [{theater: 'Cinepolis', time: '7:30 PM', price: 280}] },
        { id: 4, title: 'Pathaan', genre: 'Action', language: 'Hindi', rating: 8.2, poster: 'https://image.tmdb.org/t/p/w500/YAoqzQPE8CjKpgWCGJKbXpXxGQP.jpg', duration: 146, description: 'Spy thriller', showtimes: [{theater: 'PVR Cinemas', time: '8:00 PM', price: 320}] },
        { id: 5, title: 'Top Gun', genre: 'Action', language: 'English', rating: 8.9, poster: 'https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg', duration: 131, description: 'Aviation thriller', showtimes: [{theater: 'INOX', time: '6:30 PM', price: 290}] },
        { id: 6, title: 'KGF 2', genre: 'Action', language: 'Kannada', rating: 8.4, poster: 'https://image.tmdb.org/t/p/w500/rIbWbUBkjHap0BNAhYHj5WI2Gm0.jpg', duration: 168, description: 'Period action', showtimes: [{theater: 'Multiplex', time: '9:30 PM', price: 310}] },
        { id: 7, title: 'Brahmastra', genre: 'Fantasy', language: 'Hindi', rating: 7.8, poster: 'https://image.tmdb.org/t/p/w500/xZdOTx7OJx9DNHhbGil4WwfYuS3.jpg', duration: 167, description: 'Fantasy adventure', showtimes: [{theater: 'PVR Cinemas', time: '7:00 PM', price: 280}] },
        { id: 8, title: 'Drishyam 2', genre: 'Thriller', language: 'Hindi', rating: 8.6, poster: 'https://image.tmdb.org/t/p/w500/8QVDXDiOGHRcAD4oM6MXjE0osSj.jpg', duration: 140, description: 'Crime thriller', showtimes: [{theater: 'Cinepolis', time: '8:45 PM', price: 260}] }
      ];
    }
  };

  return (
    <div className="container">
      <section style={{ textAlign: 'center', padding: '60px 0 40px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: '800', color: '#333', marginBottom: '20px' }}>
          Movies in {selectedCity}
        </h1>
        <p style={{ fontSize: '20px', color: '#666' }}>
          Book tickets for the latest movies now showing
        </p>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginBottom: '40px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
          <Film size={32} color="#dc2626" style={{ marginBottom: '10px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '5px' }}>Now Showing</h3>
          <p style={{ color: '#666', fontSize: '14px' }}>{movies.length} Movies</p>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
          <Calendar size={32} color="#dc2626" style={{ marginBottom: '10px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '5px' }}>All Languages</h3>
          <p style={{ color: '#666', fontSize: '14px' }}>Multiple Options</p>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
          <Clock size={32} color="#dc2626" style={{ marginBottom: '10px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '5px' }}>All Showtimes</h3>
          <p style={{ color: '#666', fontSize: '14px' }}>Book Anytime</p>
        </div>
      </div>

      <div className="movies-grid">
        {movies.map(movie => (
          <Link key={movie.id} to={`/movie/${movie.id}`} className="movie-card">
            <div style={{ position: 'relative' }}>
              <img 
                src={movie.poster} 
                alt={movie.title} 
                className="movie-poster"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x450/333/fff?text=' + encodeURIComponent(movie.title);
                }}
              />
              <div className="movie-rating">
                <Star size={12} fill="currentColor" />
                {movie.rating}/10
              </div>
            </div>
            <div className="movie-info">
              <h3 className="movie-title">{movie.title}</h3>
              <p className="movie-genre">{movie.genre}</p>
              <p style={{ fontSize: '12px', color: '#999' }}>{movie.language} • {movie.duration} mins</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Movies;