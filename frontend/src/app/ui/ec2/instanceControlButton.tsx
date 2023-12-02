import styled from "styled-components";
import { FaPlus, FaPlay, FaRedoAlt, FaStop, FaPause } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { UseEc2Store, UseModalState } from "@/lib/store/useEc2Store";
import {
  deleteInstance,
  rebootInstance,
  startInstance,
  stopInstance,
} from "@/lib/api/ec2.api";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    if (props.state === "running") {
      switch (props.role) {
        case "StartButton":
          return "#bbb";
        case "RebootButotn":
          return "#ffdb96e0";
        case "StopButton":
          return "#ffb34780";
        case "DeleteButton":
          return "#ff696180";
        case "CreateButton":
          return "#BEADFAC0";
        default:
          return "white";
      }
    } else if (props.state === "stopped") {
      switch (props.role) {
        case "StartButton":
          return "#77dd7780";
        case "RebootButotn":
          return "#bbb";
        case "StopButton":
          return "#bbb";
        case "DeleteButton":
          return "#ff696180";
        case "CreateButton":
          return "#BEADFAC0";
        default:
          return "white";
      }
    } else if (
      props.state === "terminated" ||
      props.state === "shutting-down"
    ) {
      switch (props.role) {
        case "StartButton":
          return "#bbb";
        case "RebootButotn":
          return "#bbb";
        case "StopButton":
          return "#bbb";
        case "DeleteButton":
          return "#bbb";
        case "CreateButton":
          return "#BEADFAC0";
        default:
          return "white";
      }
    } else if (props.state === "stopping" || props.state === "pending") {
      switch (props.role) {
        case "StartButton":
          return "#bbb";
        case "RebootButotn":
          return "#bbb";
        case "StopButton":
          return "#bbb";
        case "DeleteButton":
          return "#ff696180";
        case "CreateButton":
          return "#BEADFAC0";
        default:
          return "white";
      }
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

function buttonCase(
  button: string,
  startState: boolean,
  rebootState: boolean,
  stopState: boolean,
  deleteState: boolean,
  setModal: (state: boolean) => void,
  instanceId?: string
) {
  if (instanceId) {
    switch (button) {
      case "StartButton":
        return (
          <StartButton
            onClick={() => (startState ? buttonAction(instanceId, startInstance) : undefined)}
          />
        );
      case "RebootButotn":
        return (
          <RebootButton
            onClick={() =>
              rebootState ? buttonAction(instanceId, rebootInstance) : undefined
            }
          />
        );
      case "StopButton":
        return (
          <StopButton
            onClick={() =>
              stopState ? buttonAction(instanceId, stopInstance) : undefined
            }
          />
        );
      case "DeleteButton":
        return (
          <DeleteButton
            onClick={() =>
              deleteState ? buttonAction(instanceId, deleteInstance) : undefined
            }
          />
        );
      case "CreateButton":
        return (
          <PlusButton
            onClick={() => {
              console.log("fuck");
              setModal(true);
            }}
          />
        );
      default:
        return <></>;
    }
  } else {
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
        return <PlusButton onClick={() => setModal(true)} />;
      default:
        return <></>;
    }
  }
}

async function buttonAction(
  instanceId: string,
  action: (instanceId: string) => Promise<OperationRequestModel>
) {
  const response = await action(instanceId);
  if (response.test === "complete") {
    toast.success("success!", {
      position: "top-center",
      autoClose: 2300,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  } else {
    toast.error("error!", {
      position: "top-center",
      autoClose: 2300,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
}

export default function InstanceControlButtons() {
  const selectedInstance = UseEc2Store((state) => state.selectedInstance);
  const setModalState = UseModalState((state) => state.setModalState);
  const [startButtonState, setStartButtonState] = useState<boolean>(false);
  const [rebootButtonState, setRebootButtonState] = useState<boolean>(false);
  const [stopButtonState, setStopButtonState] = useState<boolean>(false);
  const [deleteButtonState, setDeleteButtonState] = useState<boolean>(false);

  useEffect(() => {
    if (selectedInstance) {
      if (selectedInstance.state === "running") {
        setStartButtonState(false);
        setRebootButtonState(true);
        setStopButtonState(true);
        setDeleteButtonState(true);
      } else if (selectedInstance.state === "stopped") {
        setStartButtonState(true);
        setRebootButtonState(false);
        setStopButtonState(false);
        setDeleteButtonState(true);
      } else if (
        selectedInstance.state === "terminated" ||
        selectedInstance.state === "shutting-down"
      ) {
        setStartButtonState(false);
        setRebootButtonState(false);
        setStopButtonState(false);
        setDeleteButtonState(false);
      } else if (
        selectedInstance.state === "stopping" ||
        selectedInstance.state === "pending"
      ) {
        setStartButtonState(false);
        setRebootButtonState(false);
        setStopButtonState(false);
        setDeleteButtonState(true);
      }
    } else {
      setStartButtonState(false);
      setRebootButtonState(false);
      setStartButtonState(false);
      setDeleteButtonState(false);
    }
  }, [selectedInstance]);

  return (
    <>
      <ToastContainer/>
      {buttonList.map((button) => (
        <ButtonWrapper
          key={button}
          role={button}
          state={selectedInstance?.state}
        >
          {selectedInstance
            ? buttonCase(
                button,
                startButtonState,
                rebootButtonState,
                stopButtonState,
                deleteButtonState,
                setModalState,
                selectedInstance.instanceId
              )
            : buttonCase(
                button,
                startButtonState,
                rebootButtonState,
                stopButtonState,
                deleteButtonState,
                setModalState
              )}
        </ButtonWrapper>
      ))}
    </>
  );
}
