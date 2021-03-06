import React from "react";
import tw, { styled } from "twin.macro";

export interface TypographyProps {}

export const H1 = styled.h1<TypographyProps>`
  font-size: 56px;
  line-height: 64px;
  font-weight: bold;
`;

export const H2 = styled.h2<TypographyProps>`
  font-size: 46px;
  line-height: 54px;
  font-weight: bold;
`;

export const H3 = styled.h3<TypographyProps>`
  font-size: 38px;
  line-height: 46px;
  font-weight: bold;
`;

export const H4 = styled.h3<TypographyProps>`
  font-size: 30px;
  line-height: 38px;
  font-weight: bold;
`;

export const IntroText = styled.span<TypographyProps>`
  font-size: 24px;
  line-height: 32px;
  font-weight: 500;
`;

export const MainText = styled.span<TypographyProps>`
  font-size: 20px;
  line-height: 28px;
  font-weight: 400;
`;

export const MediumText = styled.span<TypographyProps>`
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
`;

export const CaptionText = styled.span<TypographyProps>`
  font-size: 14px;
  line-height: 22px;
  font-weight: 400;
`;

export const SmallText = styled.span<TypographyProps>`
  font-size: 12px;
  line-height: 20px;
  font-weight: 300;
`;
