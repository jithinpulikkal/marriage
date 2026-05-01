export default function FloralDivider() {
    return (
        <div className="my-12 flex items-center justify-center gap-4 text-gold">
            <span className="h-px w-20 bg-gold/40" />
            <svg width="80" height="80" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                <path d="M32 8c6 10-4 14-4 20 0 6 4 10 4 10s4-4 4-10c0-6-10-10-4-20Z" fill="#b7872c" />
                <path d="M12 28c10 6 14-4 20-4 6 0 10 4 10 4s-4 4-10 4c-6 0-10-10-20-4Z" fill="#e6b7b7" />
                <path d="M52 28c-10 6-14-4-20-4-6 0-10 4-10 4s4 4 10 4c6 0 10-10 20-4Z" fill="#e6b7b7" />
                <circle cx="32" cy="32" r="7" fill="#f0df9d" />
            </svg>
            <span className="h-px w-20 bg-gold/40" />
        </div>
    );
}
