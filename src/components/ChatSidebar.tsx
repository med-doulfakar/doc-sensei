import { DocChat } from "@/lib/db/schema";
import Link from "next/link";
import { Button } from "./ui/button";
import { MessageCircle, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatSidebarProps {
  chats: DocChat[];
  chatId: number;
}

const ChatSidebar = ({ chats, chatId }: ChatSidebarProps) => {
  return (
    <div className="w-full h-screen p-4 text-ray-200 bg-gray-900">
      <Link href="/">
        <Button className="w-full border-dashed border-white border">
          <PlusCircle className="mr-2 w-4 h-4 " />
          New chat
        </Button>
      </Link>

      <div className="flex flex-col gap-2 mt-4">
        {chats.map((chat) => {
          return (
            <Link key={chat.id} href={`/chats/${chat.id}`}>
              <div
                className={cn(
                  "rounded-lg p-3 text-slate-300 flex items-center",
                  {
                    "bg-blue-600 text-white": chat.id === chatId,
                    "hover:text-white": chat.id === chatId,
                  }
                )}
              >
                <MessageCircle className="mr-2" />
                <p className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis">
                  {chat.pdfName}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

    </div>
  );
};

export default ChatSidebar;
