import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS, FONT } from "./index";
import { easeInOut, easeOut } from "./easings";

const FPS = 30;
const TOTAL_DURATION = FPS * 20;
const DONUT_ANIMATION_END = FPS * 1.5;
const DOCUMENTS_DELAY = FPS * 0.5;
const DOCUMENTS_ANIMATION_END = DOCUMENTS_DELAY + FPS * 0.6;

export const durationInFrames = FPS * 20;
export const fps = FPS;
export const width = 1920;
export const height = 1080;

export const DonutChartSection: React.FC = () => {
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
          alignItems: "center",
          gap: 24,
        }}
      >
        <svg width="200" height="200" viewBox="0 0 200 200">
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
          width="80"
          height="80"
          viewBox="0 0 80 80"
          style={{
            transform: `scale(${scale})`,
            opacity: documentsProgress,
          }}
        >
          <g>
            <rect
              x="15"
              y="8"
              width="45"
              height="55"
              rx="3"
              fill="#F7FAFC"
              stroke="#CBD5E0"
              strokeWidth="1"
            />
            <line
              x1="25"
              y1="20"
              x2="50"
              y2="20"
              stroke="#E2E8F0"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="25"
              y1="28"
              x2="45"
              y2="28"
              stroke="#E2E8F0"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <rect
              x="20"
              y="14"
              width="45"
              height="55"
              rx="3"
              fill="#FFFFFF"
              stroke="#CBD5E0"
              strokeWidth="1"
            />
            <line
              x1="30"
              y1="26"
              x2="55"
              y2="26"
              stroke="#E2E8F0"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="30"
              y1="34"
              x2="50"
              y2="34"
              stroke="#E2E8F0"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <rect
              x="25"
              y="20"
              width="45"
              height="55"
              rx="3"
              fill="#FFFFFF"
              stroke={COLORS.alertRed}
              strokeWidth="2"
            />

            <g
              style={{
                filter: `drop-shadow(0 0 ${4 + 2 * Math.sin(pulsePhase)}px ${COLORS.alertRed})`,
              }}
            >
              <circle
                cx="48"
                cy="58"
                r="14"
                fill="none"
                stroke={COLORS.alertRed}
                strokeWidth="2.5"
                opacity={glowOpacity}
              />
              <circle
                cx="48"
                cy="58"
                r="10"
                fill="none"
                stroke={COLORS.alertRed}
                strokeWidth="1"
                opacity={glowOpacity}
              />
            </g>
            <text
              x="48"
              y="56"
              fontFamily={FONT}
              fontSize="5"
              fontWeight="700"
              fill={COLORS.alertRed}
              textAnchor="middle"
            >
              MORA
            </text>
            <text
              x="48"
              y="62"
              fontFamily={FONT}
              fontSize="4"
              fontWeight="400"
              fill={COLORS.alertRed}
              textAnchor="middle"
            >
              -IDAD
            </text>
          </g>
        </svg>
      </div>
    </AbsoluteFill>
  );
};
