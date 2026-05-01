import Reveal from "./Reveal.jsx";

export default function IllustrationCard({
    title,
    subtitle,
    imageSrc,
    imageAlt,
    onImageLoad,
    onImageError,
    imageLoading,
    className = "",
    fillImage = false,
    animateImage = true,
}) {
    return (
        <Reveal animation="scaleIn" className={`h-full ${className}`.trim()}>
            <div className="glass-panel neon-outline cyber-frame holo-sweep relative flex h-full overflow-hidden rounded-[2rem] border border-cyan/20 shadow-royal">
                <div className="absolute inset-0 bg-[linear-gradient(140deg,_rgba(255,176,79,0.14),_transparent_38%),linear-gradient(320deg,_rgba(77,220,255,0.18),_transparent_35%)]" />
                <div className="absolute inset-0 bg-mesh-grid bg-[length:32px_32px] opacity-25" />
                <div
                    className={`relative flex h-full w-full flex-col items-center justify-center text-center ${
                        fillImage ? "p-4 sm:p-5 lg:p-6" : "p-8 sm:p-10 lg:p-12"
                    }`}
                >
                    {imageSrc ? (
                        <div className={`w-full ${fillImage ? "h-full" : ""}`}>
                            <img
                                src={imageSrc}
                                alt={imageAlt || title}
                                className={`w-full border border-cyan/20 object-cover shadow-glow ${
                                    animateImage ? "motion-safe:animate-slowZoom" : ""
                                } ${
                                    fillImage ? "h-full min-h-[28rem] rounded-[1.5rem]" : "h-full min-h-[18rem] rounded-[1.5rem]"
                                }`}
                                loading={imageLoading || "lazy"}
                                onLoad={onImageLoad}
                                onError={onImageError}
                            />
                        </div>
                    ) : (
                        <div className="mb-7 h-36 w-36 rounded-full border border-cyan/20 bg-gradient-to-br from-gold/30 via-white/30 to-cyan/20 shadow-glow motion-safe:animate-floatSoft" />
                    )}
                </div>
            </div>
        </Reveal>
    );
}
