import tw, { styled } from "twin.macro";

export interface ErrorContainerProps {}

const ErrorContainer: React.FC<ErrorContainerProps> = () => {
  return <Container>error</Container>;
};

export default ErrorContainer;

const Container = styled.div(() => []);
