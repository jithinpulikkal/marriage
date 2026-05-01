import SectionHeader from "../components/SectionHeader.jsx";
import { Link } from "react-router-dom";
import weddingData from "../data/weddingData.js";
import usePhotoData from "../hooks/usePhotoData.js";
import Reveal from "../components/Reveal.jsx";

const placeholderPhotos = Array.from({ length: weddingData.photos.placeholderCount }, (_, index) => index + 1);

export default function Photos() {
    const photoState = usePhotoData();

    return (
        <div className="mx-auto max-w-6xl px-5 pb-16">
            <SectionHeader eyebrow="Photos" title="Wedding Memories" description={weddingData.photos.notice} />

            {photoState.status === "loading" && (
                <div className="rounded-2xl border border-gold/20 bg-surface/70 p-8 text-sm uppercase tracking-[0.35em] text-gold shadow-royal">
                    Loading photos...
                </div>
            )}

            {photoState.status === "error" && (
                <div className="rounded-2xl border border-gold/20 bg-surface/70 p-8 text-sm uppercase tracking-[0.35em] text-maroon shadow-royal">
                    {photoState.message}
                </div>
            )}

            {photoState.status === "ready" && (
                <div className="grid gap-6 sm:grid-cols-2">
                    {["bride", "groom"].map((label) => (
                        <Reveal key={label} animation="scaleIn" asChild>
                            <Link
                                to={`/photos/${label}`}
                                className="group rounded-2xl border border-gold/20 bg-surface/70 p-8 shadow-royal transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-xl"
                            >
                                <p className="text-xs uppercase tracking-[0.35em] text-gold">
                                    {label === "bride" ? "Bride Side" : "Groom Side"}
                                </p>
                                <h3 className="mt-3 text-2xl font-serif text-maroon">
                                    {label === "bride" ? "Raveena's Family" : "Jithin's Family"}
                                </h3>
                                <p className="mt-4 text-sm text-teak/80">
                                    View albums from the {label} side celebrations and rituals.
                                </p>
                            </Link>
                        </Reveal>
                    ))}
                </div>
            )}

            {photoState.status === "empty" && (
                <>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {placeholderPhotos.map((item) => (
                            <Reveal key={item} animation="scaleIn" asChild>
                                <div
                                    className="flex h-40 items-center justify-center rounded-2xl border border-gold/20 bg-surface/70 text-sm uppercase tracking-widest text-gold shadow-royal transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-gold/40"
                                >
                                    Photo {item}
                                </div>
                            </Reveal>
                        ))}
                    </div>
                    <Reveal animation="fadeIn">
                        <div className="mt-12 rounded-2xl border border-gold/20 bg-surface/70 p-8 shadow-royal sm:p-10">
                            <p className=" leading-relaxed text-teak/80">{weddingData.photos.phaseTwo}</p>
                        </div>
                    </Reveal>
                </>
            )}

            {photoState.status === "ready" && (
                <Reveal animation="fadeIn">
                    <div className="mt-12 rounded-2xl border border-gold/20 bg-surface/70 p-8 shadow-royal sm:p-10">
                        <p className="text-sm uppercase tracking-[0.35em] text-gold">Choose a side to view albums</p>
                        <p className="mt-4 leading-relaxed text-teak/80">
                            Photos are now live. Select Bride or Groom to view each collection.
                        </p>
                    </div>
                </Reveal>
            )}

            {/* <div className="mt-12 rounded-2xl border border-gold/20 bg-white/70 p-8 shadow-royal sm:p-10">
                <p className=" leading-relaxed text-teak/80">{weddingData.photos.phaseTwo}</p>
            </div> */}
        </div>
    );
}
