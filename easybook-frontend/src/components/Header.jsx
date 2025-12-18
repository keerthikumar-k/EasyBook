import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, MapPin, Ticket } from 'lucide-react';
import { useState, useEffect } from 'react';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState(() => {
    return localStorage.getItem('selectedCity') || 'Mumbai';
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli'];

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    const name = localStorage.getItem('userName');
    setIsLoggedIn(!!loggedIn);
    setUserName(name || '');
  }, []);

  const handleCityChange = (e) => {
    const newCity = e.target.value;
    setSelectedCity(newCity);
    localStorage.setItem('selectedCity', newCity);
    // Trigger custom event to notify other components
    window.dispatchEvent(new CustomEvent('cityChanged'));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setUserName('');
    alert('Logged out successfully!');
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-top">
        🎬 Book tickets for the latest movies - EASY BOOK
      </div>
      
      <div className="header-main">
        <div className="header-content">
          <Link to="/" className="logo">
            <Ticket size={32} />
            EASY BOOK
          </Link>
          
          <form onSubmit={handleSearch} className="search-container">
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search for Movies, Events, Plays, Sports and Activities"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                color: '#333',
                backgroundColor: '#fff',
                border: '2px solid #e0e0e0',
                outline: 'none'
              }}
            />
          </form>
          
          <div className="location-signin">
            <select 
              className="location-btn"
              value={selectedCity}
              onChange={handleCityChange}
              style={{ 
                background: 'none',
                border: '2px solid #e0e0e0',
                color: '#666',
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '10px 15px',
                borderRadius: '20px',
                transition: 'all 0.3s'
              }}
            >
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            {isLoggedIn ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ color: '#333', fontSize: '14px' }}>Hi, {userName}!</span>
                <button 
                  onClick={handleLogout}
                  style={{
                    background: 'linear-gradient(135deg, #6c757d 0%, #495057 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="signin-btn"
                style={{
                  background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 25px',
                  borderRadius: '25px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: '0 4px 15px rgba(220, 38, 38, 0.3)',
                  textDecoration: 'none',
                  display: 'inline-block'
                }}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
      
      <nav className="nav-bar">
        <div className="nav-content">
          <ul className="nav-links">
            <li>
              <Link 
                to="/" 
                className={location.pathname === '/' ? 'active' : ''}
              >
                Home
              </Link>
            </li>
            <li>
              <Link to="/movies">
                Movies
              </Link>
            </li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/stream">Stream</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/plays">Plays</Link></li>
            <li>
              <Link 
                to="/my-bookings"
                className={location.pathname === '/my-bookings' ? 'active' : ''}
              >
                My Bookings
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;