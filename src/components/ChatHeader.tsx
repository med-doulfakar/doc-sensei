import { EllipsisVertical, Eye, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useModal } from "@/hooks/use-modal";

interface ChatHeaderProps {
  chatId: string;
}
export const ChatHeader = ({ chatId }: ChatHeaderProps) => {
  const { onOpen } = useModal();

  const openViewDocument = () => {
    onOpen("viewDocument", { chatId });
  };

  const openDeleteChat = () => {
    onOpen("confirmation", { chatId });
  };
  return (
    <div className="sticky top-0 inset-x-0 p-2 h-fit flex items-center border-b-2 border-slate-200 bg-white">
      <h3 className="text-xl font-bold text-slate-600 ">Chat</h3>
      <div className="flex-1"></div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <EllipsisVertical className="cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem
            onClick={openViewDocument}
            className="cursor-pointer"
          >
            <Eye className="h-4 w-4 mr-2" />
            View Document
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={openDeleteChat}
            className="text-red-600 cursor-pointer"
          >
            <Trash className="h-4 w-4 mr-2" />
            Delete chat
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
