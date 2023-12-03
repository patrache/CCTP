import { UseNodeStatusStore } from "@/lib/store/useCondorStore";
import styled from "styled-components";
import LoadingComponent from "../common/Loading";
import { NodeStatusModel } from "@/lib/model/htcondor";

const nodeStatusHeader = [
  "이름",
  "운영체제",
  "아키텍쳐",
  "상태",
  "활동",
  "평균부하",
  "메모리",
  "활동시간",
];

const NodeNumber = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #484848c0;
  margin: 8px 0px 8px 0px;
  position: fixed;
  top: 150px;
  right: 346px;
`;


const NodeStatusContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 16px;
  width: 98.2%;
  height: 180px;
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
      case 0:
        return 5;
      case 7:
        return 1.3;
      case 3:
        return 1.3;
      case 4:
        return 1.5;
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

function drawNodeStatusBody(nodeStatusList: NodeStatusModel[]) {
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

export default function CondorNodeStatus() {
  const nodeStatus = UseNodeStatusStore((state) => state.nodeStatusModels);

  return (
    <NodeStatusContainer>
      {nodeStatus ? (
        <>
          <NodeNumber>number of Nodes : {nodeStatus.length}</NodeNumber>
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
