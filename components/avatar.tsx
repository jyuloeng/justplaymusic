import React from "react";
import tw, { styled } from "twin.macro";
import Image from "next/image";

export interface AvatarProps {
  src: string;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return <Container src={src} layout="fill" />;
};

export default Avatar;

const Container = styled(Image)<AvatarProps>(() => [tw`rounded-full`]);
