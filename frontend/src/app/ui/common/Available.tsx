import {
  getAvailableRegions,
  getAvailableZones,
  getCurrentRegions,
} from "@/lib/api/common.api";
import { RegionModel, ZoneModel } from "@/lib/model/common";
import { useEffect, useState } from "react";
import styled from "styled-components";

type ToggleButtonProps = {
  clicked: boolean;
};

type AvailableRegionProps = {
  isActive?: boolean;
};

type AvailableZoneProps = {
  state?: string;
};

const AvailableListWrapper = styled.div`
  height: 518px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 16px;
`;

const Title = styled.div`
  font-size: larger;
  font-weight: 500;
  color: #484848;
`;

const ToggleButtonWrapper = styled.div`
  display: flex;
  margin: 12px 0px 12px 0px;
  border-radius: 10px;
  height: 60px;
  background-color: #b4bdff40;
  align-items: center;
  justify-content: space-evenly;
`;

const ToggleButton = styled.div<ToggleButtonProps>`
  background-color: ${(props) => (props.clicked ? "#FFE3BB" : "#B4BDFF40")};
  border-radius: 6px;
  padding: 12px 18px 12px 18px;
  cursor: pointer;
`;

const AvailableItemWrapper = styled.div`
  height: 420px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const AvailableItems = styled.div`
  margin: 4px;
  display: flex;
  justify-content: space-between;
  color: #484848;
  border-radius: 10px;
`;

const AvailableRegion = styled.div<AvailableRegionProps>`
  font-size: 15px;
  padding: 6px 2px 6px 2px;
  font-weight: ${(props) => (props.isActive ? 900 : 400)};
`;

const AvailableZone = styled.div<AvailableZoneProps>`
  font-size: 16px;
  padding: 6px 4px 6px 4px;
  background-color: ${(props) => {
    switch (props.state) {
      case "available":
        return "#77dd7780";
      case "information":
        return "#ffdb96e0";
      case "impaired":
        return "#ffb34780";
      case "unavailable":
        return "#ff696180";
      default:
        return "white";
    }
  }};
  border-radius: 10px;
`;

export default function AvailableList() {
  const [activeButton, setActiveButton] = useState("regions");
  const [currentRegion, setCurrentRegion] = useState<string>();
  const [regions, setRegions] = useState<RegionModel[]>([]);
  const [zones, setZones] = useState<ZoneModel[]>([]);

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  useEffect(() => {
    async function fetchCurrentRegion() {
      const response = await getCurrentRegions();
      setCurrentRegion(response);
    }
    fetchCurrentRegion();
  });

  useEffect(() => {
    async function fetchData() {
      if (activeButton === "regions") {
        const data = await getAvailableRegions();
        data.sort((a, b) => a.regionCode.localeCompare(b.regionCode));
        setRegions(data);
      } else {
        const data = await getAvailableZones();
        setZones(data);
      }
    }
    fetchData();
  }, [activeButton]);

  return (
    <>
      <AvailableListWrapper>
        <Title>• Available</Title>
        <ToggleButtonWrapper>
          <ToggleButton
            clicked={activeButton === "regions"}
            onClick={() => handleButtonClick("regions")}
          >
            Regions
          </ToggleButton>
          <ToggleButton
            clicked={activeButton === "zones"}
            onClick={() => handleButtonClick("zones")}
          >
            Zones
          </ToggleButton>
        </ToggleButtonWrapper>
        <AvailableItemWrapper>
          {activeButton === "regions" &&
            regions.map((region) => {
              return (
                <>
                  <AvailableItems key={region.regionCode}>
                    <AvailableRegion
                      isActive={currentRegion === region.regionCode}
                    >
                      {region.regionName}
                    </AvailableRegion>
                    <AvailableRegion
                      isActive={currentRegion === region.regionCode}
                    >
                      {region.regionCode}
                    </AvailableRegion>
                  </AvailableItems>
                </>
              );
            })}
          {activeButton === "zones" &&
            zones.map((zone) => {
              return (
                <AvailableItems key={zone.zoneName}>
                  <AvailableZone>{zone.zoneName}</AvailableZone>
                  <AvailableZone state={zone.state}>{zone.state}</AvailableZone>
                </AvailableItems>
              );
            })}
        </AvailableItemWrapper>
      </AvailableListWrapper>
    </>
  );
}
