import { getInstanceDetailInfo } from "@/lib/api/ec2.api";
import { Ec2DetailInfoModel } from "@/lib/model/ec2";
import { UseEc2Store } from "@/lib/store/useEc2Store";
import { useEffect, useState } from "react";
import LoadingComponent from "../common/Loading";
import styled from "styled-components";

const DefailInfoContainer = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  margin: 6px;
  grid-template-rows: repeat(9, 54px);
  grid-template-columns: repeat(2, 600px);
`;

const DetailItem = styled.div`
  color: #484848;
`;

export default function Ec2InstanceDetailInfo() {
  const [instanceDetail, setInstanceDetail] = useState<Ec2DetailInfoModel|string>();
  const selectedInstance = UseEc2Store((state) => state.selectedInstance);

  useEffect(() => {
    async function fetchData() {
      setInstanceDetail(undefined);
      if (selectedInstance && selectedInstance.state !== "terminated") {
        const data = await getInstanceDetailInfo(selectedInstance.instanceId);
        setInstanceDetail(data);
      } if(selectedInstance?.state === "terminated") {
        setInstanceDetail(new Ec2DetailInfoModel());
      }
    }

    fetchData();
  }, [selectedInstance]);

  return (
    <>
      {instanceDetail === undefined ? (
        <LoadingComponent />
      ) : (
        <DefailInfoContainer>
          {Object.entries(instanceDetail).map((object, index) => {
            return <DetailItem key={index}>{object[0]} : {object[1] ? object[1] : "-"}</DetailItem>;
          })}
        </DefailInfoContainer>
      )}
    </>
  );
}
