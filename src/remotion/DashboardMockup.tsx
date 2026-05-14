import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS, FONT } from "./index";
import { easeOut, easeInOut } from "./easings";

const FPS = 30;
const TOTAL_DURATION = FPS * 25;
const BARS_STAGGER = FPS * 0.1;
const BAR_DURATION = FPS * 0.5;
const NOTIFICATION_DELAY = FPS * 5;
const NOTIFICATION_DURATION = FPS * 0.6;

const BAR_VALUES = [0.4, 0.55, 0.5, 0.7, 0.65, 0.85, 0.9, 0.75];

export const durationInFrames = FPS * 25;
export const fps = FPS;
export const width = 1920;
export const height = 1080;

export const DashboardMockup: React.FC = () => {
  const frame = useCurrentFrame();

  if (frame >= TOTAL_DURATION) return null;

  const floatOffset = Math.sin(((frame / FPS) * 2 * Math.PI) / 3) * 8;

  const notificationProgress =
    frame < NOTIFICATION_DELAY
      ? 0
      : Math.min(1, (frame - NOTIFICATION_DELAY) / NOTIFICATION_DURATION);
  const notificationY = -100 * (1 - easeOut(notificationProgress));

  const pulsePhase = (frame / FPS) * 3 * Math.PI;

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
          left: "60%",
          transform: `translate(-50%, calc(-50% + ${floatOffset}px))`,
        }}
      >
        <div
          style={{
            width: 280,
            height: 480,
            backgroundColor: COLORS.white,
            borderRadius: 24,
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
            overflow: "hidden",
            padding: 20,
          }}
        >
          <div
            style={{
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: 16,
              color: COLORS.primaryDark,
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            Ingresos Arrendatarios
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              gap: 12,
              height: 200,
              paddingTop: 20,
            }}
          >
            {BAR_VALUES.map((value, index) => {
              const barStart = index * BARS_STAGGER;
              const barProgress = Math.min(
                1,
                Math.max(0, (frame - barStart) / BAR_DURATION),
              );
              const easedProgress = easeInOut(barProgress);
              const height = 180 * value * easedProgress;

              return (
                <div
                  key={index}
                  style={{
                    width: 24,
                    height: Math.max(4, height),
                    backgroundColor: COLORS.successGreen,
                    borderRadius: "4px 4px 0 0",
                    opacity: barProgress > 0 ? 1 : 0,
                  }}
                />
              );
            })}
          </div>

          {notificationProgress > 0 && (
            <div
              style={{
                position: "absolute",
                top: notificationY + 60,
                left: 20,
                right: 20,
                backgroundColor: COLORS.white,
                border: `2px solid ${COLORS.successGreen}`,
                borderRadius: 12,
                boxShadow: "0 8px 24px rgba(0, 210, 106, 0.2)",
                padding: 12,
                display: "flex",
                alignItems: "center",
                gap: 12,
                opacity: notificationProgress,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  backgroundColor: COLORS.primaryDark,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 0 ${8 + 4 * Math.sin(pulsePhase)}px ${COLORS.successGreen}`,
                }}
              >
                <svg width="20" height="20" viewBox="0 0 48 48">
                  <path
                    d="M24,4 L28,4 L29,10 L33,11 L36,8 L38,12 L42,14 L41,18 L45,21 L43,25 L47,28 L45,32 L47,36 L43,39 L45,43 L41,46 L37,45 L33,47 L29,44 L25,47 L21,44 L17,47 L13,45 L9,43 L11,39 L7,36 L5,32 L3,28 L7,25 L5,21 L9,18 L8,14 L12,12 L10,8 L14,11 L18,10 L19,4 L22,4 Z"
                    fill={COLORS.white}
                  />
                  <circle cx="24" cy="24" r="6" fill={COLORS.primaryDark} />
                </svg>
              </div>
              <div
                style={{
                  fontFamily: FONT,
                  fontSize: 11,
                  fontWeight: 600,
                  color: COLORS.charcoal,
                  lineHeight: 1.3,
                }}
              >
                ⚠️ IA Activa: Mantenimiento Predictivo
              </div>
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
