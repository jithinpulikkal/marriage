import { Link } from "react-router-dom";
import weddingData from "../data/weddingData.js";

export default function Navbar({ activePath, isDarkMode, onToggleTheme }) {
    const { brand, nav } = weddingData;
    const linkClass =
        "relative text-teak/72 transition duration-300 hover:text-maroon after:absolute after:left-0 after:-bottom-2 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-gradient-to-r after:from-gold after:to-cyan after:transition-transform after:duration-300 hover:after:scale-x-100";

    return (
        <header className="fixed left-0 right-0 top-0 z-50 border-b border-cyan/15 bg-ivory/55 backdrop-blur-2xl">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-5 sm:py-5">
                <Link to="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
                    <span className="rounded-full border border-cyan/20 bg-white/10 px-3 py-1 font-serif text-xl tracking-[0.18em] text-maroon shadow-glow sm:text-2xl lg:text-3xl">
                        {brand.monogram}
                    </span>
                    <div className="leading-none">
                        {brand.title && (
                            <p className="font-body text-xs font-semibold uppercase tracking-[0.42em] text-gold sm:text-sm lg:text-base">
                                {brand.title}
                            </p>
                        )}
                    </div>
                </Link>

                <nav className="hidden items-center gap-5 text-sm uppercase tracking-[0.2em] text-teak lg:flex xl:gap-8 xl:tracking-widest">
                    {nav.items.map((item) => (
                        <Link key={item.label} to={`/${item.hash}`} className={linkClass}>
                            {item.label}
                        </Link>
                    ))}
                    <Link
                        to="/photos"
                        className={`${linkClass} ${activePath === "/photos" ? "text-maroon after:scale-x-100" : ""}`}
                    >
                        {nav.photosLabel}
                    </Link>
                    <button
                        type="button"
                        onClick={onToggleTheme}
                        className="relative inline-flex h-8 w-14 items-center rounded-full border border-cyan/30 bg-surface/70 px-1 text-cyan shadow-[0_0_20px_rgba(77,220,255,0.12)] transition hover:bg-cyan/10"
                        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                        aria-pressed={isDarkMode}
                    >
                        <span className="flex w-full items-center justify-between px-1 text-cyan/70">
                            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M12 3.75a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V4.5a.75.75 0 0 1 .75-.75Zm0 14.25a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 12 18Zm8.25-6a.75.75 0 0 1-.75.75H18a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 .75.75Zm-14.25 0a.75.75 0 0 1-.75.75H3.75a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 6 12Zm11.303 5.303a.75.75 0 0 1 0 1.06l-1.06 1.061a.75.75 0 0 1-1.061-1.06l1.06-1.061a.75.75 0 0 1 1.061 0Zm-9.545-9.546a.75.75 0 0 1 0 1.061L6.692 9.884a.75.75 0 1 1-1.06-1.06l1.06-1.061a.75.75 0 0 1 1.061 0Zm9.546 1.061a.75.75 0 1 1-1.06 1.06l-1.061-1.06a.75.75 0 0 1 1.06-1.061l1.061 1.06Zm-9.546 9.546a.75.75 0 0 1-1.06 1.06l-1.061-1.06a.75.75 0 1 1 1.06-1.061l1.061 1.06ZM12 8.25A3.75 3.75 0 1 1 12 15.75 3.75 3.75 0 0 1 12 8.25Z" />
                            </svg>
                            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M21.752 15.002A9.718 9.718 0 0 1 18 15.75 9.75 9.75 0 0 1 8.25 6c0-1.314.26-2.568.732-3.713a.75.75 0 0 0-.94-.99A10.5 10.5 0 1 0 22.742 16a.75.75 0 0 0-.99-.998Z" />
                            </svg>
                        </span>
                        <span
                            className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border border-cyan/50 bg-gradient-to-br from-gold to-cyan shadow-[0_0_22px_rgba(77,220,255,0.4)] transition-transform duration-300 ${
                                isDarkMode ? "translate-x-7" : "translate-x-0"
                            }`}
                        />
                    </button>
                </nav>

                <div className="flex items-center gap-2 lg:hidden">
                    <button
                        type="button"
                        onClick={onToggleTheme}
                        className="relative inline-flex h-7 w-12 items-center rounded-full border border-cyan/30 bg-surface/70 px-1 text-cyan shadow-[0_0_16px_rgba(77,220,255,0.12)] transition-all duration-300 hover:bg-cyan/10"
                        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                        aria-pressed={isDarkMode}
                    >
                        <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M12 3.75a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V4.5a.75.75 0 0 1 .75-.75Zm0 14.25a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 12 18Zm8.25-6a.75.75 0 0 1-.75.75H18a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 .75.75Zm-14.25 0a.75.75 0 0 1-.75.75H3.75a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 6 12Zm11.303 5.303a.75.75 0 0 1 0 1.06l-1.06 1.061a.75.75 0 0 1-1.061-1.06l1.06-1.061a.75.75 0 0 1 1.061 0Zm-9.545-9.546a.75.75 0 0 1 0 1.061L6.692 9.884a.75.75 0 1 1-1.06-1.06l1.06-1.061a.75.75 0 0 1 1.061 0Zm9.546 1.061a.75.75 0 1 1-1.06 1.06l-1.061-1.06a.75.75 0 0 1 1.06-1.061l1.061 1.06Zm-9.546 9.546a.75.75 0 0 1-1.06 1.06l-1.061-1.06a.75.75 0 1 1 1.06-1.061l1.061 1.06ZM12 8.25A3.75 3.75 0 1 1 12 15.75 3.75 3.75 0 0 1 12 8.25Z" />
                        </svg>
                        <svg className="ml-auto h-2.5 w-2.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M21.752 15.002A9.718 9.718 0 0 1 18 15.75 9.75 9.75 0 0 1 8.25 6c0-1.314.26-2.568.732-3.713a.75.75 0 0 0-.94-.99A10.5 10.5 0 1 0 22.742 16a.75.75 0 0 0-.99-.998Z" />
                        </svg>
                        <span
                            className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border border-cyan/50 bg-gradient-to-br from-gold to-cyan shadow-[0_0_18px_rgba(77,220,255,0.35)] transition-transform duration-300 ${
                                isDarkMode ? "translate-x-5" : "translate-x-0"
                            }`}
                        />
                    </button>
                    <Link
                        to="/photos"
                        className="inline-flex items-center rounded-full border border-cyan/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-maroon shadow-md transition-all duration-300 hover:scale-105 hover:bg-cyan/10 hover:shadow-lg sm:px-5 sm:text-sm sm:tracking-[0.3em]"
                    >
                        {nav.photosLabel}
                    </Link>
                </div>
            </div>
        </header>
    );
}
