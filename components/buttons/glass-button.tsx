import tw, { styled, css } from "twin.macro";

export interface GlassButtonProps {
  children?: React.ReactNode;
  borderRaduis?: number;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const GlassButton: React.FC<GlassButtonProps> = ({ children, onClick }) => {
  return <Container onClick={onClick}>{children}</Container>;
};

export default GlassButton;

const Container = styled.button<GlassButtonProps>(({ borderRaduis }) => [
  tw`transition`,
  css`
    padding: 10px;
    background: rgba(244, 245, 247, 0.3);
    backdrop-filter: blur(8px);

    &:active {
      transform: scale(0.92);
    }

    &:focus {
      outline: none;
    }
  `,
  borderRaduis
    ? css`
        border-radius: ${borderRaduis}px;
      `
    : tw`rounded-full`,
]);
