"use client";

import React, { useEffect, useState } from 'react';

const Particles: React.FC = () => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * 3 + 1}px`,
        delay: `${Math.random() * 25}s`,
        translateX: `${(Math.random() - 0.5) * 20}vw`,
      }));
      setParticles(newParticles);
    };
    generateParticles();
  }, []);

  return (
    <div id="particle-container">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            // @ts-ignore
            '--translateX': p.translateX,
          }}
        />
      ))}
    </div>
  );
};

export default Particles;
