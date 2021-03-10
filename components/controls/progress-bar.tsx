// 自己写的，不太好用，已废弃，还是用rc-slider了...
import React, { useState, useRef } from "react";
import tw, { styled, css } from "twin.macro";
import { tuple } from "../../lib/type";

const ProgressBarTypes = tuple("vertical", "horizontal");
type ProgressBarType = typeof ProgressBarTypes[number];

export interface ProgressBarProps {
  percent: number;
  strokeColor?: string;
  trailColor?: string;
  direction?: ProgressBarType;
  onChange?: (newPercent: number) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  percent,
  strokeColor,
  trailColor,
  direction,
  onChange,
}) => {
  const barContainerRef = useRef(null);
  const [originX, setOriginX] = useState<number>(0);

  const handleStartSlide = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { nativeEvent } = e;
    setOriginX(() => nativeEvent.pageX - nativeEvent.offsetX);
    const barContainerWidth = barContainerRef.current.getBoundingClientRect()
      .width;
    const newPercent = Math.round(
      (nativeEvent.offsetX / barContainerWidth) * 100
    );
    onChange && onChange(newPercent);
    barContainerRef.current.addEventListener("mouseup", handleStopSlide);
    barContainerRef.current.addEventListener("mousemove", handleSlide);
  };

  const handleStopSlide = () => {
    barContainerRef.current.removeEventListener("mouseup", handleStopSlide);
    barContainerRef.current.removeEventListener("mousemove", handleSlide);
  };

  const handleSlide: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const barContainerWidth = barContainerRef.current.getBoundingClientRect()
      .width;
    let newPercent = Math.round(
      ((e.pageX - originX) / barContainerWidth) * 100
    );
    newPercent = Math.min(newPercent, 100);
    newPercent = Math.max(newPercent, 0);
    onChange && onChange(newPercent);
  };

  return (
    <Container>
      <BarContainer
        ref={barContainerRef}
        trailColor={trailColor}
        onMouseDown={handleStartSlide}
        onTouchStart={handleStartSlide}
      >
        <Bar percent={percent} strokeColor={strokeColor}></Bar>
      </BarContainer>
    </Container>
  );
};

export default ProgressBar;

const Bar = styled.div(
  ({ percent, strokeColor }: { percent: number; strokeColor: string }) => [
    tw`relative bg-primary rounded-lg rounded-l-none transition`,
    css`
      width: ${percent}%;
      height: 100%;
    `,
    css`
      &::before {
        ${tw`absolute inset-0 bg-background rounded-lg rounded-l-none`};
        content: "";
        animation: progress-active 5s cubic-bezier(0.23, 1, 0.32, 1) infinite;
      }

      @keyframes progress-active {
        0% {
          width: 0;
          opacity: 0.1;
        }
        20% {
          width: 0;
          opacity: 0.3;
        }
        100% {
          width: 100%;
          opacity: 0;
        }
      }
    `,
    strokeColor &&
      css`
        background-color: ${strokeColor};
      `,
  ]
);

const BarContainer = styled.div(({ trailColor }: { trailColor: string }) => [
  tw`w-full h-2 bg-background rounded-lg rounded-l-none rounded-r-none transition`,
  trailColor &&
    css`
      background-color: ${trailColor};
    `,
]);

const Container = styled.div(() => []);
