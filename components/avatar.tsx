import React from "react";
import tw, { styled } from "twin.macro";
import Image from "next/image";

export interface AvatarProps {
  src: string;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ src, size }) => {
  return <Container src={src} width={size || 40} height={size || 40} />;
};

export default Avatar;

const Container = styled(Image)<AvatarProps>(() => [tw`rounded-full`]);
