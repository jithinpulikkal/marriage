/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        parchment: "rgb(var(--parchment-rgb) / <alpha-value>)",
        ivory: "rgb(var(--ivory-rgb) / <alpha-value>)",
        surface: "rgb(var(--surface-rgb) / <alpha-value>)",
        gold: "rgb(var(--gold-rgb) / <alpha-value>)",
        maroon: "rgb(var(--maroon-rgb) / <alpha-value>)",
        rose: "rgb(var(--rose-rgb) / <alpha-value>)",
        sage: "rgb(var(--sage-rgb) / <alpha-value>)",
        teak: "rgb(var(--teak-rgb) / <alpha-value>)",
        cyan: "rgb(var(--cyan-rgb) / <alpha-value>)"
      },
      fontFamily: {
        serif: ["Orbitron", "sans-serif"],
        body: ["Space Grotesk", "sans-serif"]
      },
      backgroundImage: {
        "temple-pattern": "radial-gradient(circle at 15% 20%, rgb(var(--gold-rgb) / 0.18), transparent 0 28%), radial-gradient(circle at 82% 10%, rgb(var(--cyan-rgb) / 0.18), transparent 0 24%), linear-gradient(135deg, rgb(var(--parchment-rgb)) 0%, rgb(var(--ivory-rgb)) 42%, rgb(var(--surface-rgb)) 100%)",
        "paper": "linear-gradient(180deg, rgb(var(--surface-rgb) / 0.9) 0%, rgb(var(--ivory-rgb) / 0.92) 100%)",
        "mesh-grid": "linear-gradient(rgb(var(--gold-rgb) / 0.08) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--cyan-rgb) / 0.08) 1px, transparent 1px)"
      },
      boxShadow: {
        royal: "0 24px 70px rgb(var(--shadow-rgb) / 0.28)",
        glow: "0 0 32px rgb(var(--cyan-rgb) / 0.32)"
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "60%": { opacity: "1" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" }
        },
        floatSoft: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0)" }
        },
        slowZoom: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.035)" }
        },
        glowPulse: {
          "0%": { boxShadow: "0 0 0 rgba(183, 135, 44, 0.0)" },
          "50%": { boxShadow: "0 0 28px rgba(183, 135, 44, 0.35)" },
          "100%": { boxShadow: "0 0 0 rgba(183, 135, 44, 0.0)" }
        }
      },
      animation: {
        fadeUp: "fadeUp 700ms ease-out both",
        fadeIn: "fadeIn 700ms ease-out both",
        fadeInSlow: "fadeIn 2400ms ease-out both",
        scaleIn: "scaleIn 700ms ease-out both",
        floatSoft: "floatSoft 6s ease-in-out infinite",
        slowZoom: "slowZoom 12s ease-in-out infinite alternate",
        glowPulse: "glowPulse 6s ease-in-out infinite"
      }
    }
  },
  plugins: []
};
