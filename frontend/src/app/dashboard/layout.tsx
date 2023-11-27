'use client'

import "@/app/ui/global.css";
import styled from "styled-components";
import NavBar from "../ui/common/NavBar";
import AvailableList from "../ui/common/Available";
import ImageList from "../ui/common/ImageList";
import { usePathname } from "next/navigation";
import { capitalizeFirstLetter } from "@/lib/util";

const DashBoardLayoutWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const ContentWrapper = styled.div`
`

const Title = styled.div`
    font-size: 56px;
    font-weight: 600;
    color: #484848;
`

const ContentSection = styled.div`
    width: 1048px;
    height: 83.2vh;
    background-color: white;
    margin-top: 20px;
    padding: 10px;
    border-radius: 10px;
    margin-right: 20px;
`

const StatusBar = styled.div`
  width: 282px;
  height: 94vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`


export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const title = capitalizeFirstLetter(path.slice(11));

  return (
    <DashBoardLayoutWrapper>
      <NavBar/>
      <ContentWrapper>
        <Title>{
          title === "" ? "Home" : title
        }</Title>
        <ContentSection>
          <div>{children}</div>
        </ContentSection>
      </ContentWrapper>
      <StatusBar>
        <AvailableList/>
        <ImageList/>
      </StatusBar>
    </DashBoardLayoutWrapper>
  );
}
