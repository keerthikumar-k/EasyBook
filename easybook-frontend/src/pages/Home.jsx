import { useState, useEffect, createContext, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Star, ChevronRight, Film, Users, Award } from 'lucide-react';

// Create City Context
const CityContext = createContext();

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState('Mumbai');

  // Listen for city changes from localStorage or events
  useEffect(() => {
    const handleCityChange = () => {
      const city = localStorage.getItem('selectedCity') || 'Mumbai';
      setSelectedCity(city);
      setMovies(getMoviesByLocation(city));
    };
    
    handleCityChange();
    window.addEventListener('cityChanged', handleCityChange);
    
    return () => window.removeEventListener('cityChanged', handleCityChange);
  }, []);

  useEffect(() => {
    fetchMovies();
  }, []);

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
        { id: 6, title: 'KGF 2', genre: 'Action', language: 'Kannada', rating: 8.4, poster: '/images/kgf2.jpg', duration: 168, description: 'Period action', showtimes: [{theater: 'Multiplex', time: '9:30 PM', price: 310}] },

      ];
    }
  };

  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/movies');
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setMovies(getMoviesByLocation(selectedCity));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <h2>Loading movies...</h2>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Banner Section */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.9), rgba(185, 28, 28, 0.9)), url("https://image.tmdb.org/t/p/original/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        padding: '100px 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            Welcome to EASY BOOK
          </h1>
          <p style={{ fontSize: '20px', marginBottom: '30px', opacity: '0.9' }}>
            Book tickets for the latest movies with just a few clicks
          </p>
          <button 
            onClick={() => document.getElementById('movies').scrollIntoView({ behavior: 'smooth' })}
            className="btn" 
            style={{ 
              padding: '15px 30px', 
              fontSize: '18px',
              background: 'linear-gradient(135deg, #333 0%, #000 100%)',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Explore Movies
          </button>
        </div>
      </section>

      {/* Upcoming Movies Banner */}
      <section style={{ background: '#f8f9fa', padding: '60px 0' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '36px', fontWeight: '700', marginBottom: '40px', color: '#333' }}>
            Upcoming Movies
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <div style={{ background: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
              <img src="https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg" alt="Avatar" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px' }}>Avatar: The Way of Water</h3>
                <p style={{ color: '#666' }}>Coming Soon - Epic Sci-Fi Adventure</p>
              </div>
            </div>
            <div style={{ background: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
              <img src="/images/RRR.jpg" alt="RRR" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px' }}>RRR</h3>
                <p style={{ color: '#666' }}>Now Showing - Period Action Drama</p>
              </div>
            </div>
            <div style={{ background: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
              <img src="https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg" alt="Spider-Man" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px' }}>Spider-Man: No Way Home</h3>
                <p style={{ color: '#666' }}>Now Showing - Superhero Adventure</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    <div className="container">
      <section className="movies-section" id="movies">
        <div className="section-header">
          <h2 className="section-title">Recommended Movies</h2>
          <a href="#" className="view-all">
            See All <ChevronRight size={16} style={{ display: 'inline' }} />
          </a>
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
                <p style={{ fontSize: '12px', color: '#999' }}>{movie.language}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="movies-section">
        <div className="section-header">
          <h2 className="section-title">Movies in {selectedCity}</h2>
          <a href="#" className="view-all">
            See All <ChevronRight size={16} style={{ display: 'inline' }} />
          </a>
        </div>
        <div className="movies-grid">
          {movies.map(movie => (
            <Link key={`showing-${movie.id}`} to={`/movie/${movie.id}`} className="movie-card">
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
                <p style={{ fontSize: '12px', color: '#999' }}>{movie.language}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* About Us Section */}
      <section style={{ background: 'white', padding: '80px 0' }}>
        <h2 style={{ textAlign: 'center', fontSize: '36px', fontWeight: '700', marginBottom: '50px', color: '#333' }}>
          Why Choose EASY BOOK?
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
          <div style={{ textAlign: 'center' }}>
            <Film size={48} color="#dc2626" style={{ marginBottom: '20px' }} />
            <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '15px' }}>Latest Movies</h3>
            <p style={{ color: '#666' }}>Book tickets for the latest blockbusters and upcoming releases</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Users size={48} color="#dc2626" style={{ marginBottom: '20px' }} />
            <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '15px' }}>Easy Booking</h3>
            <p style={{ color: '#666' }}>Simple and quick booking process in just a few clicks</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Award size={48} color="#dc2626" style={{ marginBottom: '20px' }} />
            <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '15px' }}>Trusted Platform</h3>
            <p style={{ color: '#666' }}>Secure payments and reliable booking confirmations</p>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Home;