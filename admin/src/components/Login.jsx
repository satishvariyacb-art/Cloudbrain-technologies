import React, { useState } from 'react';
import { Shield, Eye, EyeOff, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { api } from '../services/api';

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const res = await api.login(email.trim(), password);
      if (res.success) {
        onLoginSuccess(res.user);
      } else {
        setError(res.error || 'Authentication failed');
      }
    } catch (err) {
      setError(err.message || 'Unable to connect to the Admin API.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cb-login-wrapper">
      <div className="cb-login-card">
        <div className="cb-login-header">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <img 
              src="/logo.svg" 
              alt="CloudBrain Logo" 
              style={{ height: '38px', width: 'auto' }} 
              onError={(e) => {
                e.target.style.display = 'none';
                if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div style={{ display: 'none', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.4rem', color: '#0066ff' }}>
              <Shield size={28} />
              <span>CloudBrain</span>
            </div>
          </div>
          <span className="cb-badge pill-blue" style={{ fontSize: '0.72rem', letterSpacing: '0.05em' }}>
            PORT 5174 • SECURE PORTAL
          </span>
          <h2 className="cb-login-title">Admin Console</h2>
          <p className="cb-login-subtitle">Secure management for jobs, candidacies, and media</p>
        </div>

        {error && (
          <div className="cb-login-error">
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="cb-login-form">
          <div className="cb-form-group">
            <label className="cb-form-label">Admin Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input 
                type="email" 
                className="cb-form-input"
                style={{ paddingLeft: '2.5rem' }}
                placeholder="Admin email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div className="cb-form-group">
            <label className="cb-form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input 
                type={showPassword ? 'text' : 'password'} 
                className="cb-form-input"
                style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '0.25rem' }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="cb-btn cb-btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '0.85rem 1rem', fontSize: '0.95rem' }}
            disabled={loading}
          >
            {loading ? (
              <span>Signing in...</span>
            ) : (
              <>
                <span>Sign In to Admin</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
