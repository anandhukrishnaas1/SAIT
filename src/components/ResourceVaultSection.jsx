import React, { useState } from 'react';
import { 
  FolderDown, 
  FileText, 
  Download, 
  Code, 
  BookOpen, 
  Layers, 
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { resourcesData } from '../data/resourcesData';

export const ResourceVaultSection = ({ onNotifyToast }) => {
  const [selectedSem, setSelectedSem] = useState('All');

  const sems = ['All', 'Semester 5', 'Semester 6', 'Semester 7'];

  const filteredResources = selectedSem === 'All' 
    ? resourcesData 
    : resourcesData.filter(r => r.semester === selectedSem);

  const handleDownload = (res) => {
    if (onNotifyToast) {
      onNotifyToast(`Downloading ${res.subject} (${res.type})...`);
    }
  };

  return (
    <section id="resources" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-badge">
            <FolderDown size={14} /> Academic Knowledge Base
          </span>
          <h2 className="section-title">
            CUSAT IT <span className="brand-gradient-text">Resource Vault</span>
          </h2>
          <p className="section-subtitle">
            Curated repository of syllabus modules, lab code manuals, handwritten lecture notes, 
            and solved CUSAT university question papers.
          </p>
        </div>

        {/* Semester Filters */}
        <div className="filter-tabs">
          {sems.map((s) => (
            <button
              key={s}
              className={`filter-pill ${selectedSem === s ? 'active' : ''}`}
              onClick={() => setSelectedSem(s)}
            >
              {s === 'All' ? 'All Semesters' : s}
            </button>
          ))}
        </div>

        {/* Resource Cards */}
        <div className="resource-grid">
          {filteredResources.map((res, i) => (
            <div key={i} className="glass-card resource-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="resource-sem">{res.semester}</span>
                <span className="skill-tag" style={{ color: 'var(--brand-primary)' }}>{res.type}</span>
              </div>

              <h3 className="resource-subject">{res.subject}</h3>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                Course Code: {res.code}
              </div>

              <p className="resource-desc">{res.description}</p>

              <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {res.size} • {res.downloads} dl
                </span>
                
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleDownload(res)}
                >
                  <Download size={13} /> Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
