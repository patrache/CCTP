import { ImageModel, RegionModel, ZoneModel } from "../model/common";

export const getCurrentRegions = async () => {
  const response = await fetch("http://localhost:3000/common/region", {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to get current Region");
  }
  const data = await response.json();
  return data.region;
};

export const getAvailableRegions = async (): Promise<RegionModel[]> => {
  const response = await fetch("http://localhost:3000/common/available/region", {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to get Available Region");
  }
  const data: RegionModel[] = await response.json();
  return data;
};

export const getAvailableZones = async (): Promise<ZoneModel[]> => {
  const response = await fetch("http://localhost:3000/common/available/zone", {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to get Available Zone");
  }
  const data: ZoneModel[] = await response.json();
  return data;
};

export const getImageList = async (): Promise<ImageModel[]> => {
  const response = await fetch("http://localhost:3000/common/imageList", {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to get Image List");
  }
  const data: ImageModel[] = await response.json();
  return data;
};