import { create } from "zustand";
import { NodeStatusModel, TotalStatusModel } from "../model/htcondor";

interface NodeStatusStore {
  nodeStatusModels: NodeStatusModel[] | null;
  setNodeStatusModel: (nodeStatusModels: NodeStatusModel[] | null) => void;
}

export const UseNodeStatusStore = create<NodeStatusStore>((set) => ({
  nodeStatusModels: null,
  setNodeStatusModel: (inputNodeStatusModels) =>
    set({ nodeStatusModels: inputNodeStatusModels }),
}));

interface TotalStatusStore {
  totalStatusModels: TotalStatusModel | null;
  setTotalStatusModel: (totalStatusModels: TotalStatusModel | null) => void;
}

export const UseTotalStatusStore = create<TotalStatusStore>((set) => ({
  totalStatusModels: null,
  setTotalStatusModel: (inputTotalStatusModels) =>
    set({ totalStatusModels: inputTotalStatusModels }),
}));
