"use client";
import { useEffect, useState } from "react";
import { ViewDocumentModal } from "../modals/ViewDocument";
import DeleteChatModal from "../modals/DeleteChatModal";
import NewChatModal from "../modals/NewChatModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return (
    <>
      <ViewDocumentModal />
      <DeleteChatModal />
      <NewChatModal />
    </>
  );
};
