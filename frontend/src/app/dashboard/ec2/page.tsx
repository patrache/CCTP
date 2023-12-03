"use client";

import InstanceControlButtons from "@/app/ui/ec2/instanceControlButton";
import InstanceCreateModal from "@/app/ui/ec2/instanceCreateModal";
import Ec2InstanceDetailInfo from "@/app/ui/ec2/instanceInfo";
import InstanceList from "@/app/ui/ec2/instanceList";
import { useState } from "react";
import styled from "styled-components";

const DetailList = ["info", "state", "console"];

const ButtonContainer = styled.div`
  position: absolute;
  top: 50px;
  left: 1096px;
  width: 300px;
  height: 50px;
  /* border: 1px solid black; */
  display: flex;
  justify-content: space-between;
`;

const InstanceDetailSelectWrapper = styled.div`
  margin-top: 24px;
  display: flex;
`;

const InstanceDetailSelect = styled.div<{ isSelected: boolean }>`
  background-color: ${(props) => (props.isSelected ? "#B4BDFF40" : "white")};
  border-radius: 10px 10px 0px 0px;
  padding: 12px;
  color: #484848;
  cursor: pointer;
`;

const InstanceDetail = styled.div`
  background-color: white;
  border-radius: 0px 10px 10px 10px;
  width: 100%;
  height: 446px;
  padding: 8px;
`;

export default function DashBoardEc2() {
  const [selectedItem, setSelect] = useState("info");

  return (
    <>
      <ButtonContainer>
        <InstanceControlButtons />
      </ButtonContainer>
      <InstanceList />
      <InstanceDetailSelectWrapper>
        {DetailList.map((item) => {
          const isSelected = selectedItem === item;
          return (
            <InstanceDetailSelect
              key={item}
              isSelected={isSelected}
              onClick={() => setSelect(item)}
            >
              {item}
            </InstanceDetailSelect>
          );
        })}
      </InstanceDetailSelectWrapper>
      <InstanceDetail>
        {(() => {
          switch (selectedItem) {
            case "info":
              return <Ec2InstanceDetailInfo />;
            case "state":
              return <>아직 준비 중입니다.</>;
            case "console":
              return <>아직 준비 중입니다.</>;
            default:
              return <>somethings wrong...</>;
          }
        })()}
      </InstanceDetail>
      <InstanceCreateModal />
    </>
  );
}
