import Reveal from "./Reveal.jsx";

export default function SectionHeader({ eyebrow, title, description }) {
    return (
        <Reveal animation="fadeUp">
            <div className="mb-10 text-center">
                {eyebrow && (
                    <p className="font-body text-[0.72rem] font-semibold uppercase tracking-[0.48em] text-cyan/75">
                        {eyebrow}
                    </p>
                )}
                <h2 className="mt-4 font-serif text-3xl font-bold uppercase tracking-[0.12em] text-maroon sm:text-5xl md:text-6xl leading-tight">
                    {title}
                </h2>
                {description && (
                    <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-teak/80 sm:text-lg">{description}</p>
                )}
            </div>
        </Reveal>
    );
}
