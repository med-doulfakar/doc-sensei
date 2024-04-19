"use client";
import { Send } from "lucide-react";
import { Input } from "./ui/input";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
import MessageList from "./MessageList";

interface ChatComponentProps {}

const ChatComponent = ({}: ChatComponentProps) => {
  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api : '/api/chat'
  });
  return (
    <div className="relative max-h-screen overflow-hidden">
      <div className="sticky top-0 inset-x-0 p-2 h-fit bg-white">
        <h3 className="text-xl font-bold ">Chat</h3>
      </div>

      <MessageList messages={messages}/>
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
