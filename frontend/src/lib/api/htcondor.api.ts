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
