"use client";

import InstanceControlButtons from "@/app/ui/ec2/instanceControlButton";
import InstanceList from "@/app/ui/ec2/instanceList";
import styled from "styled-components";

const ButtonContainer = styled.div`
  position: absolute;
  top: 50px;
  left: 1096px;
  width: 300px;
  height: 50px;
  /* border: 1px solid black; */
  display: flex;
  justify-content: space-between;
`

export default function DashBoardEc2() {
  return (
    <>
      <ButtonContainer>
        <InstanceControlButtons/>
      </ButtonContainer>
      <InstanceList/>
    </>
  );
}
