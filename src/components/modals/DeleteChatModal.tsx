import { useModal } from "@/hooks/use-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const DeleteChatModal = () => {
  const router = useRouter();
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "confirmation";
  const { chatId } = data;
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const handleDeleteChat = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/document-chat/${chatId}`);
      toast.success("Chat deleted successfully", { duration: 2000 });
      onClose();
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this chat ?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to permanently
            delete this chat from our servers?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={isLoading}
            type="submit"
            variant="destructive"
            onClick={handleDeleteChat}
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}Confirm
          </Button>
          <Button type="submit" variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteChatModal;
