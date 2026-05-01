import { useEffect, useState } from "react";
import SectionHeader from "../components/SectionHeader.jsx";
import IllustrationCard from "../components/IllustrationCard.jsx";
import DetailCard, { buildDetailCards, buildWelcomeCards, buildVenueCards } from "../components/DetailCard.jsx";
import weddingData from "../data/weddingData.js";
import brideGroomImage from "../assets/bridegroom.jpg";
import templeImage from "../assets/temple.png";
import Reveal from "../components/Reveal.jsx";

const WEDDING_TARGET = new Date("2026-09-12T10:45:00+05:30").getTime();
const WEDDING_END = new Date("2026-09-12T12:30:00+05:30").getTime();

function getCountdownParts(targetTime) {
    const difference = targetTime - Date.now();

    if (difference <= 0) {
        return {
            isComplete: true,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };
    }

    const totalSeconds = Math.floor(difference / 1000);

    return {
        isComplete: false,
        days: Math.floor(totalSeconds / 86400),
        hours: Math.floor((totalSeconds % 86400) / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
    };
}

function formatGoogleCalendarDate(timestamp) {
    return new Date(timestamp).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function escapeIcsText(value) {
    return value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

export default function Home() {
    const { brand, couple, events, invitation, ceremony, venues } = weddingData;
    const detailCards = buildDetailCards(weddingData);
    const welcomeCards = buildWelcomeCards(weddingData);
    const venueCards = buildVenueCards(weddingData);

    const [heroReady, setHeroReady] = useState(false);
    const [countdown, setCountdown] = useState(() => getCountdownParts(WEDDING_TARGET));
    const handleHeroReady = () => setHeroReady(true);

    useEffect(() => {
        const intervalId = window.setInterval(() => {
            setCountdown(getCountdownParts(WEDDING_TARGET));
        }, 1000);

        return () => window.clearInterval(intervalId);
    }, []);

    const weddingVenue = venues[0];
    const eventTitle = `${couple.bride.name} & ${couple.groom.name} Wedding Ceremony`;
    const eventDescription = `${events.wedding.description} ${invitation.closingLine}`;
    const eventLocation = [weddingVenue.name, ...weddingVenue.addressLines].join(", ");
    const googleCalendarLink =
        "https://calendar.google.com/calendar/render?action=TEMPLATE" +
        `&text=${encodeURIComponent(eventTitle)}` +
        `&dates=${formatGoogleCalendarDate(WEDDING_TARGET)}/${formatGoogleCalendarDate(WEDDING_END)}` +
        `&details=${encodeURIComponent(eventDescription)}` +
        `&location=${encodeURIComponent(eventLocation)}`;

    const handleCalendarDownload = () => {
        const icsContent = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "PRODID:-//Raveena and Jithin Wedding//EN",
            "CALSCALE:GREGORIAN",
            "BEGIN:VEVENT",
            `UID:wedding-${WEDDING_TARGET}@raveena-jithin`,
            `DTSTAMP:${formatGoogleCalendarDate(Date.now())}`,
            `DTSTART:${formatGoogleCalendarDate(WEDDING_TARGET)}`,
            `DTEND:${formatGoogleCalendarDate(WEDDING_END)}`,
            `SUMMARY:${escapeIcsText(eventTitle)}`,
            `DESCRIPTION:${escapeIcsText(eventDescription)}`,
            `LOCATION:${escapeIcsText(eventLocation)}`,
            "END:VEVENT",
            "END:VCALENDAR",
        ].join("\r\n");

        const file = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
        const url = window.URL.createObjectURL(file);
        const link = document.createElement("a");

        link.href = url;
        link.download = "raveena-jithin-wedding.ics";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    };

    return (
        <div id="top" className="space-y-16 pb-16 sm:space-y-20">
            <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:gap-12 sm:px-5 sm:pt-10 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="min-w-0 space-y-6 sm:space-y-4">
                    <div className="inline-flex items-center rounded-full border border-cyan/20 bg-white/10 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.42em] text-cyan/80 shadow-[0_0_20px_rgba(77,220,255,0.08)]">
                        {invitation.title}
                    </div>
                    <p className="break-words text-sm uppercase tracking-[0.28em] text-gold sm:text-base sm:tracking-[0.36em]">{brand.subtitle}</p>

                    <div className="lg:hidden">
                        <IllustrationCard
                            title="Bride & Groom"
                            subtitle="Traditional Kerala wedding portrait"
                            imageSrc={brideGroomImage}
                            imageAlt="Bride and groom illustration"
                            imageLoading="eager"
                            onImageLoad={handleHeroReady}
                            onImageError={handleHeroReady}
                        />
                    </div>
                    <p className="max-w-2xl text-base leading-relaxed text-teak/82 sm:text-xl">{invitation.message}</p>
                    <Reveal animation="scaleIn">
                        <div className="glass-panel neon-outline relative overflow-hidden rounded-[2rem] px-6 py-8 sm:px-8 sm:py-10">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,176,79,0.15),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(77,220,255,0.16),_transparent_35%)]" />
                            <div className="absolute inset-0 bg-mesh-grid bg-[length:42px_42px] opacity-20" />
                            {heroReady ? (
                                <Reveal animation="fadeInSlow">
                                    <div className="relative">
                                        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.48em] text-cyan/80">Launch Event</p>
                                        <h1 className="min-w-0 pt-4 text-center font-serif text-4xl font-bold uppercase leading-tight tracking-[0.08em] text-maroon sm:text-5xl lg:text-6xl">
                                            <span className="block break-words">{couple.bride.name}</span>
                                            <span className="my-3 block text-xl font-medium text-gold sm:text-2xl lg:text-3xl">&</span>
                                            <span className="block break-words">{couple.groom.name}</span>
                                        </h1>
                                    </div>
                                </Reveal>
                            ) : (
                                <div className="h-[7.5rem] sm:h-[8.5rem] md:h-[9.5rem]" />
                            )}
                        </div>
                    </Reveal>

                    <p className="max-w-2xl pt-2 text-base text-teak/72 sm:text-lg">{brand.tagline}</p>
                    <Reveal animation="scaleIn">
                        <div className="glass-panel neon-outline relative rounded-[1.75rem] p-5 sm:p-6">
                            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.42em] text-cyan/80">{events.wedding.title}</p>
                            <p className="mt-4 font-serif text-2xl uppercase tracking-[0.12em] text-maroon sm:text-3xl">{events.wedding.dateText}</p>
                            <p className="mt-3 font-serif text-2xl uppercase tracking-[0.12em] text-maroon sm:text-3xl">{events.wedding.timeText}</p>
                            <p className="mt-3 text-lg font-semibold uppercase tracking-[0.18em] text-gold">{events.wedding.muhurthamText}</p>
                            <p className="mt-3 text-base leading-relaxed text-teak/80">{events.wedding.description}</p>
                        </div>
                    </Reveal>
                </div>
                <div className="min-w-0 self-stretch hidden lg:block">
                    <IllustrationCard
                        title="Bride & Groom"
                        subtitle="Traditional Kerala wedding portrait"
                        imageSrc={brideGroomImage}
                        imageAlt="Bride and groom illustration"
                        imageLoading="eager"
                        onImageLoad={handleHeroReady}
                        onImageError={handleHeroReady}
                        className="h-full"
                        fillImage
                    />
                </div>
            </section>
            <section className="mx-auto max-w-6xl px-5">
                <Reveal animation="scaleIn">
                    <div className="glass-panel neon-outline relative overflow-hidden rounded-[2rem] p-5 sm:p-7">
                        <div className="absolute inset-0 bg-mesh-grid bg-[length:32px_32px] opacity-20" />
                        <div className="text-center">
                            <p className="text-xs font-semibold uppercase tracking-[0.42em] text-cyan/80 sm:text-sm">Countdown</p>
                            <p className="mt-3 font-serif text-xl uppercase tracking-[0.1em] text-maroon sm:text-2xl">{events.wedding.dateText}</p>
                        </div>

                        {countdown.isComplete ? (
                            <div className="mt-6 rounded-2xl bg-maroon px-5 py-6 text-center text-parchment">
                                <p className="text-lg font-semibold sm:text-xl">The wedding celebration has begun.</p>
                            </div>
                        ) : (
                            <div className="mt-6 grid grid-cols-2 gap-3 text-center sm:grid-cols-4 sm:gap-4">
                                {[
                                    { label: "Days", value: countdown.days },
                                    { label: "Hours", value: countdown.hours },
                                    { label: "Minutes", value: countdown.minutes },
                                    { label: "Seconds", value: countdown.seconds },
                                ].map((item) => (
                                    <div
                                        key={item.label}
                                        className="glass-panel relative rounded-2xl border border-cyan/15 px-3 py-4 shadow-sm sm:px-4 sm:py-5"
                                    >
                                        <p className="font-serif text-3xl font-bold uppercase tracking-[0.08em] text-maroon sm:text-4xl">
                                            {String(item.value).padStart(2, "0")}
                                        </p>
                                        <p className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-cyan/70 sm:text-xs">
                                            {item.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                            <a
                                href={googleCalendarLink}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-full bg-maroon px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-parchment transition hover:bg-maroon/90"
                            >
                                Add to Google Calendar
                            </a>
                            <button
                                type="button"
                                onClick={handleCalendarDownload}
                                className="rounded-full border border-gold/30 bg-white/80 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-maroon transition hover:bg-parchment"
                            >
                                Download Calendar File
                            </button>
                        </div> */}
                    </div>
                </Reveal>
            </section>

            <section id="details" className="mx-auto max-w-6xl px-5">
                <SectionHeader eyebrow="Wedding Details" title="A Cinematic Kerala Celebration" description={ceremony.intro} />

                <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-5">
                    <div className="lg:col-span-3 lg:self-stretch">
                        <IllustrationCard
                            title="Temple Visual"
                            subtitle="Kerala temple ambience"
                            imageSrc={templeImage}
                            imageAlt="Kerala temple illustration"
                            className="h-full"
                        />
                    </div>

                    <div className="lg:col-span-2 grid gap-6 auto-rows-fr">
                        {detailCards.map((card) => (
                            <DetailCard key={card.key} {...card} className="h-full" />
                        ))}
                    </div>
                </div>
            </section>

            {/* <section className="mx-auto max-w-6xl px-5">
                <SectionHeader
                    eyebrow="Schedule"
                    title="Wedding Day Timeline"
                    description="A gentle flow of ceremonies, rituals, and celebration across the day."
                />
                <DetailCard {...scheduleCard} />
            </section> */}

            <section className="mx-auto grid max-w-6xl items-center gap-8 px-5 sm:gap-12">
                <div className="space-y-6">
                    <SectionHeader eyebrow="Welcome" title="An Invitation with Signal and Soul" description={invitation.welcomeMessage} />
                    <div className="grid gap-4 md:grid-cols-2 md:auto-rows-fr">
                        {welcomeCards.map((card) => (
                            <DetailCard key={card.key} {...card} className="h-full" />
                        ))}
                    </div>
                </div>
            </section>

            <section id="location" className="mx-auto max-w-6xl px-5">
                <SectionHeader
                    eyebrow="Location"
                    title="Venue and Route"
                    description="Temple-inspired venue with traditional lamps, gold accents, and floral arrangements."
                />
                <div className="grid gap-6 md:grid-cols-2 md:auto-rows-fr">
                    {venueCards.map((card) => (
                        <DetailCard key={card.key} {...card} className="h-full" />
                    ))}
                </div>
            </section>
        </div>
    );
}
