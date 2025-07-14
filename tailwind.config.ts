import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "dank-kicks-loading": "url(/assets/images/game/dank-kicks-loading.svg)",
        "play-button": "url(/assets/images/game/play-button.svg)",
        "dank-kicks-stadium":
          "url(/assets/images/stadium/dank-kicks-stadium.svg)",
        "sponsor-board": "url(/assets/images/stadium/sponsor-board.svg)",
        "goal-post": "url(/assets/images/field/goal-post.svg)",
        "stand-goally-pepe": "url(/assets/images/player/stand-goally-pepe.svg)",
        "left-goally-pepe": "url(/assets/images/player/left-goally-pepe.svg)",
        "right-goally-pepe": "url(/assets/images/player/right-goally-pepe.svg)",
        "attend-row-first": "url(/assets/images/stadium/hooligan-1.svg)",
        "attend-row-second": "url(/assets/images/stadium/hooligan-2.svg)",
        "attend-row-third": "url(/assets/images/stadium/hooligan-3.svg)",
        "score-board": "url(/assets/images/tv/score-board.svg)",
        "broadcast-name": "url(/assets/images/tv/broadcast-name.svg)",
        ball: "url(/assets/images/field/ball.svg)",
        "block-impact": "url(/assets/images/field/block-impact.svg)",
        "game-loading": "url(/assets/images/game/loading-bg.png)",
        "logo-dank-kicks": "url(/assets/logo/logo-dank-kicks.png)",
        "banner-progammer": "url(/assets/images/banner/progammer-banner.svg)",
      },
      keyframes: {
        fadeOut: {
          "0%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-1deg)" },
          "50%": { transform: "rotate(1deg)" },
        },
        bounce: {
          "0%, 100%": {
            transform: "translateY(-10%)",
            "animation-timing-function": "cubic-bezier(0.8,0,1,1)",
          },
          "50%": {
            transform: "none",
            "animation-timing-function": "cubic-bezier(0,0,0.2,1)",
          },
        },
        "loop-x": {
          from: {
            transform: "translateX(0%)",
          },
          to: {
            transform: "translateX(-50%)",
          },
        },
        "moving-x": {
          "0%, 100%": { transform: "translateX(-10%)" },
          "50%": { transform: "translateX(10%)" },
        },
        "move-right-end": {
          from: {
            transform: "translate(0%, 0%) rotate(0deg) scale(1)",
          },
          to: {
            transform: "translate(125px, -425px) rotate(-7200deg) scale(0.28)",
          },
        },
        // "move-right-end": {
        //   "100%": {
        //     transform: "rotate(-360deg) translate(125px, -425px) scale(0.28)",
        //   },
        // },
        "move-left-end": {
          from: {
            transform: "translate(0%, 0%) rotate(0deg) scale(1)",
          },
          to: {
            transform: "translate(-125px, -425px) rotate(7200deg) scale(0.28)",
          },
        },
        "move-right": {
          from: {
            transform: "translate(0%, 0%) rotate(0deg) scale(1)",
          },
          to: {
            transform: "translate(108px, -395px) rotate(-7200deg) scale(0.4)",
          },
        },
        "move-left": {
          from: {
            transform: "translate(0%, 0%) rotate(0deg) scale(1)",
          },
          to: {
            transform: "translate(-108px, -395px) rotate(7200deg) scale(0.4)",
          },
        },
        "rotate-right": {
          // "0%, 100%": { transform: "rotate(-360deg)" },
          // "50%": { transform: "rotate(-180deg)" },
          from: {
            transform: "rotate(0deg)",
          },
          to: {
            transform: "rotate(720deg)",
          },
        },
        "trasnform-right": {
          from: {
            transform: "translate(-10%, 0%)",
          },
          to: {
            transform: "translate(0%, 0%)",
          },
        },
        "slide-right": {
          from: {
            transform: "translate(-5%, 0%)",
          },
          to: {
            transform: "translate(0%, 0%)",
          },
        },
        "slide-left": {
          from: {
            transform: "translate(5%, 0%)",
          },
          to: {
            transform: "translate(0%, 0%)",
          },
        },
        "curve-x": {
          "100%": {
            transform: "translateX(125px) scale(0.28)",
            "animation-timing-function": "cubic-bezier(0,1.29,0,1.3)",
          },
        },
        "curve-y": {
          "100%": {
            transform: "translateY(-425px) scale(0.28)",
            "animation-timing-function": "cubic-bezier(0.02, 0.01, 0.21, 1)",
          },
        },
        "ping-alert": {
          "50%": {
            transform: "scale(1.2)",
            opacity: "1",
          },
        },
        waviy: {
          "0%,40%,100%": {
            transform: "translateY(0)",
          },
          "20%": {
            transform: "translateY(-20px)",
          },
        },
        flip: {
          "0%,80%": {
            transform: "rotateY(360deg)",
          },
        },
        shadows: {
          "0%": {
            "text-shadow": "none",
          },
          "10%": {
            "text-shadow": "3px 3px 0 #16A34A",
          },
          "20%": {
            "text-shadow": "3px 3px 0 #16A34A, 6px 6px 0 #15803D",
          },
          "30%": {
            "text-shadow":
              "3px 3px 0 #16A34A, 6px 6px 0 #15803D, 9px 9px #166534",
          },
          "40%": {
            "text-shadow":
              "3px 3px 0 #16A34A, 6px 6px 0 #15803D, 9px 9px #166534, 12px 12px 0 #14532D",
          },
          "50%": {
            "text-shadow":
              "3px 3px 0 #16A34A, 6px 6px 0 #15803D, 9px 9px #166534, 12px 12px 0 #14532D",
          },
          "60%": {
            "text-shadow":
              "3px 3px 0 #16A34A, 6px 6px 0 #15803D, 9px 9px #166534, 12px 12px 0 #14532D",
          },
          "70%": {
            "text-shadow":
              "3px 3px 0 #16A34A, 6px 6px 0 #15803D, 9px 9px #166534",
          },
          "80%": {
            "text-shadow": "3px 3px 0 #16A34A, 6px 6px 0 #15803D",
          },
          "90%": {
            "text-shadow": "3px 3px 0 #16A34A",
          },
          "100%": {
            "text-shadow": "none",
          },
        },
        "shadows-red": {
          "0%": {
            "text-shadow": "none",
          },
          "10%": {
            "text-shadow": "3px 3px 0 #DC2626",
          },
          "20%": {
            "text-shadow": "3px 3px 0 #DC2626, 6px 6px 0 #B91C1C",
          },
          "30%": {
            "text-shadow":
              "3px 3px 0 #DC2626, 6px 6px 0 #B91C1C, 9px 9px #991B1B",
          },
          "40%": {
            "text-shadow":
              "3px 3px 0 #DC2626, 6px 6px 0 #B91C1C, 9px 9px #991B1B, 12px 12px 0 #7F1D1D",
          },
          "50%": {
            "text-shadow":
              "3px 3px 0 #DC2626, 6px 6px 0 #B91C1C, 9px 9px #991B1B, 12px 12px 0 #7F1D1D",
          },
          "60%": {
            "text-shadow":
              "3px 3px 0 #DC2626, 6px 6px 0 #B91C1C, 9px 9px #991B1B, 12px 12px 0 #7F1D1D",
          },
          "70%": {
            "text-shadow":
              "3px 3px 0 #DC2626, 6px 6px 0 #B91C1C, 9px 9px #991B1B",
          },
          "80%": {
            "text-shadow": "3px 3px 0 #DC2626, 6px 6px 0 #B91C1C",
          },
          "90%": {
            "text-shadow": "3px 3px 0 #DC2626",
          },
          "100%": {
            "text-shadow": "none",
          },
        },

        popping: {
          "0%": {
            transform: "translate(0px, 0px)",
          },
          "40%": {
            transform: "translate(-12px, -12px)",
          },
          "50%": {
            transform: "translate(-12px, -12px)",
          },
          "60%": {
            transform: "translate(-12px, -12px)",
          },
          "100%": {
            transform: "translate(0px, 0px)",
          },
        },
        "pulse-box": {
          "0%": {
            "box-shadow": '0 0 0 0 theme("colors.primary.DEFAULT"/0%)',
          },
          "50%": {
            "box-shadow": '0 0 0 4px theme("colors.primary.DEFAULT"/100%)',
          },
          "100%": {
            "box-shadow": '0 0 0 0 theme("colors.primary.DEFAULT"/0%)',
          },
        },
        "pulse-back": {
          "0%": {
            "box-shadow": '0 0 0 0 theme("colors.primary.DEFAULT"/0%)',
          },
          "25%": {
            "box-shadow": '0 0 0 4px theme("colors.primary.DEFAULT"/100%)',
          },
          "50%": {
            "box-shadow": '0 0 0 0 theme("colors.primary.DEFAULT"/0%)',
          },
          "75%": {
            "box-shadow": '0 0 0 0 theme("colors.primary.DEFAULT"/0%)',
          },
          "100%": {
            "box-shadow": '0 0 0 0 theme("colors.primary.DEFAULT"/0%)',
          },
        },
        "pulse-back-delay": {
          "0%": {
            "box-shadow": '0 0 0 0 theme("colors.primary.DEFAULT"/0%)',
          },
          "25%": {
            "box-shadow": '0 0 0 0 theme("colors.primary.DEFAULT"/0%)',
          },
          "50%": {
            "box-shadow": '0 0 0 0 theme("colors.primary.DEFAULT"/0%)',
          },
          "75%": {
            "box-shadow": '0 0 0 4px theme("colors.primary.DEFAULT"/100%)',
          },
          "100%": {
            "box-shadow": '0 0 0 0 theme("colors.primary.DEFAULT"/0%)',
          },
        },
        invisible: {
          "0%": {
            opacity: "0",
          },
          "50%": {
            opacity: "0",
          },
          "50.01%": {
            opacity: "1",
          },
          "100%": {
            opacity: "1",
          },
        },
      },
      animation: {
        "fade-out": "1s fadeOut 3s ease-out forwards",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "attend-jump-first": "bounce 0.8s infinite",
        "warigari-x": "moving-x 1.5s ease-in-out infinite",
        "infinite-loop-x": "loop-x 50s linear infinite",
        "kick-right-success": "move-right-end 1.5s ease-out forwards",
        "kick-right-failed": "move-right 1.5s ease-out forwards",
        "kick-left-success": "move-left-end 1.5s ease-out forwards",
        "kick-left-failed": "move-left 1.5s ease-out forwards",
        "dive-left": "slide-left 1.5s ease-out forwards",
        "dive-right": "slide-right 1.5s ease-out forwards",
        "banner-right": "trasnform-right 1.5s ease-out forwards",
        alert: "ping-alert 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
        "waviy-vertical": "waviy 1s infinite",
        "text-win":
          "shadows 1.2s ease-in infinite, popping 1.2s ease-in infinite",
        "text-lose":
          "shadows-red 1.2s ease-in infinite, popping 1.2s ease-in infinite",
        "rotate-clock": "rotate-right 2s linear infinite",
        "highlight-back": "pulse-box 2s linear infinite",
        "start-alert": "pulse-box 1s linear infinite",
        "highlight-back-delay": "pulse-back 4s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
