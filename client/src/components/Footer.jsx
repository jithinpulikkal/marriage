import weddingData from "../data/weddingData.js";

export default function Footer() {
    const { footer } = weddingData;

    return (
        <footer className="border-t border-cyan/15 bg-ivory/50 backdrop-blur-2xl">
            <div className="mx-auto max-w-6xl px-5 py-8 text-center">
                <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.45em] text-cyan/70">Built for the celebration</p>
                <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-maroon sm:text-xl">
                    {footer.message}
                </p>
                <p className="mt-6 font-serif text-xl font-medium uppercase tracking-[0.18em] text-gold sm:text-2xl">
                    {footer.signature}
                </p>
                <div className="mt-3 text-sm text-teak/70">
                    <p>{footer.copyright}</p>
                </div>
            </div>
        </footer>
    );
}
