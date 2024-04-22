"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const ViewDocumentModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { chatId } = data;
  const isModalOpen = isOpen && type === "viewDocument";

  const pdfUrl =
    "https://doc-sensei-bucket.s3.us-east-1.amazonaws.com/uploads/1713797325233CV-MOHAMMED DOULFAKAR FRONTEND FREELANCE.pdf";

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose} >
      <DialogContent className="bg-white text-black p-0 overflow-hidden min-w-full h-[600px]">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-sm text-center font-bold">
            {chatId}
          </DialogTitle>
        </DialogHeader>

        <iframe
          src={`https://docs.google.com/gview?url=${pdfUrl}&embedded=true`}
          className="w-full h-full"
        ></iframe>
      </DialogContent>
    </Dialog>
  );
};
