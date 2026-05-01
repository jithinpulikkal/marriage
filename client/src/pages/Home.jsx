import { useEffect, useState } from "react";
import SectionHeader from "../components/SectionHeader.jsx";
import DetailCard, { buildDetailCards, buildWelcomeCards, buildVenueCards } from "../components/DetailCard.jsx";
import weddingData from "../data/weddingData.js";
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
    return new Date(timestamp)
        .toISOString()
        .replace(/[-:]/g, "")
        .replace(/\.\d{3}Z$/, "Z");
}

function escapeIcsText(value) {
    return value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

export default function Home() {
    const { brand, couple, events, invitation, ceremony, venues } = weddingData;
    const detailCards = buildDetailCards(weddingData);
    const welcomeCards = buildWelcomeCards(weddingData);
    const venueCards = buildVenueCards(weddingData);

    const [countdown, setCountdown] = useState(() => getCountdownParts(WEDDING_TARGET));

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
            <section className="mx-auto max-w-6xl px-4 sm:px-5 sm:pt-10">
                <div className="mx-auto max-w-4xl min-w-0 space-y-6 text-center sm:space-y-4">
                    <div className="data-chip stark-chip inline-flex items-center rounded-full px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.42em] text-cyan/90">
                        {invitation.title}
                    </div>
                    <p className="break-words text-sm uppercase tracking-[0.28em] text-gold sm:text-base sm:tracking-[0.36em]">
                        {brand.subtitle}
                    </p>
                    <p className="mx-auto max-w-2xl text-base leading-relaxed text-teak/82 sm:text-xl">
                        {invitation.message}
                    </p>
                    <Reveal animation="scaleIn">
                        <div className="glass-panel neon-outline cyber-frame holo-sweep stark-panel relative overflow-hidden rounded-[2rem] px-6 py-8 sm:px-8 sm:py-10">
                            <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(255,176,79,0.12),_transparent_30%),linear-gradient(315deg,_rgba(77,220,255,0.18),_transparent_38%)]" />
                            <div className="absolute inset-0 bg-mesh-grid bg-[length:42px_42px] opacity-20" />
                            <div className="absolute left-6 right-6 top-5 h-px bg-gradient-to-r from-transparent via-cyan/70 to-transparent" />
                            <div className="absolute bottom-5 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
                            <div className="mini-reactor absolute right-5 top-5 hidden sm:block">
                                <span />
                                <span />
                                <span />
                            </div>
                            <Reveal animation="fadeInSlow">
                                <div className="relative">
                                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.48em] text-cyan/80">
                                        Holographic Ceremony Interface
                                    </p>
                                    <h1 className="holo-title min-w-0 pt-4 text-center font-serif text-4xl font-bold uppercase leading-tight tracking-[0.08em] text-maroon sm:text-5xl lg:text-6xl">
                                        <span className="glitch-text block break-words" data-text={couple.bride.name}>
                                            {couple.bride.name}
                                        </span>
                                        <span className="my-3 block text-xl font-medium text-gold sm:text-2xl lg:text-3xl">
                                            &
                                        </span>
                                        <span className="glitch-text block break-words" data-text={couple.groom.name}>
                                            {couple.groom.name}
                                        </span>
                                    </h1>
                                    <div className="mx-auto mt-6 grid max-w-xl grid-cols-3 gap-2 text-center">
                                        {["12 Sep", "10:45 AM", "Kerala"].map((item) => (
                                            <span
                                                key={item}
                                                className="data-chip rounded-full px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-cyan/85"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                    {/* <div className="mt-6 grid gap-2 text-left sm:grid-cols-3">
                                            {[
                                                ["BLESSING", "ONLINE"],
                                                ["RITUAL", "KERALA MODE"],
                                                ["FAMILY", "SYNCED"],
                                            ].map(([label, value]) => (
                                                <div key={label} className="data-chip stark-chip rounded-xl px-4 py-3">
                                                    <p className="text-[0.58rem] font-semibold uppercase tracking-[0.32em] text-cyan/60">{label}</p>
                                                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-gold">{value}</p>
                                                </div>
                                            ))}
                                        </div> */}
                                    <div className="stark-console mt-5 grid gap-2 text-left sm:grid-cols-[1fr_auto]">
                                        <div>
                                            <p className="text-[0.58rem] font-semibold uppercase tracking-[0.34em] text-cyan/60">
                                                Primary Directive
                                            </p>
                                            <p className="mt-1 text-sm font-semibold text-teak/80">
                                                Celebrate love, family, and the muhurtham.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </Reveal>

                    <p className="mx-auto max-w-2xl pt-2 text-base text-teak/72 sm:text-lg">{brand.tagline}</p>
                    <Reveal animation="scaleIn">
                        <div className="glass-panel neon-outline cyber-frame stark-panel relative overflow-hidden rounded-[1.75rem] p-5 sm:p-6">
                            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold/80 via-cyan/80 to-rose/80" />
                            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.42em] text-cyan/80">
                                {events.wedding.title}
                            </p>
                            <p className="mt-4 font-serif text-2xl uppercase tracking-[0.12em] text-maroon sm:text-3xl">
                                {events.wedding.dateText}
                            </p>
                            <p className="mt-3 font-serif text-2xl uppercase tracking-[0.12em] text-maroon sm:text-3xl">
                                {events.wedding.timeText}
                            </p>
                            <p className="mt-3 text-lg font-semibold uppercase tracking-[0.18em] text-gold">
                                {events.wedding.muhurthamText}
                            </p>
                            <p className="mt-3 text-base leading-relaxed text-teak/80">{events.wedding.description}</p>
                            <div className="mt-6 flex flex-col gap-3 sm:flex-row justify-between">
                                <a
                                    href={googleCalendarLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="data-chip rounded-full px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.16em] text-maroon transition hover:scale-[1.02]"
                                >
                                    Sync Calendar
                                </a>
                                <button
                                    type="button"
                                    onClick={handleCalendarDownload}
                                    className="data-chip rounded-full px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-maroon transition hover:scale-[1.02]"
                                >
                                    Download Event
                                </button>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
            <section className="mx-auto max-w-6xl px-5">
                <Reveal animation="scaleIn">
                    <div className="glass-panel neon-outline cyber-frame stark-panel relative overflow-hidden rounded-[2rem] p-5 sm:p-7">
                        <div className="absolute inset-0 bg-mesh-grid bg-[length:32px_32px] opacity-20" />
                        <div className="text-center">
                            <p className="text-xs font-semibold uppercase tracking-[0.42em] text-cyan/80 sm:text-sm">
                                Countdown
                            </p>
                            <p className="mt-3 font-serif text-xl uppercase tracking-[0.1em] text-maroon sm:text-2xl">
                                {events.wedding.dateText}
                            </p>
                        </div>
                        <div className="relative mx-auto mt-5 h-2 max-w-3xl overflow-hidden rounded-full border border-cyan/20 bg-surface/40">
                            <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-cyan/10 via-cyan/70 to-gold/70 shadow-[0_0_24px_rgba(77,220,255,0.35)]" />
                            <div className="absolute inset-y-0 left-0 w-full bg-[repeating-linear-gradient(90deg,transparent_0_18px,rgba(255,255,255,0.28)_18px_19px)]" />
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
                                        className="data-chip relative rounded-2xl px-3 py-4 shadow-sm sm:px-4 sm:py-5"
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
                    </div>
                </Reveal>
            </section>

            <section id="details" className="mx-auto max-w-6xl px-5">
                <SectionHeader
                    eyebrow="Wedding Details"
                    title="A Cinematic Kerala Celebration"
                    description={ceremony.intro}
                />

                <div className="mt-10 grid gap-6 md:grid-cols-2 md:auto-rows-fr">
                    {detailCards.map((card) => (
                        <DetailCard key={card.key} {...card} className="h-full" />
                    ))}
                </div>
            </section>

            <section className="mx-auto grid max-w-6xl items-center gap-8 px-5 sm:gap-12">
                <div className="space-y-6">
                    <SectionHeader
                        eyebrow="Welcome"
                        title="An Invitation with Signal and Soul"
                        description={invitation.welcomeMessage}
                    />
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
                    description="Elegant auditorium venue with spacious seating, ample parking, and a well-designed stage for the celebration."
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
