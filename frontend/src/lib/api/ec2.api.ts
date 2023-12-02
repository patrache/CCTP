import { Ec2DetailInfoModel, SummarizedEc2InstanceModel } from "../model/ec2";

export const getInstanceList = async () => {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const response = await fetch("http://localhost:3000/ec2/instanceList", {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to get instance list");
  }
  const data: SummarizedEc2InstanceModel[] = await response.json();
  return data;
};
  
export const getInstanceDetailInfo = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const response = await fetch(`http://localhost:3000/ec2/instanceDetail/info/${id}`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to get instance detail info");
  }
  const data: Ec2DetailInfoModel = await response.json();
  return data;
}

export const startInstance = async (id: string) => {
  const response = await fetch(`http://localhost:3000/ec2/operation/start/${id}`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to start instance");
  }
  const data: OperationRequestModel = await response.json();
  return data;
}

export const rebootInstance = async (id: string) => {
  const response = await fetch(`http://localhost:3000/ec2/operation/reboot/${id}`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to reboot instance");
  }
  const data: OperationRequestModel = await response.json();
  return data;
}

export const stopInstance = async (id: string) => {
  const response = await fetch(`http://localhost:3000/ec2/operation/stop/${id}`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to stop instance");
  }
  const data: OperationRequestModel = await response.json();
  return data;
}

export const deleteInstance = async (id: string) => {
  const response = await fetch(`http://localhost:3000/ec2/operation/delete/${id}`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to delete instance");
  }
  const data: OperationRequestModel = await response.json();
  return data;
}

