import { UseTotalStatusStore } from "@/lib/store/useCondorStore";
import styled from "styled-components";
import LoadingComponent from "../common/Loading";
import { TotalStatusModel } from "@/lib/model/htcondor";

const nodeStatusHeader = [
  "Machine",
  "Owner",
  "Claimed",
  "Unclaimed",
  "Matched",
  "Preempting",
  "Drain",
];

const NodeStatusContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 16px;
  width: 98.2%;
  margin-top: 10px;
  height: 70px;
`;

const BodyContainer = styled.div`
  width: 100%;
  height: 80%;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StatusInfoRow = styled.div<{ index: number }>`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 4px 0px 4px 0px;
  &:hover {
    background-color: ${(props) => (props.index === 0 ? "none" : "#B4BDFF40")};
  }
`;

const StatusInfo = styled.div<{ index: number }>`
  flex: ${(props) => {
    switch (props.index) {
      default:
        return 1;
    }
  }};
`;

const StatusInfoHeader = styled(StatusInfo)`
  color: #484848;
  margin: 2px 0px 8px 0px;
`;

const StatusInfoBody = styled(StatusInfo)`
  color: #6f6f6f;
  font-weight: 500;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 4px 0px 4px 0px;
`;

const Divider = styled.div`
  border-top: 1px solid #ddd;
`;

function drawNodeStatusHead() {
  return (
    <>
      {nodeStatusHeader.map((title, index) => {
        return (
          <>
            <StatusInfoHeader index={index}>{title}</StatusInfoHeader>
          </>
        );
      })}
    </>
  );
}

function drawNodeStatusBody(nodeStatusList: TotalStatusModel) {
  return (
    <>
      <BodyContainer>
        <StatusInfoRow index={1}>
          {drawNodeStatusInfo(Object.values(nodeStatusList))}
        </StatusInfoRow>
      </BodyContainer>
    </>
  );
}

function drawNodeStatusInfo(nodeStatus: Array<string>) {
  return (
    <>
      {nodeStatus.map((item, index) => {
        return (
          <StatusInfoBody index={index} key={index}>
            {item === "" ? "-" : item}
          </StatusInfoBody>
        );
      })}
    </>
  );
}

export default function CondorTotalStatus() {
  const nodeStatus = UseTotalStatusStore((state) => state.totalStatusModels);

  return (
    <NodeStatusContainer>
      {nodeStatus ? (
        <>
          <StatusInfoRow index={0}>{drawNodeStatusHead()}</StatusInfoRow>
          <Divider />
          {drawNodeStatusBody(nodeStatus)}
        </>
      ) : (
        <LoadingComponent />
      )}
    </NodeStatusContainer>
  );
}
