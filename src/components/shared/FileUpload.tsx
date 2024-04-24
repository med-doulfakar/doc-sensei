"use client";

import { uploadToS3 } from "@/lib/aws/s3";
import { useMutation } from "@tanstack/react-query";
import { Inbox, Loader2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import {toast} from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface FileUploadProps {
  onSuccess : () => {}
}

const FileUpload = ({onSuccess} : FileUploadProps) => {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      file_key,
      file_name,
    }: {
      file_key: string;
      file_name: string;
    }) => {
      const response = await axios.post("/api/document-chat", {
        file_key,
        file_name,
      });
      return response.data;
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      setUploading(true);

      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Please upload a file smaller than 10 MB");
        return;
      }

      try {
        const data = await uploadToS3(file);
        if (!data?.file_key || !data?.file_name) {
          toast.error("something went wrong !");
          return;
        }

        mutate(data, {
          onSuccess: ({ chat_id }) => {
            onSuccess()
            router.push("/chat/" + chat_id);
            toast.success("Chat created successfully");
            
          },
          onError: (err) => {
            toast.error("Error creating chat with uploaded document");
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        setUploading(false);
      }
    },
  });

  return (
    <div className="p-2 bg-white rounded-xl">
      <div
        {...getRootProps({
          className:
            "border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col",
        })}
      >
        <input {...getInputProps()} />
        {uploading || isPending ? (
          <>
            <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
            <p className="mt-2 text-sm text-slate-400 ">
              {" "}
              Spilling Tea to ChatGPT
            </p>
          </>
        ) : (
          <>
            <Inbox className="w-10 h-10 text-blue-500" />
            <p className="mt-2 text-sm text-slate-400">
              {" "}
              Drop your PDF here to start your chat
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
