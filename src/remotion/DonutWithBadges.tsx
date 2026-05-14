import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS, FONT } from "./index";
import { easeInOut, easeOut, easeOutBack } from "./easings";

const FPS = 30;
const TOTAL_DURATION = FPS * 20;
const DONUT_ANIMATION_END = FPS * 1.5;
const DOCUMENTS_DELAY = FPS * 0.5;
const DOCUMENTS_ANIMATION_END = DOCUMENTS_DELAY + FPS * 0.6;
const SLIDE_DURATION = FPS * 0.8;
const STAGGER_DELAY = FPS * 1;

const BADGES = [
  { text: "100% Digital", delay: DONUT_ANIMATION_END + FPS * 0.5 },
  {
    text: "Cero Papel",
    delay: DONUT_ANIMATION_END + FPS * 0.5 + STAGGER_DELAY,
  },
  {
    text: "Atención Boutique",
    delay: DONUT_ANIMATION_END + FPS * 0.5 + STAGGER_DELAY * 2,
  },
];

export const durationInFrames = FPS * 20;
export const fps = FPS;
export const width = 960;
export const height = 1080;

export const DonutWithBadges: React.FC = () => {
  const frame = useCurrentFrame();

  if (frame >= TOTAL_DURATION) return null;

  const donutProgress = Math.min(1, frame / DONUT_ANIMATION_END);
  const donutValue = easeInOut(donutProgress);

  const documentsProgress =
    frame < DOCUMENTS_DELAY
      ? 0
      : Math.min(
          1,
          (frame - DOCUMENTS_DELAY) /
            (DOCUMENTS_ANIMATION_END - DOCUMENTS_DELAY),
        );
  const bounceValue = easeOut(documentsProgress);
  const scale =
    bounceValue < 0.5
      ? bounceValue * 2 * 1.1
      : 1.05 - (bounceValue - 0.5) * 2 * 0.05;

  const pulsePhase = (frame / FPS) * 2 * Math.PI;
  const glowOpacity = 0.3 + 0.2 * Math.sin(pulsePhase);

  const dashArray = `${175.93 * donutValue} ${439.82}`;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.primaryDark,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "8%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <svg width="280" height="280" viewBox="0 0 200 200">
          <defs>
            <linearGradient id="alertGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={COLORS.alertRed} />
              <stop offset="100%" stopColor="#C53030" />
            </linearGradient>
            <linearGradient id="grayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={COLORS.lightGray} />
              <stop offset="100%" stopColor="#CBD5E0" />
            </linearGradient>
          </defs>

          <g transform="translate(100,100)">
            <circle
              cx="0"
              cy="0"
              r="70"
              fill="none"
              stroke="url(#grayGrad)"
              strokeWidth="24"
              strokeDasharray="263.89 439.82"
              strokeDashoffset="109.96"
              transform="rotate(-90)"
              strokeLinecap="round"
            />

            <circle
              cx="0"
              cy="0"
              r="70"
              fill="none"
              stroke="url(#alertGrad)"
              strokeWidth="24"
              strokeDasharray={dashArray}
              strokeDashoffset={-263.89 + (1 - donutValue) * -263.89}
              transform="rotate(-90)"
              strokeLinecap="round"
            />

            <text
              x="0"
              y="8"
              fontFamily={FONT}
              fontWeight="700"
              fontSize="36"
              fill={COLORS.charcoal}
              textAnchor="middle"
            >
              {Math.round(40 * donutValue)}%
            </text>
          </g>
        </svg>

        <svg
          width="180"
          height="180"
          viewBox="0 0 120 120"
          style={{
            transform: `scale(${scale})`,
            opacity: documentsProgress,
          }}
        >
          <g>
            <rect
              x="22.5"
              y="12"
              width="67.5"
              height="82.5"
              rx="4.5"
              fill="#F7FAFC"
              stroke="#CBD5E0"
              strokeWidth="1.5"
            />
            <line
              x1="37.5"
              y1="30"
              x2="75"
              y2="30"
              stroke="#E2E8F0"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line
              x1="37.5"
              y1="42"
              x2="67.5"
              y2="42"
              stroke="#E2E8F0"
              strokeWidth="3"
              strokeLinecap="round"
            />

            <rect
              x="30"
              y="21"
              width="67.5"
              height="82.5"
              rx="4.5"
              fill="#FFFFFF"
              stroke="#CBD5E0"
              strokeWidth="1.5"
            />
            <line
              x1="45"
              y1="39"
              x2="82.5"
              y2="39"
              stroke="#E2E8F0"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line
              x1="45"
              y1="51"
              x2="75"
              y2="51"
              stroke="#E2E8F0"
              strokeWidth="3"
              strokeLinecap="round"
            />

            <rect
              x="37.5"
              y="30"
              width="67.5"
              height="82.5"
              rx="4.5"
              fill="#FFFFFF"
              stroke={COLORS.alertRed}
              strokeWidth="3"
            />

            <g
              style={{
                filter: `drop-shadow(0 0 ${6 + 3 * Math.sin(pulsePhase)}px ${COLORS.alertRed})`,
              }}
            >
              <circle
                cx="72"
                cy="87"
                r="21"
                fill="none"
                stroke={COLORS.alertRed}
                strokeWidth="3.75"
                opacity={glowOpacity}
              />
              <circle
                cx="72"
                cy="87"
                r="15"
                fill="none"
                stroke={COLORS.alertRed}
                strokeWidth="1.5"
                opacity={glowOpacity}
              />
            </g>
            <text
              x="72"
              y="84"
              fontFamily={FONT}
              fontSize="7.5"
              fontWeight="700"
              fill={COLORS.alertRed}
              textAnchor="middle"
            >
              MORA
            </text>
            <text
              x="72"
              y="93"
              fontFamily={FONT}
              fontSize="6"
              fontWeight="400"
              fill={COLORS.alertRed}
              textAnchor="middle"
            >
              -IDAD
            </text>
          </g>
        </svg>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: "50%",
          transform: "translateX(-50%)",
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
              <svg width="48" height="48" viewBox="0 0 64 64">
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
