"use client";

import { uploadToS3 } from "@/lib/aws/s3";
import { Inbox } from "lucide-react";
import { useDropzone } from "react-dropzone";

const FileUpload = () => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      console.log(acceptedFiles);

      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 1024) {
        alert("Please upload a file smaller than 10 MB");
        return;
      }

      try {
        const data = await uploadToS3(file);
        console.log(data);
      } catch (error) {
        console.log(error);
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
        <>
          <Inbox className="w-10 h-10 text-blue-500" />
          <p className="mt-2 text-sm text-slate-400">
            {" "}
            Drop your PDF here to start your chat
          </p>
        </>
      </div>
    </div>
  );
};

export default FileUpload;