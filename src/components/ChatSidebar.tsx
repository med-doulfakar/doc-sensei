"use client";

import { DocChat } from "@/lib/db/schema";
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
}

const ChatSidebar = ({ chats, chatId }: ChatSidebarProps) => {
  const { onOpen } = useModal();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onDelete = async (event: React.MouseEvent, chat_id: string) => {
    event.preventDefault();
    onOpen("confirmation" , {chatId : chat_id})
  };

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

                <Trash
                  className="w-5 h-5 hidden group-hover:block text-red-600"
                  onClick={($event) => onDelete($event, chat.id)}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ChatSidebar;
