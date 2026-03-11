import React, { useState } from 'react';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import './App.css';

function App() {
  const [role, setRole] = useState(null); // 'admin' or 'people'
  const [password, setPassword] = useState('');
  const [loginRole, setLoginRole] = useState('people');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === '1234') {
      setRole(loginRole);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  const handleLogout = () => {
    setRole(null);
    setPassword('');
  };

  if (role === 'admin') return <AdminDashboard onLogout={handleLogout} />;
  if (role === 'people') return <UserDashboard onLogout={handleLogout} />;

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Society Voting Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '10px' }}>
          <label>Select Role: </label>
          <select value={loginRole} onChange={(e) => setLoginRole(e.target.value)}>
            <option value="people">Society Member (People)</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;