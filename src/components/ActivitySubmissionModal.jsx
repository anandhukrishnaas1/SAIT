import React, { useState } from 'react';
import { 
  X, 
  Award, 
  UploadCloud, 
  FileCheck, 
  CheckCircle, 
  Calendar, 
  User, 
  Clock,
  Link as LinkIcon 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { activityCategories } from '../data/initialActivityData';

export const ActivitySubmissionModal = ({ isOpen, onClose, onActivityAdded }) => {
  const [formData, setFormData] = useState({
    studentName: 'Anandhu K. (You)',
    studentRoll: 'IT24-042',
    semester: 'Semester 5',
    eventName: '',
    category: 'Hackathon & Codefest',
    role: 'Team Lead & Developer',
    date: new Date().toISOString().split('T')[0],
    description: '',
    proofType: 'url',
    proofUrl: '',
    proofFileName: ''
  });

  const [simulatedFile, setSimulatedFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  // Calculate dynamic activity points
  const getCalculatedPoints = () => {
    let base = 30;
    if (formData.category.includes('Hackathon')) base = 50;
    if (formData.category.includes('Publication')) base = 60;
    if (formData.category.includes('Workshop')) base = 35;
    if (formData.category.includes('Leadership')) base = 40;
    if (formData.category.includes('Competition')) base = 35;
    if (formData.role.toLowerCase().includes('lead') || formData.role.toLowerCase().includes('winner')) {
      base += 10;
    }
    return base;
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSimulatedFile(file.name);
      setFormData({
        ...formData,
        proofFileName: file.name,
        proofUrl: `https://storage.cusat.ac.in/sait/proofs/${file.name}`
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newActivity = {
      id: `act-${Date.now()}`,
      studentName: formData.studentName,
      studentRoll: formData.studentRoll,
      semester: formData.semester,
      eventName: formData.eventName,
      category: formData.category,
      role: formData.role,
      date: formData.date,
      description: formData.description,
      proofUrl: formData.proofUrl || 'https://drive.google.com/file/d/sait-proof/view',
      proofName: formData.proofFileName || 'Certificate_Proof.pdf',
      points: getCalculatedPoints(),
      status: 'Pending',
      verifiedBy: 'Pending Faculty Review',
      verifiedAt: null,
      kudos: 1
    };

    onActivityAdded(newActivity);
    setSubmitted(true);
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  const handleClose = () => {
    setSubmitted(false);
    setFormData({
      studentName: 'Anandhu K. (You)',
      studentRoll: 'IT24-042',
      semester: 'Semester 5',
      eventName: '',
      category: 'Hackathon & Codefest',
      role: 'Team Lead & Developer',
      date: new Date().toISOString().split('T')[0],
      description: '',
      proofType: 'url',
      proofUrl: '',
      proofFileName: ''
    });
    setSimulatedFile(null);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <Award size={22} color="var(--brand-primary)" />
            <span>{submitted ? 'Activity Submitted Successfully' : 'Record Student Activity'}</span>
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
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.4rem' }}>Activity Logged to History!</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Your submission for <strong>{formData.eventName}</strong> has been logged with an estimated <strong>+{getCalculatedPoints()} SAIT Credits</strong>. It is now awaiting faculty verification.
              </p>

              <div style={{ background: 'var(--bg-tertiary)', padding: '1.25rem', borderRadius: 'var(--radius-md)', textAlign: 'left', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Status:</span>
                  <span className="status-badge status-Pending" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Clock size={12} /> Pending Faculty Review
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Potential Credits:</span>
                  <span style={{ fontWeight: '700', color: 'var(--brand-accent)' }}>+{getCalculatedPoints()} Pts</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Proof Attached:</span>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                    {formData.proofFileName || 'Online Drive Verification'}
                  </span>
                </div>
              </div>

              <button className="btn btn-primary" onClick={handleClose} style={{ width: '100%' }}>
                Done & View History
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ background: 'var(--bg-tertiary)', padding: '0.85rem 1.25rem', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ESTIMATED CREDITS:</span>
                  <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--brand-accent)' }}>
                    +{getCalculatedPoints()} Points
                  </div>
                </div>
                <span className="skill-tag" style={{ background: 'var(--grad-badge)', color: 'var(--brand-accent)' }}>
                  Tier: Activity Logger
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Activity / Event Name *</label>
                  <input 
                    type="text" 
                    required 
                    className="form-input" 
                    placeholder="e.g. IEEE ICCI Conference / SIH Hackathon"
                    value={formData.eventName}
                    onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                  />
                </div>

                <div className="modal-form-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Category *</label>
                    <select 
                      className="form-select"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      {activityCategories.map((c) => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Role / Standing *</label>
                    <input 
                      type="text" 
                      required 
                      className="form-input" 
                      placeholder="e.g. Team Lead / Winner / Attendee"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    />
                  </div>
                </div>

                <div className="modal-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Date Completed *</label>
                    <input 
                      type="date" 
                      required 
                      className="form-input" 
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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
                      <option>Semester 3</option>
                      <option>Semester 5</option>
                      <option>Semester 7</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Description & Contributions *</label>
                  <textarea 
                    rows={2} 
                    required 
                    className="form-textarea" 
                    placeholder="Briefly describe what you built, solved, or presented..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                {/* Proof & Certificate Verification */}
                <div className="form-group">
                  <label className="form-label">Proof of Participation / Certificate Link *</label>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <input 
                      type="url" 
                      className="form-input" 
                      placeholder="https://drive.google.com/cert-link or GitHub URL"
                      value={formData.proofUrl}
                      onChange={(e) => setFormData({ ...formData, proofUrl: e.target.value })}
                    />
                  </div>

                  <div style={{ 
                    border: '1px dashed var(--border-highlight)', 
                    borderRadius: 'var(--radius-md)', 
                    padding: '0.85rem', 
                    textAlign: 'center',
                    background: 'var(--bg-input)'
                  }}>
                    <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                      <UploadCloud size={16} color="var(--brand-accent)" />
                      <span>{simulatedFile ? `Attached: ${simulatedFile}` : 'Or click to simulate uploading certificate PDF'}</span>
                      <input type="file" accept=".pdf,.png,.jpg,.jpeg" onChange={handleFileUpload} style={{ display: 'none' }} />
                    </label>
                  </div>
                </div>
              </div>

              <div className="modal-footer" style={{ marginTop: '1.5rem', padding: '1rem 0 0 0', background: 'transparent' }}>
                <button type="button" className="btn btn-secondary" onClick={handleClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <UploadCloud size={16} /> Submit Activity Record
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
