import tw, { styled } from "twin.macro";

export interface LoadingContainerProps {}

const LoadingContainer: React.FC<LoadingContainerProps> = () => {
  return <Container>loading</Container>;
};

export default LoadingContainer;

const Container = styled.div(() => []);
