import { CondorQueueModel, NodeStatusModel, TotalStatusModel } from "../model/htcondor";

export const getMasterInstanceList = async () => {
  const response = await fetch(`http://localhost:3000/condor/masterlist`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to get master instance list");
  }
  const data = await response.json();
  return data;
};


export const getNodeStatus = async (instanceId: string) => {
  const response = await fetch(`http://localhost:3000/condor/status/node/${instanceId}`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to get htcondor node status");
  }
  const data: NodeStatusModel[] = await response.json();
  return data;
};

export const getTotalStatus = async (instanceId: string) => {
  const response = await fetch(`http://localhost:3000/condor/status/total/${instanceId}`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to get htcondor total status");
  }
  const data: TotalStatusModel[] = await response.json();
  return data[0];
};

export const getQueueStatus = async (instanceId: string) => {
  const response = await fetch(`http://localhost:3000/condor/status/queue/${instanceId}`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to get htcondor queue status");
  }
  const data: CondorQueueModel[] = await response.json();
  return data;
}