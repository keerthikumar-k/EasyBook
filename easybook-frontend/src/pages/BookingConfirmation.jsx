import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Download, Share2, Calendar, MapPin, Users, CreditCard } from 'lucide-react';

const BookingConfirmation = () => {
  const location = useLocation();
  const [bookingData, setBookingData] = useState(null);
  const [qrCode, setQrCode] = useState('');

  useEffect(() => {
    const data = location.state?.bookingData;
    if (data) {
      setBookingData(data);
      // Generate QR code URL with booking details
      const qrData = `EASY BOOK Ticket\nBooking ID: ${data.id}\nMovie: ${data.movie?.title}\nTheater: ${data.theater}\nDate: ${new Date(data.bookingDate).toLocaleDateString()}\nTime: ${data.showtime}\nSeats: ${data.seats}\nTotal: ₹${data.totalPrice}`;
      setQrCode(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`);
    }
  }, [location.state]);

  if (!bookingData) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <h2>No booking data found</h2>
          <Link to="/" className="btn">Go Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ 
        maxWidth: '600px', 
        margin: '40px auto', 
        background: 'white', 
        borderRadius: '15px', 
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        {/* Success Header */}
        <div style={{ 
          background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)', 
          color: 'white', 
          padding: '30px', 
          textAlign: 'center' 
        }}>
          <CheckCircle size={48} style={{ marginBottom: '15px' }} />
          <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '10px' }}>
            Booking Confirmed!
          </h1>
          <p style={{ fontSize: '16px', opacity: '0.9' }}>
            Your tickets have been booked successfully
          </p>
        </div>

        {/* Booking Details */}
        <div style={{ padding: '30px' }}>
          <div style={{ 
            background: '#f8f9fa', 
            padding: '20px', 
            borderRadius: '10px', 
            marginBottom: '25px',
            border: '2px dashed #dc2626'
          }}>
            <h2 style={{ 
              color: '#dc2626', 
              fontSize: '20px', 
              fontWeight: '600', 
              marginBottom: '15px',
              textAlign: 'center'
            }}>
              🎬 {bookingData.movie?.title}
            </h2>
            
            <div style={{ display: 'grid', gap: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Calendar size={18} color="#dc2626" />
                <div>
                  <strong>Date & Time:</strong> {new Date(bookingData.bookingDate).toLocaleDateString()} • {bookingData.showtime}
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin size={18} color="#dc2626" />
                <div>
                  <strong>Theater:</strong> {bookingData.theater}
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Users size={18} color="#dc2626" />
                <div>
                  <strong>Seats:</strong> {bookingData.seats} Ticket{bookingData.seats > 1 ? 's' : ''}
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CreditCard size={18} color="#dc2626" />
                <div>
                  <strong>Total Paid:</strong> ₹{bookingData.totalPrice}
                </div>
              </div>
            </div>
          </div>

          {/* Booking ID & QR Code */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr auto', 
            gap: '20px', 
            alignItems: 'center',
            background: '#f8f9fa',
            padding: '20px',
            borderRadius: '10px',
            marginBottom: '25px'
          }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px' }}>
                Booking ID
              </h3>
              <p style={{ 
                fontSize: '18px', 
                fontWeight: '700', 
                color: '#dc2626',
                fontFamily: 'monospace',
                background: 'white',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #e0e0e0'
              }}>
                #{bookingData.id.slice(-8).toUpperCase()}
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px' }}>
                QR Code
              </h3>
              <img 
                src={qrCode} 
                alt="Booking QR Code" 
                style={{ 
                  width: '120px', 
                  height: '120px', 
                  border: '2px solid #dc2626',
                  borderRadius: '10px'
                }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '15px',
            marginBottom: '20px'
          }}>
            <button 
              onClick={() => window.print()}
              className="btn" 
              style={{ 
                background: 'linear-gradient(135deg, #6c757d 0%, #495057 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Download size={16} />
              Download
            </button>
            
            <button 
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Movie Ticket',
                    text: `I booked tickets for ${bookingData.movie?.title}!`,
                    url: window.location.href
                  });
                }
              }}
              className="btn"
              style={{ 
                background: 'linear-gradient(135deg, #17a2b8 0%, #138496 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Share2 size={16} />
              Share
            </button>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/my-bookings" className="btn" style={{ marginRight: '10px' }}>
              View All Bookings
            </Link>
            <Link to="/" className="btn" style={{ 
              background: 'linear-gradient(135deg, #333 0%, #000 100%)' 
            }}>
              Book More Tickets
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;