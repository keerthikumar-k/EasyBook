import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, MapPin, Clock, Users, CreditCard } from 'lucide-react';

const Booking = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [movie, setMovie] = useState(null);
  const [formData, setFormData] = useState({
    email: localStorage.getItem('userEmail') || '',
    seats: 1,
    showtime: searchParams.get('showtime') || '',
    theater: searchParams.get('theater') || '',
    price: parseInt(searchParams.get('price')) || 0
  });
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBooking(true);
    
    // Simulate booking process
    setTimeout(() => {
      const bookingData = {
        id: Date.now().toString(),
        movieId: id,
        userEmail: formData.email,
        showtime: formData.showtime,
        theater: formData.theater,
        seats: formData.seats,
        totalPrice: formData.price * formData.seats,
        bookingDate: new Date().toISOString(),
        movie: movie
      };
      
      // Save to localStorage
      const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      existingBookings.push(bookingData);
      localStorage.setItem('bookings', JSON.stringify(existingBookings));
      
      setBooking(false);
      navigate('/booking-confirmation', { state: { bookingData } });
    }, 2000);
  };

  if (loading) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <h2>Movie not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '10px', 
        marginBottom: '20px',
        padding: '15px 0',
        borderBottom: '1px solid #e0e0e0'
      }}>
        <button 
          onClick={() => navigate(-1)}
          style={{ 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            color: '#dc2626'
          }}
        >
          <ArrowLeft size={20} />
          Back
        </button>
        <span style={{ color: '#666' }}>/</span>
        <span style={{ color: '#333', fontWeight: '500' }}>{movie.title}</span>
        <span style={{ color: '#666' }}>/</span>
        <span style={{ color: '#dc2626', fontWeight: '500' }}>Book Tickets</span>
      </div>

      <div className="booking-container">
        <div className="booking-form">
          <h2 style={{ 
            color: '#333', 
            marginBottom: '25px',
            fontSize: '24px',
            fontWeight: '600'
          }}>
            Quick Book
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="Enter your email"
                readOnly={!!localStorage.getItem('isLoggedIn')}
                style={{
                  backgroundColor: localStorage.getItem('isLoggedIn') ? '#f8f9fa' : 'white',
                  cursor: localStorage.getItem('isLoggedIn') ? 'not-allowed' : 'text'
                }}
                required
              />
              {localStorage.getItem('isLoggedIn') && (
                <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                  Booking as: {localStorage.getItem('userName')}
                </p>
              )}
            </div>
            
            <div className="form-group">
              <label>How Many Seats? *</label>
              <select
                value={formData.seats}
                onChange={(e) => setFormData({...formData, seats: parseInt(e.target.value)})}
              >
                {[1,2,3,4,5,6,7,8,9,10].map(num => (
                  <option key={num} value={num}>{num} Ticket{num > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
            
            <button 
              type="submit" 
              className="btn" 
              style={{ width: '100%', padding: '15px' }}
              disabled={booking}
            >
              {booking ? 'Processing...' : `Pay ₹${formData.price * formData.seats}`}
            </button>
          </form>
        </div>

        <div className="booking-summary">
          <h3 style={{ 
            color: '#333', 
            marginBottom: '20px',
            fontSize: '20px',
            fontWeight: '600'
          }}>
            Booking Summary
          </h3>
          
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ 
              color: '#dc2626', 
              fontSize: '18px', 
              fontWeight: '600',
              marginBottom: '10px'
            }}>
              {movie.title}
            </h4>
            <p style={{ color: '#666', fontSize: '14px' }}>
              {movie.genre} • {movie.language} • {movie.duration} mins
            </p>
          </div>

          <div style={{ 
            background: '#f8f9fa', 
            padding: '15px', 
            borderRadius: '6px',
            marginBottom: '20px'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              marginBottom: '10px'
            }}>
              <MapPin size={16} color="#dc2626" />
              <span style={{ fontSize: '14px', fontWeight: '500' }}>{formData.theater}</span>
            </div>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              marginBottom: '10px'
            }}>
              <Clock size={16} color="#dc2626" />
              <span style={{ fontSize: '14px' }}>
                {new Date().toLocaleDateString()} • {formData.showtime}
              </span>
            </div>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px'
            }}>
              <Users size={16} color="#dc2626" />
              <span style={{ fontSize: '14px' }}>{formData.seats} Ticket{formData.seats > 1 ? 's' : ''}</span>
            </div>
          </div>

          <div style={{ 
            borderTop: '1px solid #e0e0e0',
            paddingTop: '15px'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              marginBottom: '10px'
            }}>
              <span>Tickets ({formData.seats}x)</span>
              <span>₹{formData.price * formData.seats}</span>
            </div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              fontSize: '18px',
              fontWeight: '600',
              color: '#dc2626',
              borderTop: '1px solid #e0e0e0',
              paddingTop: '10px'
            }}>
              <span>Total</span>
              <span>₹{formData.price * formData.seats}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;