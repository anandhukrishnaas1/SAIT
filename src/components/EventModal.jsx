import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  MapPin, 
  Clock, 
  Trophy, 
  CheckCircle, 
  User, 
  Mail, 
  Phone,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const EventModal = ({ event, isOpen, onClose, onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    rollNo: '',
    semester: 'Semester 5',
    teamName: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !event) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    if (onRegisterSuccess) {
      onRegisterSuccess(event.title);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <Calendar size={20} color="var(--brand-primary)" />
            <span>{submitted ? 'Registration Confirmed!' : `Register for ${event.title}`}</span>
          </div>
          <button className="modal-close-btn" onClick={handleClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <div style={{ 
                width: '64px', 
                height: '64px', 
                borderRadius: '50%', 
                background: 'var(--color-success-bg)', 
                color: 'var(--color-success)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto'
              }}>
                <CheckCircle size={36} />
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>You're Registered!</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Your pass for <strong>{event.title}</strong> has been generated. Confirmation details sent to <strong>{formData.email}</strong>.
              </p>

              {/* Digital Event Pass Ticket */}
              <div style={{ 
                background: 'var(--bg-tertiary)', 
                border: '1px dashed var(--brand-primary)', 
                borderRadius: 'var(--radius-lg)', 
                padding: '1.5rem',
                textAlign: 'left'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--brand-accent)', fontWeight: '700' }}>SAIT OFFICIAL EVENT PASS</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>PASS #SAIT-2026-{Math.floor(1000 + Math.random() * 9000)}</span>
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.25rem' }}>{formData.fullName}</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  Roll: {formData.rollNo} • {formData.semester}
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}><MapPin size={13} style={{ color: 'var(--brand-primary)' }} /> {event.venue}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}><Calendar size={13} style={{ color: 'var(--brand-primary)' }} /> {event.date} at {event.time}</span>
                </div>
              </div>

              <button className="btn btn-primary" onClick={handleClose} style={{ marginTop: '1.75rem', width: '100%' }}>
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.25rem' }}>{event.tagline}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}><Calendar size={13} /> {event.date}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}><MapPin size={13} /> {event.venue}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}><Trophy size={13} /> {event.prizePool}</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input 
                    type="text" 
                    required 
                    className="form-input" 
                    placeholder="e.g. Rahul Sharma"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>

                <div className="modal-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">CUSAT Email *</label>
                    <input 
                      type="email" 
                      required 
                      className="form-input" 
                      placeholder="student@cusat.ac.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">WhatsApp / Phone *</label>
                    <input 
                      type="tel" 
                      required 
                      className="form-input" 
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="modal-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">University Roll No *</label>
                    <input 
                      type="text" 
                      required 
                      className="form-input" 
                      placeholder="IT24-042"
                      value={formData.rollNo}
                      onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Current Semester</label>
                    <select 
                      className="form-select"
                      value={formData.semester}
                      onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                    >
                      <option>Semester 1</option>
                      <option>Semester 2</option>
                      <option>Semester 3</option>
                      <option>Semester 4</option>
                      <option>Semester 5</option>
                      <option>Semester 6</option>
                      <option>Semester 7</option>
                      <option>Semester 8</option>
                    </select>
                  </div>
                </div>

                {event.category === 'Hackathon' && (
                  <div className="form-group">
                    <label className="form-label">Team Name (Optional for Hackathons)</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. NeuralCoders"
                      value={formData.teamName}
                      onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                    />
                  </div>
                )}
              </div>

              <div className="modal-footer" style={{ marginTop: '1.5rem', padding: '1rem 0 0 0', background: 'transparent' }}>
                <button type="button" className="btn btn-secondary" onClick={handleClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <CheckCircle size={16} /> Confirm Free Registration
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
