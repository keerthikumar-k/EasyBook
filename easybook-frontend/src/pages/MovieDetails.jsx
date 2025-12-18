import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Star, Clock, Calendar, MapPin } from 'lucide-react';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const getMoviesByLocation = (city) => {
    const tamilNaduCities = ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli'];
    
    if (tamilNaduCities.includes(city)) {
      return [
        { id: 1, title: 'Vikram', genre: 'Action', language: 'Tamil', rating: 8.9, poster: '/images/vikram.jpg', duration: 174, description: 'Action thriller', showtimes: [{theater: 'Sathyam Cinemas', time: '7:00 PM', price: 200}] },
        { id: 2, title: 'Beast', genre: 'Action', language: 'Tamil', rating: 7.8, poster: '/images/beast.webp', duration: 155, description: 'Action comedy', showtimes: [{theater: 'AGS Cinemas', time: '8:30 PM', price: 180}] },
        { id: 3, title: 'Ponniyin Selvan', genre: 'Drama', language: 'Tamil', rating: 8.5, poster: '/images/ps1.jpg', duration: 167, description: 'Historical drama', showtimes: [{theater: 'PVR Cinemas', time: '6:30 PM', price: 220}] },
        { id: 4, title: 'Varisu', genre: 'Family', language: 'Tamil', rating: 7.5, poster: '/images/varisu.jpg', duration: 169, description: 'Family drama', showtimes: [{theater: 'Rohini Cinemas', time: '9:00 PM', price: 190}] },
        { id: 5, title: 'Thunivu', genre: 'Thriller', language: 'Tamil', rating: 8.1, poster: '/images/thunivu.jpg', duration: 146, description: 'Heist thriller', showtimes: [{theater: 'INOX', time: '7:30 PM', price: 210}] },
        { id: 6, title: 'Jailer', genre: 'Action', language: 'Tamil', rating: 8.7, poster: '/images/jailer.jpeg', duration: 168, description: 'Action comedy', showtimes: [{theater: 'Escape Cinemas', time: '8:00 PM', price: 230}] }
      ];
    } else {
      return [
        { id: 1, title: 'Avatar', genre: 'Action', language: 'English', rating: 8.5, poster: 'https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg', duration: 180, description: 'Epic sci-fi adventure', showtimes: [{theater: 'PVR Cinemas', time: '6:00 PM', price: 250}] },
        { id: 2, title: 'RRR', genre: 'Action', language: 'Hindi', rating: 9.0, poster: '/images/RRR.jpg', duration: 187, description: 'Period action drama', showtimes: [{theater: 'INOX', time: '9:00 PM', price: 300}] },
        { id: 3, title: 'Spider-Man', genre: 'Action', language: 'English', rating: 8.7, poster: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg', duration: 148, description: 'Superhero adventure', showtimes: [{theater: 'Cinepolis', time: '7:30 PM', price: 280}] },
        { id: 4, title: 'Pathaan', genre: 'Action', language: 'Hindi', rating: 8.2, poster: '/images/pathaan.webp', duration: 146, description: 'Spy thriller', showtimes: [{theater: 'PVR Cinemas', time: '8:00 PM', price: 320}] },
        { id: 5, title: 'Top Gun', genre: 'Action', language: 'English', rating: 8.9, poster: 'https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg', duration: 131, description: 'Aviation thriller', showtimes: [{theater: 'INOX', time: '6:30 PM', price: 290}] },
        { id: 6, title: 'KGF 2', genre: 'Action', language: 'Kannada', rating: 8.4, poster: '/images/kgf2.jpg', duration: 168, description: 'Period action', showtimes: [{theater: 'Multiplex', time: '9:30 PM', price: 310}] }
      ];
    }
  };

  const fetchMovie = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/movies/${id}`);
      setMovie(response.data);
    } catch (error) {
      console.error('Error fetching movie:', error);
      const city = localStorage.getItem('selectedCity') || 'Mumbai';
      const movies = getMoviesByLocation(city);
      const foundMovie = movies.find(m => m.id === parseInt(id));
      setMovie(foundMovie || movies[0]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <h2>Loading movie details...</h2>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <h2>Movie not found</h2>
          <Link to="/" className="btn">Back to Movies</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="movie-hero">
        <div className="container">
          <div className="movie-hero-content">
            <img src={movie.poster} alt={movie.title} className="movie-hero-poster" />
            <div className="movie-hero-info">
              <h1>{movie.title}</h1>
              <div className="movie-meta">
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Star size={16} fill="currentColor" />
                  {movie.rating}/10
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Clock size={16} />
                  {movie.duration} mins
                </span>
                <span>{movie.genre}</span>
                <span>{movie.language}</span>
              </div>
              <p className="movie-description">{movie.description}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <section className="showtimes-section">
          <div className="showtimes-header">
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: '600', 
              color: '#333',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <Calendar size={24} />
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h2>
          </div>
          
          {movie.showtimes.map((show, index) => (
            <div key={index} className="theater-group">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                <MapPin size={18} color="#dc2626" />
                <h3 className="theater-name">{show.theater}</h3>
              </div>
              <div className="showtime-slots">
                <Link 
                  to={`/booking/${movie.id}?showtime=${show.time}&theater=${show.theater}&price=${show.price}`}
                  className="showtime-slot"
                >
                  {show.time}
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
                    ₹{show.price}
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
};

export default MovieDetails;