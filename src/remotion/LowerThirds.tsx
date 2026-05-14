import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FONT } from "./index";

const FPS = 30;
const ANIMATION_DURATION = FPS * 0.8;
const FADE_DURATION = FPS * 0.5;
export const durationInFrames = FPS * 10;
export const fps = FPS;
export const width = 1920;
export const height = 1080;

export const LowerThirds: React.FC = () => {
  const frame = useCurrentFrame();

  if (frame >= durationInFrames) return null;

  let opacity = 1;

  if (frame < ANIMATION_DURATION) {
    opacity = frame / ANIMATION_DURATION;
  } else if (frame >= durationInFrames - FADE_DURATION) {
    const fadeProgress =
      (frame - (durationInFrames - FADE_DURATION)) / FADE_DURATION;
    opacity = 1 - fadeProgress;
  }

  const boxStyle = {
    width: 380,
    height: 80,
    backgroundColor: "#FFFFFF",
    borderRadius: 0,
    borderBottom: "6px solid #c3734f",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity,
    fontFamily: FONT,
    fontWeight: 700,
    fontSize: 32,
    color: "#1a1a1a",
  };

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "flex-start",
        paddingBottom: 80,
        paddingLeft: 40,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "33%",
          top: "85%",
          transform: "translateX(-50%) translateY(-50%)",
          textAlign: "center",
          ...boxStyle,
        }}
      >
        María Jesús
      </div>
      <div
        style={{
          position: "absolute",
          left: "66%",
          top: "85%",
          transform: "translateX(-50%) translateY(-50%)",
          textAlign: "center",
          ...boxStyle,
        }}
      >
        Eduardo Tapia
      </div>
    </AbsoluteFill>
  );
};
