import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function Projects({ onBack }) {
  const projects = [
    {
      title: 'SpineBand (IoT & Mobile)',
      description: 'Sistema avanzado de monitorización postural. Construido en Kotlin con integración de hardware embebido ESP32. Utiliza sensores giroscópicos MPU6050 para procesar y transmitir telemetría en tiempo real.',
      tech: ['Kotlin', 'ESP32', 'MPU6050', 'C++', 'IoT'],
      github: 'https://github.com/Hazielcode/SpineBand',
      image: '/spineband-logo.png'
    },
    {
      title: 'TecMiner - Gestión Minera Integral',
      description: 'Plataforma ERP Minera de arquitectura distribuida con App Móvil nativa. Gestor completo de zonas de extracción, producción, mantenimiento y análisis, con 60+ endpoints y 9 módulos backend.',
      tech: ['Django REST', 'React', 'Kotlin', 'Python', 'MySQL', 'Spring Boot'],
      github: 'https://github.com/Tecsupsoft/2025-2-4c24-pi-pi_5a.git',
      image: '/tecminer-logo.png'
    },
    {
      title: 'HospitalSystem',
      description: 'Sistema de gestión hospitalaria moderno y escalable. Administra pacientes, médicos, citas y especialidades. Desarrollado con arquitectura MVC, integra base de datos NoSQL y vistas dinámicas para optimizar el flujo de trabajo médico diario.',
      tech: ['Java 17', 'Spring Boot', 'MongoDB', 'Thymeleaf', 'Bootstrap 5', 'Gradle'],
      github: 'https://github.com/Hazielcode/NOMERCY-SYSTEM',
      image: '/nomercy-system.png'
    }
  ];

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8 }}
      style={{ marginBottom: '6rem' }}
    >
      <button 
        onClick={onBack}
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

      <h3 className="section-title">Proyectos Personales</h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr', // Tarjeta ancha que ocupa todo el grid horizontal
        gap: '2rem',
        marginTop: '2rem'
      }}>
        {projects.map((project, i) => (
          <div key={i} className="glass-card" style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '2.5rem',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
            padding: '2rem'
          }}>
            {/* IZQUIERDA: Imagen del Logo (Tamaño Mediano y Centrado) */}
            <div style={{
              flex: '1 1 200px',
              maxWidth: '350px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '12px',
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.03)'
            }}>
              <img
                src={project.image}
                alt={`${project.title} Logo`}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '180px', // Lo hacemos más grande "mediano"
                  objectFit: 'contain',
                  filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.5))'
                }}
              />
            </div>

            {/* DERECHA: Información del Proyecto */}
            <div style={{ flex: '2 1 300px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                <h4 style={{ fontSize: '1.8rem', color: '#fff', margin: 0 }}>{project.title}</h4>
                <a href={project.github} target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', transition: 'color 0.3s ease' }} title="Ver Código en GitHub" onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.1-.34 6.33-1.53 6.33-6.98 0-1.5-.5-2.7-1.3-3.6.1-.3.6-1.7-.1-3.5 0 0-1-.3-3.3 1.2a11.5 11.5 0 0 0-6 0C7.3 1.5 6.3 1.8 6.3 1.8c-.7 1.8-.2 3.2-.1 3.5-.8.9-1.3 2.1-1.3 3.6 0 5.4 3.2 6.6 6.3 7A4.8 4.8 0 0 0 8 18v4"></path>
                  </svg>
                </a>
              </div>

              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.8rem' }}>
                {project.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                {project.tech.map((t, index) => (
                  <span key={index} style={{
                    fontSize: '0.9rem',
                    padding: '0.4rem 1rem',
                    background: 'rgba(255,255,255,0.04)',
                    borderRadius: '8px',
                    color: 'rgba(255,255,255,0.95)',
                    border: '1px solid rgba(255,255,255,0.12)'
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
