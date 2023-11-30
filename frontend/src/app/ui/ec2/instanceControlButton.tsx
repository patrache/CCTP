import styled from "styled-components";
import { FaPlus, FaPlay, FaRedoAlt, FaStop, FaPause } from "react-icons/fa";
import React from "react";

const buttonList = [
  "StartButton",
  "RebootButotn",
  "StopButton",
  "DeleteButton",
  "CreateButton",
];

type InstanceButtonProps = {
  state?: string;
  role: string;
};

const ButtonWrapper = styled.div<InstanceButtonProps>`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  cursor: pointer;
  background-color: ${(props) => {
    switch (props.role) {
      case "StartButton":
        return "#77dd7780";
      case "RebootButotn":
        return "#ffdb96e0";
      case "StopButton":
        return "#ffb34780";
      case "DeleteButton":
        return "#ff696180";
      case "CreateButton":
        return "#BEADFAC0";
      default:
        return "white"; // 기본값은 흰색
    }
  }};
`;

const StartButton = styled(FaPlay)`
  color: white;
  width: 24px;
  height: 24px;
`;

const RebootButton = styled(FaRedoAlt)`
  color: white;
  width: 24px;
  height: 24px;
`;

const StopButton = styled(FaPause)`
  color: white;
  width: 24px;
  height: 24px;
`;

const DeleteButton = styled(FaStop)`
  color: white;
  width: 24px;
  height: 24px;
`;

const PlusButton = styled(FaPlus)`
  color: white;
  width: 24px;
  height: 24px;
`;

function buttonCase(button: string) {
  switch (button) {
    case "StartButton":
      return <StartButton />;
    case "RebootButotn":
      return <RebootButton />;
    case "StopButton":
      return <StopButton />;
    case "DeleteButton":
      return <DeleteButton />;
    case "CreateButton":
      return <PlusButton />;
    default:
      return <PlusButton />;
  }
}

export default function InstanceControlButtons() {
  return (
    <>
      {buttonList.map((button) => {
        return (
          <ButtonWrapper key={button} role={button}>
            {buttonCase(button)}
          </ButtonWrapper>
        );
      })}
    </>
  );
}