import React from "react";
import { Composition } from "remotion";
import { LowerThirds } from "./LowerThirds";
import { DonutChartSection } from "./DonutChartSection";
import { DashboardMockup } from "./DashboardMockup";
import { BenefitsBadges } from "./BenefitsBadges";
import { LogoClosing } from "./LogoClosing";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="LowerThirds"
        component={LowerThirds}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="DonutChartSection"
        component={DonutChartSection}
        durationInFrames={600}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="DashboardMockup"
        component={DashboardMockup}
        durationInFrames={750}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="BenefitsBadges"
        component={BenefitsBadges}
        durationInFrames={600}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="LogoClosing"
        component={LogoClosing}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
