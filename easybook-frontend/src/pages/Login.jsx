import { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      // Simple login validation
      if (formData.email && formData.password) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', formData.email);
        localStorage.setItem('userName', formData.email.split('@')[0]);
        alert('🎉 Login successful!');
        window.location.href = '/';
      } else {
        alert('Please enter email and password');
      }
    } else {
      // Simple registration
      if (formData.name && formData.email && formData.password) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', formData.email);
        localStorage.setItem('userName', formData.name);
        alert('🎉 Account created successfully!');
        window.location.href = '/';
      } else {
        alert('Please fill all fields');
      }
    }
  };

  return (
    <div className="container">
      <div style={{ 
        maxWidth: '400px', 
        margin: '60px auto', 
        background: 'white', 
        padding: '40px', 
        borderRadius: '15px', 
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)' 
      }}>
        <h2 style={{ 
          textAlign: 'center', 
          fontSize: '28px', 
          fontWeight: '700', 
          marginBottom: '30px', 
          color: '#333' 
        }}>
          {isLogin ? 'Sign In' : 'Create Account'}
        </h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <User size={16} color="#dc2626" />
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter your full name"
                required={!isLogin}
              />
            </div>
          )}

          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={16} color="#dc2626" />
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Lock size={16} color="#dc2626" />
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn" style={{ width: '100%', padding: '15px', marginTop: '20px' }}>
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <span style={{ color: '#666' }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
          </span>
          <button
            onClick={() => setIsLogin(!isLogin)}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#dc2626', 
              cursor: 'pointer', 
              fontWeight: '600' 
            }}
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;