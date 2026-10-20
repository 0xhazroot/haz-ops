import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Settings, 
  Network, 
  Cloud, 
  ExternalLink,
  Award,
  ArrowLeft,
  Eye,
  X,
  Database
} from 'lucide-react';

const certificationsData = [
  {
    id: 1,
    title: "Junior Cybersecurity Analyst",
    issuer: "Cisco Networking Academy",
    date: "Jun 2024",
    category: "Cybersecurity",
    icon: <ShieldCheck size={24} />,
    verifyUrl: "https://www.credly.com/badges/9db2c710-3d68-48e0-b33b-ac80f297e19a",
    img: "/certs/cyber-analyst.png",
    logoColor: "#007bff"
  },
  {
    id: 2,
    title: "IT Essentials: PC Hardware & Software",
    issuer: "Cisco Networking Academy",
    date: "Dec 2024",
    category: "Networking & IT",
    icon: <Settings size={24} />,
    verifyUrl: "https://www.credly.com/badges/674a20dd-c57a-4fc1-a804-f1e4dc3dd8f0",
    logoColor: "#ffffff"
  },
  {
    id: 3,
    title: "Linux Unhatched (NDG)",
    issuer: "Cisco / NDG",
    date: "2024",
    category: "Networking & IT",
    icon: <Settings size={24} />,
    img: "/certs/linux-unhatched.png",
    verifyUrl: "#",
    logoColor: "#f5ba13"
  },
  {
    id: 4,
    title: "Learn-A-Thon 2024",
    issuer: "Cisco Networking Academy",
    date: "Jun 2024",
    category: "Networking & IT",
    icon: <Network size={24} />,
    verifyUrl: "https://www.credly.com/badges/1bacd460-95ba-428a-bd0a-f213c4f0e5d3/public_url",
    logoColor: "#00bfa5"
  },
  {
    id: 5,
    title: "Especialista en Power BI",
    issuer: "Tecsup",
    date: "2024",
    category: "Data Analytics",
    icon: <Database size={24} />,
    img: "/certs/power-bi-tecsup.png",
    verifyUrl: "#",
    logoColor: "#FFD700"
  },
  {
    id: 6,
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "Próximamente",
    category: "Cloud",
    icon: <Cloud size={24} />,
    verifyUrl: "#",
    isPlaceholder: true,
    logoColor: "#FF9900"
  }
];

const categories = ["Todos", "Cybersecurity", "Networking & IT", "Data Analytics", "Cloud"];

export default function Certifications({ onBack }) {
  const [activeTab, setActiveTab] = useState("Todos");
  const [selectedImg, setSelectedImg] = useState(null);

  const filteredCerts = activeTab === "Todos" 
    ? certificationsData 
    : certificationsData.filter(cert => cert.category === activeTab);

  return (
    <motion.section 
      id="certifications"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.8 }}
      style={{ marginBottom: '6rem' }}
    >
      <button 
        onClick={onBack}
        className="back-btn"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          background: 'none',
          border: 'none',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          padding: '0',
          marginBottom: '2rem',
          fontSize: '1rem',
          transition: 'color 0.3s ease'
        }}
        onMouseEnter={(e) => e.target.style.color = '#fff'}
        onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
      >
        <ArrowLeft size={20} /> Volver al Inicio
      </button>

      <h3 className="section-title">Certificaciones & Logros</h3>

      {/* Tabs Filtrado */}
      <div className="filter-container" style={{ display: 'flex', gap: '0.8rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`filter-btn ${activeTab === cat ? 'active' : ''}`}
            style={{
              padding: '0.6rem 1.2rem',
              borderRadius: '8px',
              border: '1px solid var(--border-subtle)',
              background: activeTab === cat ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              color: activeTab === cat ? '#fff' : 'var(--text-muted)',
              cursor: 'pointer',
              fontSize: '0.85rem',
              transition: 'all 0.3s ease',
              fontFamily: 'var(--font-display)'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de Certificados */}
      <motion.div 
        layout
        className="certs-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem'
        }}
      >
        <AnimatePresence mode='popLayout'>
          {filteredCerts.map((cert) => (
            <motion.div
              layout
              key={cert.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="glass-card cert-card"
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '230px',
                opacity: cert.isPlaceholder ? 0.6 : 1,
                border: `1px solid ${cert.isPlaceholder ? 'rgba(255,255,255,0.05)' : 'var(--border-subtle)'}`
              }}
            >
              <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', opacity: 0.4 }}>
                <Award size={36} strokeWidth={1} />
              </div>

              <div>
                <div style={{ 
                  color: cert.logoColor, 
                  marginBottom: '1rem',
                  background: `rgba(${cert.logoColor === '#ffffff' ? '255,255,255' : '0,0,0'}, 0.05)`,
                  width: 'fit-content',
                  padding: '10px',
                  borderRadius: '10px'
                }}>
                  {cert.icon}
                </div>
                
                <h4 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '0.4rem', paddingRight: '2rem' }}>
                  {cert.title}
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  {cert.issuer}
                </p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '1.5rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {cert.date}
                </span>
                
                <div style={{ display: 'flex', gap: '0.8rem' }}>
                  {cert.img && (
                    <button 
                      onClick={() => setSelectedImg(cert.img)}
                      className="view-btn"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontSize: '0.8rem',
                        color: '#fff',
                        padding: '0.4rem 0.8rem',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      Ver Foto <Eye size={14} />
                    </button>
                  )}

                  {!cert.isPlaceholder && cert.verifyUrl !== "#" && (
                    <a 
                      href={cert.verifyUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="verify-link"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontSize: '0.8rem',
                        color: 'rgba(0, 240, 255, 0.9)',
                        padding: '0.4rem 0.8rem',
                        background: 'rgba(0, 240, 255, 0.05)',
                        border: '1px solid rgba(0, 240, 255, 0.2)',
                        borderRadius: '6px',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Validar <ExternalLink size={14} />
                    </a>
                  )}
                </div>
                
                {cert.isPlaceholder && (
                  <span style={{ fontStyle: 'italic', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    In Progress
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Modal Visualizador */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(8px)',
              zIndex: 1000,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '2rem'
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                maxWidth: '90%',
                maxHeight: '90%',
                background: 'var(--bg-color)',
                borderRadius: '12px',
                border: '1px solid var(--border-subtle)',
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
              }}
            >
              <button 
                onClick={() => setSelectedImg(null)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(0,0,0,0.5)',
                  border: 'none',
                  color: '#fff',
                  borderRadius: '50%',
                  padding: '8px',
                  cursor: 'pointer',
                  zIndex: 10
                }}
              >
                <X size={24} />
              </button>
              <img 
                src={selectedImg} 
                alt="Certificado"
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  maxHeight: '80vh', 
                  display: 'block',
                  objectFit: 'contain'
                }}
              />
              <div style={{ padding: '1rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Imagen del Certificado
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
