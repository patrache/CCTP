import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SummarizedEc2InstanceModel } from "../model/ec2";

interface Ec2StoreState {
  selectedInstance: SummarizedEc2InstanceModel | null;
  selectInstance: (instance: SummarizedEc2InstanceModel | null) => void;
}

export const UseEc2Store = create<Ec2StoreState>((set) => ({
  selectedInstance: null,
  selectInstance: (instance) => set({ selectedInstance: instance }),
}));

interface ModalState {
  modalState: boolean;
  setModalState: (state: boolean) => void;
}

export const UseModalState = create<ModalState>((set) => ({
  modalState: false,
  setModalState: (state) => set({ modalState: state }),
}));
