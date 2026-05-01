import Reveal from "./Reveal.jsx";

const isNonEmpty = (value) => typeof value === "string" && value.trim().length > 0;

const normalizeLines = (lines = []) => lines.filter((line) => isNonEmpty(line));

const normalizeItems = (items = []) => items.filter((item) => isNonEmpty(item?.time) || isNonEmpty(item?.event));

const getCardClass = (variant) => (variant === "parchment" ? "bg-ivory/60" : "bg-surface/65");

export function DetailCard({ eyebrow, title, subtitle, lines, mapLink, variant = "white", layout = "list", items = [], className = "" }) {
    const normalizedLines = normalizeLines(lines);
    const normalizedItems = normalizeItems(items);

    const hasContent = isNonEmpty(eyebrow) || isNonEmpty(title) || normalizedLines.length > 0 || normalizedItems.length > 0;

    if (!hasContent) return null;

    return (
        <Reveal animation="scaleIn" className={`h-full ${className}`.trim()}>
            <div
                className={`glass-panel neon-outline cyber-frame relative overflow-hidden rounded-[1.75rem] border border-cyan/15 ${getCardClass(
                    variant
                )} flex h-full flex-col p-6 shadow-royal transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl sm:p-7`}
            >
                <div className="absolute inset-x-5 top-4 h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent" />
                {isNonEmpty(eyebrow) ? (
                    <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.42em] text-cyan/80">{eyebrow}</p>
                ) : null}

                {isNonEmpty(title) || isNonEmpty(subtitle) ? (
                    <>
                        {isNonEmpty(title) ? (
                            <h3
                                className={`font-serif font-bold uppercase tracking-[0.08em] text-maroon ${
                                    isNonEmpty(eyebrow) ? "mt-3 text-2xl" : "text-xl "
                                }`}
                            >
                                {title}
                            </h3>
                        ) : null}

                        {isNonEmpty(subtitle) ? <h2 className="mt-2 text-sm font-medium uppercase tracking-[0.12em] text-gold">{subtitle}</h2> : null}
                    </>
                ) : null}

                {layout === "timeline" ? (
                    <div className={`mt-${isNonEmpty(eyebrow) || isNonEmpty(title) ? "3" : "0"} grid gap-4 md:grid-cols-2`}>
                        {normalizedItems.map((item) => (
                            <div key={`${item.time}-${item.event}`} className="flex items-start gap-4">
                                <p className="min-w-[90px] text-base font-semibold text-cyan">{item.time}</p>
                                <p className="text-base text-teak/80">{item.event}</p>
                            </div>
                        ))}
                    </div>
                ) : normalizedLines.length ? (
                    <div className="mt-3 flex-1 space-y-1 text-base text-teak/80">
                        {normalizedLines.map((line) => (
                            <p key={line}>{line}</p>
                        ))}
                    </div>
                ) : null}

                {mapLink ? (
                    <div className="mt-6 flex justify-end">
                        <a
                            href={mapLink}
                            target="_blank"
                            rel="noreferrer"
                            className="group inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-surface/70 px-6 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-maroon shadow-md transition-all duration-300 hover:scale-105 hover:bg-cyan/10 hover:shadow-lg"
                        >
                            <span>Open Map</span>

                            <svg
                                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>
                ) : null}
            </div>
        </Reveal>
    );
}

export function buildDetailCards(data) {
    const bride = data?.couple?.bride || {};
    const groom = data?.couple?.groom || {};
    const ceremony = data?.ceremony || {};

    return [
        {
            key: "bride",
            title: bride.name,
            subtitle: bride.parents,
            lines: normalizeLines([bride.address, bride.address1, bride.hometown]),
        },
        {
            key: "groom",
            title: groom.name,
            subtitle: groom.parents,
            lines: normalizeLines([groom.address, groom.address1, groom.hometown]),
        },
        {
            key: "ceremony",
            // title: ceremony.subtitle,
            subtitle: ceremony.intro,
            lines: normalizeLines([...(ceremony.details || []), ceremony.dressCode]),
            variant: "parchment",
        },
    ].filter((card) => card.title || (card.lines && card.lines.length));
}

export function buildWelcomeCards(data) {
    const reception = data?.events?.reception || {};
    const invitation = data?.invitation || {};

    const receptionLine = [reception.dateText, reception.timeText].filter(isNonEmpty).join(" · ");

    return [
        {
            key: "reception",
            eyebrow: reception.title,
            title: receptionLine,
            lines: normalizeLines([reception.note, reception.description]),
            variant: "parchment",
        },
        {
            key: "blessings",
            eyebrow: "Blessings",
            title: "",
            lines: normalizeLines([invitation.blessingsMessage, invitation.closingLine]),
            variant: "parchment",
        },
    ].filter((card) => card.eyebrow || card.title || (card.lines && card.lines.length));
}

export function buildScheduleCard(data) {
    const schedule = data?.schedule || [];
    const items = normalizeItems(schedule);

    return {
        key: "schedule",
        title: "",
        layout: "timeline",
        items,
        variant: "parchment",
    };
}

export function buildVenueCards(data) {
    const venueFallback = data?.venue;
    const venues =
        data?.venues && data.venues.length
            ? data.venues
            : venueFallback
              ? [
                    {
                        title: "Venue",
                        name: venueFallback.name,
                        addressLines: venueFallback.addressLines,
                        mapLink: venueFallback.mapLink,
                    },
                ]
              : [];

    return venues.map((item, index) => ({
        key: item.title || `venue-${index}`,
        title: item.name,
        subtitle: item.title,
        lines: normalizeLines([...(item.addressLines || [])]),
        mapLink: item.mapLink,
        variant: "parchment",
    }));
}

export default DetailCard;
