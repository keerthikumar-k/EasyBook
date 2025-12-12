import { Film, Users, Star, Award } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="container">
      <section style={{ textAlign: 'center', padding: '60px 0' }}>
        <h1 style={{ fontSize: '48px', fontWeight: '800', color: '#333', marginBottom: '20px' }}>
          About EASY BOOK
        </h1>
        <p style={{ fontSize: '20px', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
          Your ultimate destination for hassle-free movie ticket booking
        </p>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', margin: '60px 0' }}>
        <div style={{ background: 'white', padding: '30px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <Film size={48} color="#dc2626" style={{ marginBottom: '20px' }} />
          <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '15px' }}>Latest Movies</h3>
          <p style={{ color: '#666' }}>Book tickets for the latest blockbusters and upcoming releases</p>
        </div>
        
        <div style={{ background: 'white', padding: '30px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <Users size={48} color="#dc2626" style={{ marginBottom: '20px' }} />
          <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '15px' }}>Easy Booking</h3>
          <p style={{ color: '#666' }}>Simple and quick booking process in just a few clicks</p>
        </div>
        
        <div style={{ background: 'white', padding: '30px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <Star size={48} color="#dc2626" style={{ marginBottom: '20px' }} />
          <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '15px' }}>Best Experience</h3>
          <p style={{ color: '#666' }}>Premium theaters with the best sound and picture quality</p>
        </div>
        
        <div style={{ background: 'white', padding: '30px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <Award size={48} color="#dc2626" style={{ marginBottom: '20px' }} />
          <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '15px' }}>Trusted Platform</h3>
          <p style={{ color: '#666' }}>Secure payments and reliable booking confirmations</p>
        </div>
      </div>

      <section style={{ background: 'white', padding: '50px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', textAlign: 'center' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '30px', color: '#333' }}>Our Mission</h2>
        <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#666', maxWidth: '800px', margin: '0 auto' }}>
          At EASY BOOK, we're passionate about making movie experiences accessible to everyone. 
          We believe that booking movie tickets should be as enjoyable as watching the movie itself. 
          Our platform connects movie lovers with their favorite cinemas, offering a seamless booking 
          experience with real-time seat availability, secure payments, and instant confirmations.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;