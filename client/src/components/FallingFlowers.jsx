const FLOWERS = Array.from({ length: 18 }, (_, index) => {
    const size = 24 + (index % 5) * 9;
    const left = (index * 97) % 100;
    const delay = (index % 6) * -2.1;
    const duration = 12 + (index % 5) * 2.2;
    const drift = ((index % 7) - 3) * 24;
    const rotate = (index % 2 === 0 ? 1 : -1) * (24 + (index % 4) * 12);
    const opacity = 0.28 + (index % 4) * 0.12;
    const sway = 18 + (index % 6) * 8;
    const scale = 0.82 + (index % 4) * 0.08;
    const themeClass =
        index % 4 === 0
            ? "flower-aura-coral"
            : index % 4 === 1
              ? "flower-aura-gold"
              : index % 4 === 2
                ? "flower-aura-cyan"
                : "flower-aura-rose";

    return {
        id: `flower-${index}`,
        size,
        left,
        delay,
        duration,
        drift,
        rotate,
        opacity,
        sway,
        scale,
        className: index % 3 === 0 ? "flower flower-blossom" : "flower flower-petal",
        themeClass,
    };
});

export default function FallingFlowers() {
    return (
        <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden="true">
            {FLOWERS.map((flower) => (
                <span
                    key={flower.id}
                    className="flower-shell"
                    style={{
                        left: `${flower.left}%`,
                        width: `${flower.size}px`,
                        height: `${flower.size}px`,
                        opacity: flower.opacity,
                        animationDelay: `${flower.delay}s`,
                        animationDuration: `${flower.duration}s`,
                        "--flower-drift": `${flower.drift}px`,
                        "--flower-rotate": `${flower.rotate}deg`,
                        "--flower-sway": `${flower.sway}px`,
                        "--flower-scale": flower.scale,
                    }}
                >
                    <span className={`${flower.className} ${flower.themeClass}`} />
                </span>
            ))}
        </div>
    );
}
