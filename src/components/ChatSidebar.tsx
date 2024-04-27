"use client";

import { DocChat, DocUser } from "@/lib/db/schema";
import Link from "next/link";
import { Button } from "./ui/button";
import { MessageCircle, PlusCircle, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal";

interface ChatSidebarProps {
  chats: DocChat[];
  chatId?: string;
  user: DocUser
}

const ChatSidebar = ({ chats, chatId }: ChatSidebarProps) => {
  const { onOpen } = useModal();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onDelete = async (event: React.MouseEvent, chat_id: string) => {
    event.preventDefault();
    onOpen("confirmation" , {chatId : chat_id})
  };

  const openNewChat = (event: React.MouseEvent, ) => {
    event.preventDefault();
    onOpen('newChat' )
  }

  return (
    <div className="w-full h-screen p-4 text-ray-200 bg-gray-900">
        <Button className="w-full border-dashed border-white border" onClick={($event) => openNewChat($event)}>
          <PlusCircle className="mr-2 w-4 h-4 " />
          New chat
        </Button>

      <div className="flex flex-col gap-2 mt-4">
        {chats.map((chat) => {
          return (
            <Link key={chat.id} href={`/chat/${chat.id}`}>
              <div
                className={cn(
                  "rounded-lg p-3 text-slate-300 flex items-center group hover:bg-slate-500 ",
                  {
                    "bg-blue-600 text-white": chat.id === chatId,
                    "hover:text-white": chat.id === chatId,
                  }
                )}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
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
