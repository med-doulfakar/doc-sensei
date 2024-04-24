import { useModal } from "@/hooks/use-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import FileUpload from "../shared/FileUpload";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

interface NewChatModalProps {}

const NewChatModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "newChat";

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Start a new chat</DialogTitle>
          <DialogDescription>
            Upload a PDF document and start you conversation with the document
            sensei
          </DialogDescription>
        </DialogHeader>
          <FileUpload onSuccess={handleClose}/>
        <DialogFooter>
          <Button type="submit" variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewChatModal;
