"use client";

import { UploadCloud } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ImageUpload({ onUpload, resetTrigger }) {
  const inputRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (resetTrigger) {
      setPreviewUrl(null);
      if (inputRef.current) inputRef.current.value = "";
    }
  }, [resetTrigger]);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      setPreviewUrl(URL.createObjectURL(file));
      onUpload(file);
    }
  };

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  };

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center text-center cursor-pointer transition ${
        isDragging
          ? "border-blue-400 bg-blue-50 dark:bg-blue-950"
          : "border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
      }`}
    >
      {previewUrl ? (
        <img
          src={previewUrl}
          alt="Preview"
          className="w-full max-w-xs h-48 object-cover rounded-md"
        />
      ) : (
        <>
          <UploadCloud className="h-10 w-10 text-gray-400 dark:text-gray-500 mb-2" />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Click to upload or drag and drop
          </p>
        </>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        ref={inputRef}
        className="hidden"
      />
    </div>
  );
}
