import { useState } from "react";
import tw, { styled, css } from "twin.macro";
import { Button } from "../buttons";
import { IconLeftArrow, IconRightArrow } from "../../styles/icons";
import { CaptionText } from "../../styles/typography";

export interface PaginationProps {
  current?: number;
  hasMore?: boolean;
  onChange?: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  current,
  hasMore,
  onChange,
}) => {
  const handleChange = (type: "prev" | "next") => {
    if (type === "prev") {
      onChange(current - 1);
    } else if (type === "next") {
      onChange(current + 1);
    }
  };

  return (
    <Container>
      <Paginator>
        {current > 0 && (
          <Button
            icon={<IconLeftArrow />}
            onClick={() => handleChange("prev")}
          />
        )}
        {hasMore && (
          <Button
            icon={<IconRightArrow />}
            onClick={() => handleChange("next")}
          />
        )}
        <Page bold>Page&nbsp;&nbsp;{current + 1}</Page>
      </Paginator>
    </Container>
  );
};

export default Pagination;

const Page = styled(CaptionText)(() => [tw`ml-3`]);

const Paginator = styled.div(() => [tw`flex items-center`]);

const Container = styled.div(() => [tw``]);
