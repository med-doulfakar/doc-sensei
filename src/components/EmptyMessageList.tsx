import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { RocketIcon } from "lucide-react";

const EmptyMessageList = () => {
  return (
    <div className="w-full max-h-screen flex ">

<Alert>
      <RocketIcon className="h-4 w-4" />
      <AlertTitle>Let's go!</AlertTitle>
      <AlertDescription>
      <p className="text-sm text-slate-600">Start your conversation with the sensei by typing your prompt below.</p>
      </AlertDescription>
    </Alert>
      
    </div>
  );
};

export default EmptyMessageList;
