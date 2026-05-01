const PARTICLES = Array.from({ length: 26 }, (_, index) => {
    const size = 3 + (index % 5);
    const left = (index * 37 + 11) % 100;
    const top = (index * 19 + 7) % 100;
    const delay = (index % 8) * -1.4;
    const duration = 9 + (index % 7) * 1.3;
    const driftX = ((index % 9) - 4) * 18;
    const driftY = 36 + (index % 6) * 18;
    const opacity = 0.28 + (index % 5) * 0.1;
    const tone = index % 3 === 0 ? "cyan" : index % 3 === 1 ? "gold" : "rose";

    return {
        id: `particle-${index}`,
        size,
        left,
        top,
        delay,
        duration,
        driftX,
        driftY,
        opacity,
        tone,
    };
});

const BEAMS = Array.from({ length: 8 }, (_, index) => ({
    id: `beam-${index}`,
    top: 10 + index * 11,
    delay: index * -1.8,
    duration: 8 + (index % 4) * 1.5,
    width: 120 + (index % 3) * 80,
}));

export default function FuturisticParticles() {
    return (
        <div className="future-particles pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden="true">
            {BEAMS.map((beam) => (
                <span
                    key={beam.id}
                    className="future-beam"
                    style={{
                        top: `${beam.top}%`,
                        width: `${beam.width}px`,
                        animationDelay: `${beam.delay}s`,
                        animationDuration: `${beam.duration}s`,
                    }}
                />
            ))}

            {PARTICLES.map((particle) => (
                <span
                    key={particle.id}
                    className={`future-particle future-particle-${particle.tone}`}
                    style={{
                        left: `${particle.left}%`,
                        top: `${particle.top}%`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        opacity: particle.opacity,
                        animationDelay: `${particle.delay}s`,
                        animationDuration: `${particle.duration}s`,
                        "--particle-drift-x": `${particle.driftX}px`,
                        "--particle-drift-y": `${particle.driftY}px`,
                    }}
                />
            ))}
        </div>
    );
}
