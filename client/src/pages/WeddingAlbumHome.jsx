import IllustrationCard from "../components/IllustrationCard.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import usePhotoData from "../hooks/usePhotoData.js";
import { findGroup } from "../utils/photos.js";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal.jsx";

function SectionCard({ side, section }) {
    return (
        <Link
            to={`/photos/${side}/${encodeURIComponent(section.toLowerCase())}`}
            className="group rounded-2xl border border-gold/20 bg-surface/70 p-6 shadow-royal transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-xl"
        >
            <p className="text-xs uppercase tracking-[0.35em] text-gold">{section}</p>
            <p className="mt-3 text-sm text-teak/80">
                View {section.toLowerCase()} memories from the {side} side.
            </p>
        </Link>
    );
}

function findAlbumHero(groups) {
    const albumCategory = groups
        .flatMap((group) => group.categories || [])
        .find((category) => category.name?.toLowerCase().includes("album"));

    if (albumCategory?.items?.length) {
        return albumCategory.items[0];
    }

    for (const group of groups) {
        for (const category of group.categories || []) {
            if (category.items?.length) {
                return category.items[0];
            }
        }
    }

    return null;
}

function buildImageCandidates(id, fallbackUrl) {
    if (id) {
        return [
            `https://drive.google.com/thumbnail?id=${id}&sz=w2000`,
            `https://drive.google.com/uc?export=view&id=${id}`,
            `https://lh3.googleusercontent.com/d/${id}`,
        ];
    }
    return fallbackUrl ? [fallbackUrl] : [];
}

export default function WeddingAlbumHome() {
    const photoState = usePhotoData();
    const brideGroup = findGroup(photoState.groups, "bride");
    const groomGroup = findGroup(photoState.groups, "groom");

    const brideSections = brideGroup?.categories?.map((c) => c.name) || [];
    const groomSections = groomGroup?.categories?.map((c) => c.name) || [];

    const heroItem = findAlbumHero(photoState.groups);
    const heroCandidates = buildImageCandidates(heroItem?.id, heroItem?.thumbUrl || heroItem?.viewUrl);

    return (
        <div className="mx-auto max-w-6xl px-5 pb-16">
            <SectionHeader
                eyebrow="Wedding Album"
                title="Raveena & Jithin"
                description="A curated album of our wedding memories."
            />

            {photoState.status === "loading" && (
                <div className="rounded-2xl border border-gold/20 bg-surface/70 p-8 text-sm uppercase tracking-[0.35em] text-gold shadow-royal">
                    Loading album...
                </div>
            )}

            {photoState.status === "error" && (
                <div className="rounded-2xl border border-gold/20 bg-surface/70 p-8 text-sm uppercase tracking-[0.35em] text-maroon shadow-royal">
                    {photoState.message}
                </div>
            )}

            {photoState.status !== "loading" && heroItem && heroCandidates.length > 0 && (
                <Reveal animation="fadeIn">
                    <div className="mb-12 overflow-hidden rounded-3xl border border-gold/20 bg-surface/80 shadow-royal">
                        <div className="relative flex  items-center justify-center overflow-hidden">
                            <IllustrationCard
                                title="Bride & Groom"
                                subtitle="Traditional Kerala wedding portrait"
                                imageSrc={heroCandidates[0]}
                                imageAlt="Bride and groom illustration"
                            />
                        </div>
                    </div>
                </Reveal>
            )}

            {photoState.status !== "loading" && (
                <div className="space-y-12">
                    <Reveal animation="fadeIn">
                        <div className="rounded-2xl border border-gold/20 bg-surface/70 p-8 shadow-royal">
                            <p className="text-xs uppercase tracking-[0.35em] text-gold">Browse by Side</p>
                            <div className="mt-6 grid gap-6 sm:grid-cols-2">
                                <Reveal animation="scaleIn" asChild>
                                    <Link
                                        to="/photos/bride"
                                        className="group rounded-2xl border border-gold/20 bg-surface/70 p-6 shadow-royal transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-xl"
                                    >
                                        <p className="text-xs uppercase tracking-[0.35em] text-gold">Bride Side</p>
                                        <p className="mt-3 text-sm text-teak/80">View albums from Raveena's family.</p>
                                    </Link>
                                </Reveal>
                                <Reveal animation="scaleIn" asChild>
                                    <Link
                                        to="/photos/groom"
                                        className="group rounded-2xl border border-gold/20 bg-surface/70 p-6 shadow-royal transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-xl"
                                    >
                                        <p className="text-xs uppercase tracking-[0.35em] text-gold">Groom Side</p>
                                        <p className="mt-3 text-sm text-teak/80">View albums from Jithin's family.</p>
                                    </Link>
                                </Reveal>
                            </div>
                        </div>
                    </Reveal>

                    {!brideSections.length && !groomSections.length && (
                        <Reveal animation="fadeIn">
                            <div className="rounded-2xl border border-gold/20 bg-surface/70 p-8 text-sm uppercase tracking-[0.35em] text-gold shadow-royal">
                                Albums will appear here once photos are uploaded.
                            </div>
                        </Reveal>
                    )}
                </div>
            )}
        </div>
    );
}
