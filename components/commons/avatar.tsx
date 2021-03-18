import React from "react";
import tw, { styled } from "twin.macro";
import Image from "next/image";

export interface AvatarProps {
  src: string;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return <Container src={src} layout="responsive" width={0} height={0} />;
};

export default Avatar;

const Container = styled(Image)<AvatarProps>(() => [tw`rounded-full`]);
