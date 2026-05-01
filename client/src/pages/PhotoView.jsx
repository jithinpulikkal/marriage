import { Link, useSearchParams } from "react-router-dom";
import Reveal from "../components/Reveal.jsx";

function buildImageCandidates(id, srcParam) {
    if (id) {
        return [
            `https://drive.google.com/uc?export=view&id=${id}`,
            `https://drive.google.com/thumbnail?id=${id}&sz=w2000`,
            `https://lh3.googleusercontent.com/d/${id}`
        ];
    }
    return srcParam ? [srcParam] : [];
}

export default function PhotoView() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const srcParam = searchParams.get("src");
    const name = searchParams.get("name") || "Wedding Photo";
    const side = searchParams.get("side");
    const section = searchParams.get("section");

    const candidates = buildImageCandidates(id, srcParam);
    const downloadUrl = id
        ? `https://drive.google.com/uc?export=download&id=${id}`
        : searchParams.get("download") || srcParam;

    const backToSection = side && section ? `/photos/${side}/${section}` : null;
    const backToSide = side ? `/photos/${side}` : null;

    if (!candidates.length) {
        return (
            <div className="mx-auto max-w-4xl px-5 pb-20 sm:pb-28">
                <h1 className="text-2xl font-serif text-maroon">Photo not found</h1>
                <p className="mt-4 text-teak/80">This photo link is missing or invalid.</p>
                <Link
                    to={backToSection || backToSide || "/photos"}
                    className="mt-6 inline-flex text-xs uppercase tracking-[0.35em] text-gold hover:text-maroon"
                >
                    Back to Photos
                </Link>
            </div>
        );
    }

    return (
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 pb-16">
            <div className="flex flex-wrap gap-6 justify-between">
                {backToSection && (
                    <Link
                        to={backToSection}
                        className="text-xs uppercase tracking-[0.35em] text-gold hover:text-maroon"
                    >
                        Back to Grid
                    </Link>
                )}
                {backToSide && (
                    <Link
                        to={backToSide}
                        className="text-xs uppercase tracking-[0.35em] text-gold hover:text-maroon"
                    >
                        Back to Section
                    </Link>
                )}
                <Link
                    to="/photos"
                    className="text-xs uppercase tracking-[0.35em] text-gold hover:text-maroon"
                >
                    Back to Photos Overview
                </Link>
            </div>

            <Reveal animation="fadeIn">
                <div className="flex min-h-[60vh] items-center justify-center rounded-2xl border border-gold/20 bg-surface/80 p-4 shadow-royal">
                    <img
                        src={candidates[0]}
                        alt={name}
                        onError={(event) => {
                            const currentIndex = Number(event.currentTarget.dataset.fallbackIndex || "0");
                            const nextIndex = currentIndex + 1;
                            if (candidates[nextIndex]) {
                                event.currentTarget.dataset.fallbackIndex = String(nextIndex);
                                event.currentTarget.src = candidates[nextIndex];
                            }
                        }}
                        className="max-h-[80vh] w-full object-contain"
                    />
                </div>
            </Reveal>

            <Reveal animation="fadeUp">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-gold">Full Resolution</p>
                        <p className="mt-2 text-lg font-serif text-maroon">{name}</p>
                    </div>
                    {downloadUrl && (
                        <a
                            href={downloadUrl}
                            download
                            className="inline-flex items-center justify-center rounded-full border border-gold/60 px-6 py-2 text-xs uppercase tracking-[0.35em] text-maroon transition hover:bg-gold/10"
                        >
                            Download
                        </a>
                    )}
                </div>
            </Reveal>
        </div>
    );
}
