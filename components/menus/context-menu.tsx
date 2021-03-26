import { useState, useEffect, useRef, useCallback } from "react";
import tw, { styled, css } from "twin.macro";
import { ContextMenuItem } from ".";
import { InfoText } from "../../styles/typography";

export interface ContextMenuPosition {
  top: number;
  left: number;
}

export interface ContextMenuProps {
  visible?: boolean;
  position?: ContextMenuPosition;
  menu?: ContextMenuItem[];
  onClose?: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  visible,
  position,
  menu,
  onClose,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseOut = (e: MouseEvent) => {
    if (!ref.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleMouseOut);
    document.addEventListener("touchstart", handleMouseOut);
    // document.addEventListener("scroll", handleMouseOut);
    return () => {
      document.removeEventListener("mousedown", handleMouseOut);
      document.removeEventListener("touchstart", handleMouseOut);
      // document.addEventListener("scroll", handleMouseOut);
    };
  }, []);

  return (
    <Container ref={ref} visible={visible} position={position}>
      {children && <ChildrenContainer>{children}</ChildrenContainer>}

      <Controls>
        {menu?.map(
          (item) =>
            item && (
              <ControlItem key={item.key}>
                {item.icon && <Icon>{item.icon}</Icon>}
                <InfoText bold onClick={item.onClick}>
                  {item.title}
                </InfoText>
              </ControlItem>
            )
        )}
      </Controls>
    </Container>
  );
};

export default ContextMenu;

const Icon = styled.div(() => [tw`mr-2`]);

const ControlItem = styled(InfoText)(() => [
  tw`flex items-center p-2 rounded cursor-pointer transition
      hover:text-primary2 hover:bg-primary-background`,
  css`
    &:active {
      transform: scale(0.96);
    }
  `,
]);

const Controls = styled.div(() => [tw``]);

const ChildrenContainer = styled.div(() => [tw`mb-2`]);

const Container = styled.div<ContextMenuProps>(({ visible, position }) => [
  tw`absolute flex-col p-2 rounded-lg border shadow-lg`,
  visible ? tw`inline-flex` : tw`hidden`,
  position &&
    css`
      top: ${position.top}px;
      left: ${position.left}px;
    `,
  css`
    z-index: 9999;
    background: rgba(255, 255, 255, 0.88);
    backdrop-filter: blur(12px);
  `,
]);
