import React, { useState } from 'react';
import { 
  X, 
  GraduationCap, 
  Send, 
  CheckCircle, 
  Calendar, 
  User, 
  Mail, 
  MessageSquare 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const MentorshipModal = ({ alumni, isOpen, onClose, onMentorshipSuccess }) => {
  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    rollNo: '',
    topic: 'Career & Placement Guidance',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !alumni) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
    if (onMentorshipSuccess) {
      onMentorshipSuccess(alumni.name);
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
            <GraduationCap size={20} color="var(--brand-primary)" />
            <span>Connect with {alumni.name}</span>
          </div>
          <button className="modal-close-btn" onClick={handleClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <div style={{ 
                width: '60px', 
                height: '60px', 
                borderRadius: '50%', 
                background: 'var(--color-success-bg)', 
                color: 'var(--color-success)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 auto 1rem auto'
              }}>
                <CheckCircle size={32} />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Mentorship Request Sent!</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                Your request has been forwarded to <strong>{alumni.name}</strong> ({alumni.role} at {alumni.company}). They will coordinate a meeting link via your CUSAT email.
              </p>
              <button className="btn btn-primary" onClick={handleClose} style={{ width: '100%' }}>
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
                <img src={alumni.avatar} alt={alumni.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>{alumni.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--brand-accent)' }}>{alumni.role}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{alumni.company} • {alumni.batch}</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Your Full Name *</label>
                  <input 
                    type="text" 
                    required 
                    className="form-input" 
                    placeholder="e.g. Anandhu K."
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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
                    <label className="form-label">Roll Number</label>
                    <input 
                      type="text" 
                      required 
                      className="form-input" 
                      placeholder="IT24-042"
                      value={formData.rollNo}
                      onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Mentorship Area</label>
                  <select 
                    className="form-select"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  >
                    <option>Career & Placement Guidance</option>
                    <option>Resume & Portfolio Review</option>
                    <option>Higher Studies / Research Abroad</option>
                    <option>Startup / Product Ideation</option>
                    <option>Open Source & Hackathon Strategy</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Brief Note for Mentor</label>
                  <textarea 
                    rows={3} 
                    required 
                    className="form-textarea" 
                    placeholder="Describe what specific guidance you are seeking..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-footer" style={{ marginTop: '1.5rem', padding: '1rem 0 0 0', background: 'transparent' }}>
                <button type="button" className="btn btn-secondary" onClick={handleClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Send size={15} /> Send Mentorship Request
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
