"use client";

import CondorNodeStatus from "@/app/ui/htcondor/condorNodeStatus";
import CondorQueueStatus from "@/app/ui/htcondor/condorQueueStatus";
import CondorTotalStatus from "@/app/ui/htcondor/condorTotalStatus";
import MasterList from "@/app/ui/htcondor/masterList";
import { getNodeStatus, getQueueStatus, getTotalStatus } from "@/lib/api/htcondor.api";
import {
  UseCondorQueueStore,
  UseNodeStatusStore,
  UseTotalStatusStore,
} from "@/lib/store/useCondorStore";
import { useEffect, useState } from "react";
import styled from "styled-components";

const DetailList = ["condor_q", "detail", "add job"];

const CondorDetail = styled.div`
  background-color: white;
  border-radius: 0px 10px 10px 10px;
  width: 98%;
  height: 350px;
  padding: 16px;
`;

const CondorDetailSelect = styled.div<{ isSelected: boolean }>`
  background-color: ${(props) => (props.isSelected ? "#B4BDFF40" : "white")};
  border-radius: 10px 10px 0px 0px;
  padding: 8px 12px 8px 12px;
  color: #484848;
  cursor: pointer;
`;

const CondorDetailSelectWrapper = styled.div`
  margin-top: 16px;
  display: flex;
`;

export default function DashBoardHTCondor() {
  const [selectedItem, setSelect] = useState("condor_q");
  const [poolingState, setPoolingState] = useState(false);
  const setNodeStatus = UseNodeStatusStore((state) => state.setNodeStatusModel);
  const setTotalStatus = UseTotalStatusStore(
    (state) => state.setTotalStatusModel
  );
  const setCondorQueue = UseCondorQueueStore(
    (state) => state.setCondorQueueStatusModel
  );
  const condorQueue = UseCondorQueueStore((state) => state.condorQueueStatusModels);

  useEffect(() => {
    const interval = setInterval(() => {
      if(condorQueue){
        setPoolingState(true);
      } else {
        setPoolingState(false);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [condorQueue, poolingState]);

  
  useEffect(() => {
    async function fetchData() {
      const data = await getNodeStatus("i-04ed4cbba0c7747ee");
      setNodeStatus(data);
    }
    fetchData();
  });

  useEffect(() => {
    async function fetchData() {
      const data = await getTotalStatus("i-04ed4cbba0c7747ee");
      setTotalStatus(data);
    }
    fetchData();
  });

  useEffect(() => {
    async function fetchData() {
      const data = await getQueueStatus("i-04ed4cbba0c7747ee");
      setCondorQueue(data);
    }
    fetchData();
  }, []);

  return (
    <>
      <MasterList />
      <CondorNodeStatus />
      <CondorTotalStatus />
      <CondorDetailSelectWrapper>
        {DetailList.map((item) => {
          const isSelected = selectedItem === item;
          return (
            <CondorDetailSelect
              key={item}
              isSelected={isSelected}
              onClick={() => setSelect(item)}
            >
              {item}
            </CondorDetailSelect>
          );
        })}
      </CondorDetailSelectWrapper>
      <CondorDetail>
        {(() => {
          switch (selectedItem) {
            case "condor_q":
              return <CondorQueueStatus/>;
            case "detail":
              return <>아직 준비 중입니다.</>;
            case "add job":
              return <>아직 준비 중입니다.</>;
            default:
              return <>somethings wrong...</>;
          }
        })()}
      </CondorDetail>
    </>
  );
}
