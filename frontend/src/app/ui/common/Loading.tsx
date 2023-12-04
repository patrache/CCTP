import { PacmanLoader } from "react-spinners";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Loader = styled(PacmanLoader)`
  align-items: center;
`;

export default function LoadingComponent() {
  return (
    <>
      <Container>
        <Loader color="#FFE3BB" speedMultiplier={2}></Loader>
      </Container>
    </>
  );
}
