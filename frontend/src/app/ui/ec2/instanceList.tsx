"use client";

import { getInstanceList } from "@/lib/api/ec2.api";
import { SummarizedEc2InstanceModel } from "@/lib/model/ec2";
import { useEffect, useState } from "react";
import styled from "styled-components";
import LoadingComponent from "../common/Loading";
import { type } from "os";
import { UseEc2Store } from "@/lib/store/useEc2Store";

const titleItem = [
  "인스턴스 이름",
  "이미지 이름",
  "인스턴스 타입",
  "상태",
  "publicDNS",
  "publicIP",
  "zone",
];

type InstanceItemProps = {
  index: number;
  isSelected?: boolean;
};

const InstanceListContainer = styled.div`
  width: 100%;
  height: 300px;
  background-color: #ffffff;
  border-radius: 10px;
  overflow: scroll;
  padding: 8px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const InstanceInfoRow = styled.div<InstanceItemProps>`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 4px 0px 4px 0px;
  background-color: ${(props) =>
    props.isSelected ? "#B4BDFF40" : "transparent"};
  cursor: ${(props) => (props.index === 0 ? "cursor" : "pointer")};
  &:hover {
    background-color: ${(props) => (props.index === 0 ? "none" : "#B4BDFF40")};
  }
`;

const InstanceInfo = styled.div<InstanceItemProps>`
  flex: ${(props) => {
    switch (props.index) {
      case 4:
        return 3;
      case 3:
        return 1;
      case 2:
        return 1.5;
      default:
        return 2;
    }
  }};
`;

const InstanceInfoHead = styled(InstanceInfo)`
  color: #484848;
  margin: 2px 0px 8px 0px;
`;

const InstanceInfoBody = styled(InstanceInfo)`
  color: #6f6f6f;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 4px 0px 4px 0px;
`;

const Divider = styled.div`
  border-top: 1px solid #ddd;
`;

function drawInstanceHead() {
  return (
    <>
      {titleItem.map((title, index) => {
        return (
          <>
            <InstanceInfoHead index={index}>{title}</InstanceInfoHead>
          </>
        );
      })}
    </>
  );
}

function drawInstanceBody(
  instanceList: SummarizedEc2InstanceModel[],
  selectEc2: (instance: SummarizedEc2InstanceModel) => void,
  selectedInstance: SummarizedEc2InstanceModel | null
) {
  return (
    <>
      {instanceList.map((instance, index) => {
        const isSelected = selectedInstance === instance;
        return (
          <InstanceInfoRow
            index={1}
            key={index}
            onClick={() => selectEc2(instance)}
            isSelected={isSelected}
          >
            {drawInstanceInfo(Object.values(instance))}
          </InstanceInfoRow>
        );
      })}
    </>
  );
}

function drawInstanceInfo(instance: Array<string>) {
  return (
    <>
      {instance.map((item, index) => {
        if (index !== 7) {
          return (
            <InstanceInfoBody index={index} key={index}>
              {item === "" ? "-" : item}
            </InstanceInfoBody>
          );
        }
      })}
    </>
  );
}

export default function InstanceList() {
  const [instanceList, setInstanceList] =
    useState<SummarizedEc2InstanceModel[]>();
  const selectedInstance = UseEc2Store((state) => state.selectedInstance);
  const selectEc2 = UseEc2Store((state) => state.selectInstance);

  useEffect(() => {
    async function fetchData() {
      const data = await getInstanceList();
      setInstanceList(data);
      if (data && data.length > 0) {
        selectEc2(data[0]);
      }
    }
    fetchData();
  }, [selectEc2]);

  return (
    <>
      <InstanceListContainer>
        {instanceList === undefined ? (
          <LoadingComponent />
        ) : (
          <>
            <InstanceInfoRow index={0}>{drawInstanceHead()}</InstanceInfoRow>
            <Divider />
            {drawInstanceBody(instanceList, selectEc2, selectedInstance)}
          </>
        )}
      </InstanceListContainer>
    </>
  );
}
