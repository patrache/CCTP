import { SummarizedEc2InstanceModel } from "../model/ec2";

export const getInstanceList = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const response = await fetch("http://localhost:3000/ec2/instanceList", {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to get instance list");
  }
  const data: SummarizedEc2InstanceModel[] = await response.json();
  return data;
};
  