import { useEffect, useRef } from 'react';

export default function NodeBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Resize robusto
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);

    // Ajustes estéticos "Suaves y Elegantes"
    const NUM_NODES = 80;
    const CONNECT_DISTANCE = 150;
    
    // El mouse atraerá ligeramente a los nodos
    let mouse = { x: null, y: null, radius: 200 };
    const handleMouseMove = (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    class Node {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4; // Muy lento para ser elegante
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.5 + 0.5; // Muy pequeños (1.5px)
      }

      update() {
        // Interacción suave con el mouse
        if (mouse.x != null && mouse.y != null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= (dx * force * 0.015);
            this.y -= (dy * force * 0.015);
          }
        }

        this.x += this.vx;
        this.y += this.vy;

        // Rebote simple en bordes
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'; // Gris perlado muy transparente
        ctx.fill();
      }
    }

    const nodes = Array.from({ length: NUM_NODES }, () => new Node());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      nodes.forEach(node => {
        node.update();
        node.draw();
      });

      // Conexiones de la "Malla"
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECT_DISTANCE) {
            // Opacidad relativa a cuán cerca están
            const opacity = 1 - (dist / CONNECT_DISTANCE);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.07})`; // Líneas híper sutiles (7% opacidad máx base)
            
            // Si el mouse está cerca de la línea, brillan levemente
            if (mouse.x && mouse.y) {
               const mouseDist = Math.sqrt(Math.pow(mouse.x - nodes[i].x, 2) + Math.pow(mouse.y - nodes[i].y, 2));
               if (mouseDist < 120) {
                 ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.25})`; // Sube a 25% opacidad
               }
            }

            ctx.lineWidth = 0.8;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setSize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div id="bg-canvas-container">
      <canvas ref={canvasRef} style={{ display: 'block' }} />
    </div>
  );
}
