"use client";
import { useEffect, useState } from "react";
import { ViewDocumentModal } from "../modals/ViewDocument";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return (
    <>
      <ViewDocumentModal />
    </>
  );
};
