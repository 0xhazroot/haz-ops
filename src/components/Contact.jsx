import { motion } from 'framer-motion';
import { Mail, FileText } from 'lucide-react';

export default function Contact() {
  const networks = [
    { 
      name: 'GitHub', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.1-.34 6.33-1.53 6.33-6.98 0-1.5-.5-2.7-1.3-3.6.1-.3.6-1.7-.1-3.5 0 0-1-.3-3.3 1.2a11.5 11.5 0 0 0-6 0C7.3 1.5 6.3 1.8 6.3 1.8c-.7 1.8-.2 3.2-.1 3.5-.8.9-1.3 2.1-1.3 3.6 0 5.4 3.2 6.6 6.3 7A4.8 4.8 0 0 0 8 18v4"></path></svg>, 
      url: 'https://github.com/Hazielcode' 
    },
    { 
      name: 'LinkedIn', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>, 
      url: 'https://www.linkedin.com/in/samir-alfonso/' 
    },
    { 
      name: 'Instagram', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>, 
      url: 'https://www.instagram.com/hazziel_cold/?hl=es' 
    },
    { name: 'Email', icon: <Mail size={20} />, url: 'mailto:samiralfonsotoro@gmail.com' },
    { name: 'Descargar CV', icon: <FileText size={20} />, url: 'https://www.linkedin.com/in/samir-alfonso/' }
  ];

  return (
    <motion.section 
      id="contact"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      style={{ marginBottom: '6rem' }}
    >
      <h3 className="section-title">Conecta Conmigo</h3>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>
        Actualmente abierto a nuevas oportunidades en roles de Arquitectura Cloud, Infraestructura o DevOps.
      </p>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {networks.map((net, i) => (
          <a key={i} href={net.url} target="_blank" rel="noreferrer"
            className="glass-card"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.8rem', 
              padding: '0.8rem 1.5rem',
              color: 'var(--text-main)',
              fontSize: '0.95rem'
            }}
          >
            {net.icon} {net.name}
          </a>
        ))}
      </div>
    </motion.section>
  );
}
