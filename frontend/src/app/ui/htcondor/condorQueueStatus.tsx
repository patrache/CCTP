import { UseCondorQueueStore } from "@/lib/store/useCondorStore";
import LoadingComponent from "../common/Loading";
import styled from "styled-components";
import { CondorQueueModel } from "@/lib/model/htcondor";

const nodeStatusHeader = [
  "소유자",
  "배치 ID",
  "실행 시간",
  "Done",
  "run",
  "idle",
  "total",
  "jobIds",
];

const NodeStatusContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  width: 100%;
  height: 100%;
`;

const BodyContainer = styled.div`
  width: 100%;
  height: 90%;
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

function drawNodeStatusBody(nodeStatusList: CondorQueueModel[]) {
  return (
    <>
      <BodyContainer>
        {nodeStatusList.map((instance, index) => {
          return (
            <StatusInfoRow index={1} key={index}>
              {drawNodeStatusInfo(Object.values(instance))}
            </StatusInfoRow>
          );
        })}
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

export default function CondorQueueStatus() {
  const condorQueue = UseCondorQueueStore(
    (state) => state.condorQueueStatusModels
  );

  return (
    <NodeStatusContainer>
      {condorQueue ? (
        <>
          <StatusInfoRow index={0}>{drawNodeStatusHead()}</StatusInfoRow>
          <Divider />
          {drawNodeStatusBody(condorQueue)}
        </>
      ) : (
        <LoadingComponent />
      )}
    </NodeStatusContainer>
  );
}
