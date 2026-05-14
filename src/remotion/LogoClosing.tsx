import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS, FONT } from "./index";
import { easeOut } from "./easings";

const FPS = 30;
const TOTAL_DURATION = FPS * 10;
const ZOOM_DURATION = FPS * 0.8;
const ARROW_DURATION = FPS * 1.2;
const FADE_DURATION = FPS * 1;

export const durationInFrames = FPS * 10;
export const fps = FPS;
export const width = 1920;
export const height = 1080;

export const LogoClosing: React.FC = () => {
  const frame = useCurrentFrame();

  if (frame >= TOTAL_DURATION) return null;

  const zoomProgress = Math.min(1, frame / ZOOM_DURATION);
  const scale = 0.9 + 0.1 * easeOut(zoomProgress);

  const arrowProgress = Math.min(
    1,
    Math.max(0, (frame - ZOOM_DURATION * 0.5) / ARROW_DURATION),
  );
  const arrowDrawLength = arrowProgress;
  const arrowY = -30 * (1 - arrowProgress);

  const fadeStart = TOTAL_DURATION - FADE_DURATION;
  let backgroundOpacity = 0;
  if (frame >= fadeStart) {
    backgroundOpacity = (frame - fadeStart) / FADE_DURATION;
  }

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.white }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: COLORS.white,
          opacity: backgroundOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
        }}
      >
        <svg
          width="600"
          height="200"
          viewBox="0 0 1920 1080"
          style={{
            transform: `scale(${scale})`,
            opacity: 1 - backgroundOpacity,
          }}
        >
          <defs>
            <linearGradient id="roofGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D38E6B" />
              <stop offset="50%" stopColor="#C06C47" />
              <stop offset="100%" stopColor="#A85A3A" />
            </linearGradient>
            <linearGradient
              id="leftWallGrad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#AAB7B8" />
              <stop offset="100%" stopColor="#8B9A9B" />
            </linearGradient>
            <linearGradient
              id="rightWallGrad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#566573" />
              <stop offset="100%" stopColor="#3C3C3B" />
            </linearGradient>
            <linearGradient
              id="frontWallGrad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#D38E6B" />
              <stop offset="100%" stopColor="#B87D5A" />
            </linearGradient>
          </defs>

          <g transform="translate(660, 440)">
            <g
              stroke="#3C3C3B"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M150,0 L300,100 L0,100 Z" />
              <path d="M0,100 L0,250 L150,300 L150,150 Z" />
              <path d="M300,100 L300,250 L150,300 L150,150 Z" />
              <path d="M0,100 L150,150 L150,300 L0,250 Z" />
              <path d="M150,150 L150,300" />
              <path d="M75,125 L75,275" />
              <path d="M225,125 L225,275" />
            </g>

            <g>
              <path
                d="M150,0 L0,100 L150,100 Z"
                fill="url(#roofGrad)"
                opacity="0.9"
              />
              <path
                d="M150,0 L300,100 L150,100 Z"
                fill="#B87D5A"
                opacity="0.85"
              />
              <path
                d="M0,100 L0,250 L150,300 L150,150 Z"
                fill="url(#leftWallGrad)"
                opacity="0.8"
              />
              <path
                d="M300,100 L300,250 L150,300 L150,150 Z"
                fill="url(#rightWallGrad)"
                opacity="0.9"
              />
              <path
                d="M0,100 L150,150 L150,300 L0,250 Z"
                fill="url(#frontWallGrad)"
                opacity="0.85"
              />
              <rect
                x="30"
                y="200"
                width="40"
                height="50"
                rx="2"
                fill="#8B6914"
                opacity="0.6"
              />
              <circle cx="62" cy="225" r="4" fill="#3C3C3B" />
            </g>
          </g>

          <text
            x="960"
            y="570"
            fontFamily={FONT}
            fontWeight="700"
            fontSize="72"
            fill="#3C3C3B"
            letterSpacing="8"
            textAnchor="middle"
          >
            PRISMA HOGAR
          </text>
        </svg>

        <svg
          width="100"
          height="120"
          viewBox="0 0 60 60"
          style={{
            transform: `translateY(${arrowY}px)`,
            opacity: 1 - backgroundOpacity,
          }}
        >
          <defs>
            <linearGradient id="arrowGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor={COLORS.successGreen} />
              <stop offset="100%" stopColor="#00E676" />
            </linearGradient>
          </defs>

          <g>
            <rect
              x="24"
              y="25"
              width="12"
              height="25"
              rx="2"
              fill={`url(#arrowGrad)`}
              clipPath={`inset(0 ${100 - arrowDrawLength * 100}% 0 0)`}
            />
            <path
              d="M30,5 L48,28 L38,28 L38,22 L22,22 L22,28 L12,28 Z"
              fill="url(#arrowGrad)"
              stroke={COLORS.successGreen}
              strokeWidth="1"
              strokeLinejoin="round"
              clipPath={`inset(0 ${100 - arrowDrawLength * 100}% 0 0)`}
            />
          </g>
        </svg>
      </div>
    </AbsoluteFill>
  );
};
