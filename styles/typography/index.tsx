import React from "react";
import tw, { styled, css } from "twin.macro";
import { LightModeTextColor } from "../colors";
export interface TypographyProps {
  bold?: boolean;
}

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

export const MainText = styled.span<TypographyProps>(({ bold }) => [
  css`
    font-size: 20px;
    line-height: 28px;
  `,
  bold ? tw`font-bold` : tw`font-normal`,
]);

export const MediumText = styled.span<TypographyProps>(({ bold }) => [
  css`
    font-size: 18px;
    line-height: 26px;
    /* color: ${LightModeTextColor}; */
  `,
  bold ? tw`font-bold` : tw`font-normal`,
]);

export const CaptionText = styled.span<TypographyProps>(({ bold }) => [
  css`
    font-size: 17px;
    line-height: 24px;
  `,
  bold ? tw`font-bold` : tw`font-normal`,
]);

export const InfoText = styled.span<TypographyProps>(({ bold }) => [
  css`
    font-size: 15px;
    line-height: 22px;
  `,
  bold ? tw`font-bold` : tw`font-normal`,
]);

export const SmallText = styled.span<TypographyProps>(({ bold }) => [
  css`
    font-size: 13px;
    line-height: 20px;
  `,
  bold ? tw`font-bold` : tw`font-light`,
]);
