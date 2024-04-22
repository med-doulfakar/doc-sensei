"use client";

import { DocChat } from "@/lib/db/schema";
import Link from "next/link";
import { Button } from "./ui/button";
import { MessageCircle, PlusCircle, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useState } from "react";
import {toast} from "sonner";
import { useRouter } from "next/navigation";

interface ChatSidebarProps {
  chats: DocChat[];
  chatId: string;
}

const ChatSidebar = ({ chats, chatId }: ChatSidebarProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const onDelete = async (event: React.MouseEvent, chat_id: string) => {
    event.preventDefault();
    try {
      console.log(chat_id)
      setLoading(true);
      await axios.delete(`/api/document-chat/${chat_id}`);
      toast.success("Chat deleted successfully" , {duration : 2000});
      router.push('/')
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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
