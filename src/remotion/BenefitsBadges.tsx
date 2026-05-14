import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS, FONT } from "./index";
import { easeOutBack } from "./easings";

const FPS = 30;
const TOTAL_DURATION = FPS * 20;
const SLIDE_DURATION = FPS * 0.8;
const STAGGER_DELAY = FPS * 1;

const BADGES = [
  { text: "100% Digital", delay: 0 },
  { text: "Cero Papel", delay: STAGGER_DELAY },
  { text: "Atención Boutique", delay: STAGGER_DELAY * 2 },
];

export const durationInFrames = FPS * 20;
export const fps = FPS;
export const width = 1920;
export const height = 1080;

export const BenefitsBadges: React.FC = () => {
  const frame = useCurrentFrame();

  if (frame >= TOTAL_DURATION) return null;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "65%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {BADGES.map((badge, index) => {
          const badgeFrame = frame - badge.delay;
          let translateX = 400;
          let scale = 1;
          let opacity = 0;

          if (badgeFrame >= 0 && badgeFrame < SLIDE_DURATION) {
            const progress = badgeFrame / SLIDE_DURATION;
            const eased = easeOutBack(progress);
            translateX = 400 * (1 - eased);
            scale = 1 + 0.05 * Math.sin(progress * Math.PI);
            opacity = Math.min(1, progress * 2);
          } else if (badgeFrame >= SLIDE_DURATION) {
            translateX = 0;
            scale = 1;
            opacity = 1;
          }

          return (
            <div
              key={index}
              style={{
                transform: `translateX(${translateX}px) scale(${scale})`,
                opacity,
                display: "flex",
                alignItems: "center",
                gap: 12,
                backgroundColor: COLORS.successGreen,
                borderRadius: 24,
                padding: "14px 28px",
                boxShadow: "0 4px 16px rgba(0, 210, 106, 0.3)",
              }}
            >
              <svg width="32" height="32" viewBox="0 0 64 64">
                <defs>
                  <linearGradient
                    id={`bgGrad${index}`}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#00E676" />
                    <stop offset="100%" stopColor="#00C853" />
                  </linearGradient>
                </defs>
                <circle cx="32" cy="32" r="30" fill={`url(#bgGrad${index})`} />
                <path
                  d="M18 32 L28 42 L46 22"
                  stroke="#FFFFFF"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
              <span
                style={{
                  fontFamily: FONT,
                  fontWeight: 700,
                  fontSize: 18,
                  color: COLORS.white,
                  letterSpacing: 1,
                }}
              >
                {badge.text}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
