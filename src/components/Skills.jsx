import { motion } from 'framer-motion';
import { 
  Container, 
  ServerCog, 
  Cloud, 
  Network, 
  Bot, 
  Settings2, 
  ActivitySquare, 
  TerminalSquare 
} from 'lucide-react';

export default function Skills() {
  const skillsList = [
    { name: 'Docker', desc: 'Contenedores. La base de todo el ecosistema.', icon: <Container size={28} strokeWidth={1.5} /> },
    { name: 'Kubernetes', desc: 'Orquestación a escala y alta disponibilidad.', icon: <ServerCog size={28} strokeWidth={1.5} /> },
    { name: 'AWS / Azure', desc: 'Proveedores Cloud corporativos de infraestructura.', icon: <Cloud size={28} strokeWidth={1.5} /> },
    { name: 'Terraform', desc: 'Infraestructura como Código (IaC) puro.', icon: <Network size={28} strokeWidth={1.5} /> },
    { name: 'CI / CD', desc: 'GitHub Actions y Jenkins para automatizar despliegues.', icon: <Bot size={28} strokeWidth={1.5} /> },
    { name: 'Ansible', desc: 'Configuración de miles de servidores automáticamente.', icon: <Settings2 size={28} strokeWidth={1.5} /> },
    { name: 'Prometheus & Grafana', desc: 'Observabilidad visual y monitorización en tiempo real.', icon: <ActivitySquare size={28} strokeWidth={1.5} /> },
    { name: 'Linux & Bash', desc: 'El lenguaje del servidor y base del Devops.', icon: <TerminalSquare size={28} strokeWidth={1.5} /> }
  ];

  return (
    <motion.section 
      id="skills"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8 }}
    >
      <h3 className="section-title">Core Arquitectura & Stack Tecnológico</h3>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.5rem',
        marginTop: '2rem'
      }}>
        {skillsList.map((skill, i) => (
          <div key={i} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ color: 'var(--text-muted)' }}>
              {skill.icon}
            </div>
            <div>
              <h4 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '0.4rem' }}>{skill.name}</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                {skill.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
