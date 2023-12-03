import { getMasterInstanceList } from "@/lib/api/htcondor.api";
import { useEffect, useState } from "react";
import styled from "styled-components";

const MasterListContainer = styled.div`
  display: flex;
`;

const MasterItem = styled.div`
  margin: 10px 0px 10px 0px;
  background-color: #b4bdff40;
  border-radius: 10px;
  padding: 16px 16px 16px 24px;
  height: 36px;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 22px;
  color: #83a2ff;
  font-weight: 500;
`;

function drawMasterItem(masterList: any[] | undefined) {
  if (masterList !== undefined) {
    return masterList.map((instanceIp) => {
        return <MasterItem key={instanceIp.ip}>{instanceIp.ip}{"'s cluster"}</MasterItem>
    })
  } else {
    return <></>;
  }
}

export default function MasterList() {
  const [masterList, setMasterList] = useState();
  useEffect(() => {
    async function fetchData() {
      const data = await getMasterInstanceList();
      setMasterList(data);
    }
    fetchData();
  }, []);

  return (
    <>
      <MasterListContainer>
        {drawMasterItem(masterList)}
      </MasterListContainer>
    </>
  );
}
