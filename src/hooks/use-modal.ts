import { DocChat } from "@/lib/db/schema";
import { create } from "zustand";

export type ModalType = "viewDocument" | "confirmation" | "newChat";

interface ModalData {
  chatId?: string;
  userId?: number;
}
interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ type, isOpen: true, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
