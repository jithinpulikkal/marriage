import { Link, useParams } from "react-router-dom";
import SectionHeader from "../components/SectionHeader.jsx";
import weddingData from "../data/weddingData.js";
import usePhotoData from "../hooks/usePhotoData.js";
import { findCategory, findGroup } from "../utils/photos.js";
import Reveal from "../components/Reveal.jsx";

function buildImageCandidates(id, fallbackUrl) {
    if (id) {
        return [
            `https://drive.google.com/thumbnail?id=${id}&sz=w1000`,
            `https://drive.google.com/uc?export=view&id=${id}`,
            `https://lh3.googleusercontent.com/d/${id}`
        ];
    }
    return fallbackUrl ? [fallbackUrl] : [];
}

function toTitleCase(value) {
    if (!value) {
        return "";
    }
    return value
        .split(/\s+/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

export default function PhotoGallery() {
    const { side, section } = useParams();
    const photoState = usePhotoData();
    const group = findGroup(photoState.groups, side);
    const category = findCategory(group, section);
    const displaySection = toTitleCase(section);

    return (
        <div className="mx-auto max-w-6xl px-5 pb-16">
            <SectionHeader
                eyebrow="Photos"
                title={section ? `${displaySection} Collection` : "Photo Collection"}
                description={weddingData.photos.notice}
            />

            <div className="mb-10 flex flex-wrap gap-6 justify-between">
                <Link
                    to={`/photos/${side}`}
                    className="text-xs uppercase tracking-[0.35em] text-gold hover:text-maroon"
                >
                    Back to Sections
                </Link>
                <Link
                    to="/photos"
                    className="text-xs uppercase tracking-[0.35em] text-gold hover:text-maroon"
                >
                    Back to Photos Overview
                </Link>
            </div>

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

            {photoState.status !== "loading" && (!group || !category) && (
                <div className="rounded-2xl border border-gold/20 bg-surface/70 p-8 text-sm uppercase tracking-[0.35em] text-maroon shadow-royal">
                    No matching photo section found.
                </div>
            )}

            {photoState.status !== "loading" && category && (
                <div className="space-y-12">
                    <p className="text-xs uppercase tracking-[0.35em] text-gold">
                        {category.name}
                    </p>
                    {category.items.length ? (
                        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {category.items.map((item) => {
                                const viewLink = `/photos/view?id=${encodeURIComponent(
                                    item.id
                                )}&name=${encodeURIComponent(item.name)}&side=${encodeURIComponent(
                                    side
                                )}&section=${encodeURIComponent(section)}`;
                                const candidates = buildImageCandidates(item.id, item.thumbUrl || item.viewUrl);

                                return (
                                    <Reveal key={item.id} animation="scaleIn" asChild>
                                        <Link
                                            to={viewLink}
                                            className="group overflow-hidden rounded-2xl border border-gold/20 bg-surface/70 shadow-royal transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-xl"
                                        >
                                            <div className="aspect-[4/3] w-full overflow-hidden bg-ivory">
                                                <img
                                                    src={candidates[0]}
                                                    alt={item.name}
                                                    loading="lazy"
                                                    onError={(event) => {
                                                        const currentIndex = Number(
                                                            event.currentTarget.dataset.fallbackIndex || "0"
                                                        );
                                                        const nextIndex = currentIndex + 1;
                                                        if (candidates[nextIndex]) {
                                                            event.currentTarget.dataset.fallbackIndex = String(nextIndex);
                                                            event.currentTarget.src = candidates[nextIndex];
                                                        }
                                                    }}
                                                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                                />
                                            </div>
                                            {/* <div className="px-4 py-3 text-xs uppercase tracking-[0.3em] text-teak/80">
                                                {item.name}
                                            </div> */}
                                        </Link>
                                    </Reveal>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="mt-3 text-sm text-teak/70">
                            Photos for this section will appear soon.
                        </p>
                    )}
                </div>
            )}

           
        </div>
    );
}
