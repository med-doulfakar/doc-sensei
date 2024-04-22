"use client";
import { Send } from "lucide-react";
import { Input } from "./ui/input";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
import MessageList from "./MessageList";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Message } from "ai";
import { useModal } from "@/hooks/use-modal";

interface ChatComponentProps {
  chatId: string;
}

const ChatComponent = ({ chatId }: ChatComponentProps) => {
  const { onOpen } = useModal();

  const { data, isPending } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const response = await axios.post<Message[]>(
        `/api/messages`, { chatId }
      );
      return response.data;
    },
  });
  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/chat",
    body: {
      chatId,
    },
    initialMessages: data || [],
  });

  useEffect(() => {
    const messagesContainer = document.getElementById("messages-container");
    if (messagesContainer) {
      messagesContainer.scrollTo({
        top: messagesContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);


  const handleViewDocument = () => {
    console.log('openin view document modal')
    onOpen("viewDocument" , {chatId  })
  }
  return (
    <div
      className="relative h-full overflow-y-auto"
      id="messages-container"
    >
      <div className="sticky top-0 inset-x-0 p-2 h-fit flex items-center bg-gradient-to-r from-red-50 to-rose-300">
        <h3 className="text-xl font-bold ">Chat</h3>
        <div className="flex-1"></div>
        <Button onClick={() => handleViewDocument()}>
          View document
        </Button>
      </div>

      <MessageList messages={messages} isPending={isPending}/>

      <form
        onSubmit={handleSubmit}
        className="sticky bottom-0 inset-x-0 px-2 py-4 bg-white"
      >
        <div className="flex">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask an question ..."
            className="w-full"
          />
          <Button className="bg-blue-600 ml-2">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;
