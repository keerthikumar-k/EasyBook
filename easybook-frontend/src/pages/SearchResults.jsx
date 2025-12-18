import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Star, Search } from 'lucide-react';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllMovies = () => {
    const tamilMovies = [
      { id: 1, title: 'Vikram', genre: 'Action', language: 'Tamil', rating: 8.9, poster: '/images/vikram.jpg', duration: 174, description: 'Action thriller', showtimes: [{theater: 'Sathyam Cinemas', time: '7:00 PM', price: 200}] },
      { id: 2, title: 'Beast', genre: 'Action', language: 'Tamil', rating: 7.8, poster: '/images/beast.webp', duration: 155, description: 'Action comedy', showtimes: [{theater: 'AGS Cinemas', time: '8:30 PM', price: 180}] },
      { id: 3, title: 'Ponniyin Selvan', genre: 'Drama', language: 'Tamil', rating: 8.5, poster: '/images/ps1.jpg', duration: 167, description: 'Historical drama', showtimes: [{theater: 'PVR Cinemas', time: '6:30 PM', price: 220}] },
      { id: 4, title: 'Varisu', genre: 'Family', language: 'Tamil', rating: 7.5, poster: '/images/varisu.jpg', duration: 169, description: 'Family drama', showtimes: [{theater: 'Rohini Cinemas', time: '9:00 PM', price: 190}] },
      { id: 5, title: 'Thunivu', genre: 'Thriller', language: 'Tamil', rating: 8.1, poster: '/images/thunivu.jpg', duration: 146, description: 'Heist thriller', showtimes: [{theater: 'INOX', time: '7:30 PM', price: 210}] },
      { id: 6, title: 'Jailer', genre: 'Action', language: 'Tamil', rating: 8.7, poster: '/images/jailer.jpeg', duration: 168, description: 'Action comedy', showtimes: [{theater: 'Escape Cinemas', time: '8:00 PM', price: 230}] }
    ];

    const otherMovies = [
      { id: 7, title: 'Avatar', genre: 'Action', language: 'English', rating: 8.5, poster: 'https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg', duration: 180, description: 'Epic sci-fi adventure', showtimes: [{theater: 'PVR Cinemas', time: '6:00 PM', price: 250}] },
      { id: 8, title: 'RRR', genre: 'Action', language: 'Hindi', rating: 9.0, poster: '/images/RRR.jpg', duration: 187, description: 'Period action drama', showtimes: [{theater: 'INOX', time: '9:00 PM', price: 300}] },
      { id: 9, title: 'Spider-Man', genre: 'Action', language: 'English', rating: 8.7, poster: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg', duration: 148, description: 'Superhero adventure', showtimes: [{theater: 'Cinepolis', time: '7:30 PM', price: 280}] },
      { id: 10, title: 'Pathaan', genre: 'Action', language: 'Hindi', rating: 8.2, poster: '/images/pathaan.webp', duration: 146, description: 'Spy thriller', showtimes: [{theater: 'PVR Cinemas', time: '8:00 PM', price: 320}] },
      { id: 11, title: 'Top Gun', genre: 'Action', language: 'English', rating: 8.9, poster: 'https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg', duration: 131, description: 'Aviation thriller', showtimes: [{theater: 'INOX', time: '6:30 PM', price: 290}] },
      { id: 12, title: 'KGF 2', genre: 'Action', language: 'Kannada', rating: 8.4, poster: '/images/kgf2.jpg', duration: 168, description: 'Period action', showtimes: [{theater: 'Multiplex', time: '9:30 PM', price: 310}] }
    ];

    return [...tamilMovies, ...otherMovies];
  };

  useEffect(() => {
    const searchMovies = () => {
      setLoading(true);
      const allMovies = getAllMovies();
      
      if (!query.trim()) {
        setResults([]);
        setLoading(false);
        return;
      }

      const filteredMovies = allMovies.filter(movie =>
        movie.title.toLowerCase().includes(query.toLowerCase()) ||
        movie.genre.toLowerCase().includes(query.toLowerCase()) ||
        movie.language.toLowerCase().includes(query.toLowerCase())
      );

      setResults(filteredMovies);
      setLoading(false);
    };

    searchMovies();
  }, [query]);

  if (loading) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <h2>Searching...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ padding: '40px 0 20px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '700', color: '#333', marginBottom: '10px' }}>
          Search Results
        </h1>
        <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px' }}>
          {query ? `Showing results for "${query}"` : 'Enter a search term'}
        </p>
      </div>

      {!query.trim() ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px',
          background: 'white',
          borderRadius: '15px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <Search size={48} color="#dc2626" style={{ marginBottom: '20px' }} />
          <h3 style={{ color: '#333', marginBottom: '10px' }}>Start Your Search</h3>
          <p style={{ color: '#666' }}>Use the search bar above to find movies, genres, or languages.</p>
        </div>
      ) : results.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px',
          background: 'white',
          borderRadius: '15px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>🎬</div>
          <h3 style={{ color: '#333', marginBottom: '10px' }}>Movie Not Found</h3>
          <p style={{ color: '#666' }}>
            No movies found for "{query}". Try searching for different keywords.
          </p>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: '20px' }}>
            <p style={{ color: '#666' }}>Found {results.length} movie{results.length !== 1 ? 's' : ''}</p>
          </div>
          
          <div className="movies-grid">
            {results.map(movie => (
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
        </>
      )}
    </div>
  );
};

export default SearchResults;