import { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, MapPin, Users, CreditCard, Mail, Ticket } from 'lucide-react';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const fetchBookings = async () => {
    if (!email) return;
    
    setLoading(true);
    setSearched(true);
    
    // Simulate loading delay
    setTimeout(() => {
      const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      const userBookings = allBookings.filter(booking => booking.userEmail === email);
      setBookings(userBookings);
      setLoading(false);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchBookings();
  };

  return (
    <div className="container">
      <div style={{ 
        background: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        <h1 style={{ 
          color: '#333', 
          marginBottom: '20px',
          fontSize: '28px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <Ticket size={32} color="#dc2626" />
          My Bookings
        </h1>
        
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'end' }}>
            <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={16} color="#dc2626" />
                Enter your email to view bookings
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                style={{ marginTop: '8px' }}
              />
            </div>
            <button type="submit" className="btn" disabled={loading} style={{ padding: '12px 30px' }}>
              {loading ? 'Searching...' : 'View Bookings'}
            </button>
          </div>
        </form>
      </div>

      {searched && bookings.length === 0 && !loading && (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px',
          background: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>🎬</div>
          <h3 style={{ color: '#333', marginBottom: '10px' }}>No bookings found</h3>
          <p style={{ color: '#666' }}>You haven't made any bookings with this email address yet.</p>
        </div>
      )}

      <div style={{ display: 'grid', gap: '20px' }}>
        {bookings.map((booking) => (
          <div key={booking.id} className="booking-card">
            <div className="booking-header">
              <div>
                <h3 className="booking-movie-title">
                  {booking.movie?.title || 'Movie'}
                </h3>
                <p style={{ color: '#666', fontSize: '14px', marginTop: '5px' }}>
                  Booking ID: #{booking.id.slice(-8).toUpperCase()}
                </p>
              </div>
              <div className="booking-status">CONFIRMED</div>
            </div>
            
            <div className="booking-details">
              <div className="booking-detail">
                <Calendar size={18} color="#dc2626" />
                <div>
                  <p style={{ fontWeight: '500', color: '#333' }}>Show Date & Time</p>
                  <p>{new Date(booking.bookingDate).toLocaleDateString()} • {booking.showtime}</p>
                </div>
              </div>
              
              <div className="booking-detail">
                <MapPin size={18} color="#dc2626" />
                <div>
                  <p style={{ fontWeight: '500', color: '#333' }}>Theater</p>
                  <p>{booking.theater}</p>
                </div>
              </div>
              
              <div className="booking-detail">
                <Users size={18} color="#dc2626" />
                <div>
                  <p style={{ fontWeight: '500', color: '#333' }}>Seats</p>
                  <p>{booking.seats} Ticket{booking.seats > 1 ? 's' : ''}</p>
                </div>
              </div>
              
              <div className="booking-detail">
                <CreditCard size={18} color="#dc2626" />
                <div>
                  <p style={{ fontWeight: '500', color: '#333' }}>Amount Paid</p>
                  <p style={{ fontWeight: '600', color: '#dc2626' }}>₹{booking.totalPrice}</p>
                </div>
              </div>
            </div>
            
            <div style={{ 
              marginTop: '20px',
              paddingTop: '15px',
              borderTop: '1px solid #f0f0f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <p style={{ color: '#666', fontSize: '13px' }}>
                Booked on {new Date(booking.bookingDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;