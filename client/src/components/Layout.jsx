import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import FuturisticParticles from "./FuturisticParticles.jsx";

export default function Layout() {
    const location = useLocation();
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window === "undefined") return true;

        const storedTheme = window.localStorage.getItem("theme");

        if (storedTheme === "dark") return true;
        if (storedTheme === "light") return false;

        return true;
    });

    useEffect(() => {
        // If there's a hash (e.g., #details, #location), scroll smoothly to it
        if (location.hash) {
            const target = document.querySelector(location.hash);
            if (target) {
                // Small delay to ensure the page has rendered
                setTimeout(() => {
                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }, 100);
            }
            return;
        }

        // Otherwise scroll to top when navigating to a new page
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [location.pathname, location.hash]);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDarkMode);
        window.localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    }, [isDarkMode]);

    return (
        <div className="theme-shell flex min-h-screen flex-col bg-temple-pattern text-teak">
            <div className="future-hud" aria-hidden="true">
                <div className="hud-rail hud-rail-left" />
                <div className="hud-rail hud-rail-right" />
                <div className="hud-corner hud-corner-top-left" />
                <div className="hud-corner hud-corner-top-right" />
                <div className="hud-corner hud-corner-bottom-left" />
                <div className="hud-corner hud-corner-bottom-right" />
                <div className="orbit-field orbit-field-left">
                    <span />
                    <span />
                </div>
                <div className="orbit-field orbit-field-right">
                    <span />
                    <span />
                </div>
                <div className="reactor-core">
                    <span className="reactor-ring reactor-ring-one" />
                    <span className="reactor-ring reactor-ring-two" />
                    <span className="reactor-ring reactor-ring-three" />
                    <span className="reactor-dot" />
                </div>
                <div className="hud-readout hud-readout-left">
                    <span>INVITE.OS</span>
                    <strong>ONLINE</strong>
                </div>
                <div className="hud-readout hud-readout-right">
                    <span>CEREMONY CORE</span>
                    <strong>STABLE</strong>
                </div>
                <div className="mobile-command-stack">
                    <span>HOLO UI</span>
                    <span>BLESSING LINK</span>
                    <span>EVENT SYNC</span>
                </div>
            </div>
            <FuturisticParticles />

            <Navbar
                activePath={location.pathname}
                isDarkMode={isDarkMode}
                onToggleTheme={() => setIsDarkMode((current) => !current)}
            />

            <main className="relative z-20 flex-1 overflow-x-clip pt-20 sm:pt-24">
                <Outlet />
            </main>

            <div className="relative z-20">
                <Footer />
            </div>
        </div>
    );
}
