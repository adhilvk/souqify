"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { uploadToS3 } from "@/lib/s3";
import ImageUpload from "@/app/components/backoffice/ImageUpload";
import SubmitButton from "@/app/components/Forminputs/SubmitButton";
import { generateSlug } from "@/lib/generateSlug";
import ToggleInput from "@/components/ToggleInput";

// Dynamic import TinyMCE Editor to avoid SSR issues
const Editor = dynamic(
  () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
  { ssr: false }
);

export default function NewTraining() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(""); // blog content state
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  const categories = [
    { id: 1, title: "Category 1" },
    { id: 2, title: "Category 2" },
    { id: 3, title: "Category 3" },
  ];

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { isActive: true },
  });

  const isActive = watch("isActive");

  const onSubmit = async (data) => {
    if (!image) {
      alert("Please upload an image.");
      return;
    }

    try {
      const fileName = `trainings/${Date.now()}-${image.name}`;
      const buffer = await image.arrayBuffer();
      const imageUrl = await uploadToS3(buffer, fileName, image.type);

      const slug = generateSlug(data.title);
      const payload = {
        ...data,
        slug,
        imageUrl,
        content,
        isActive,
      };

      console.log(payload, "payload");

      // await makePostRequest(
      //   setLoading,
      //   "api/trainings",
      //   payload,
      //   "Training",
      //   reset
      // );

      reset();
      setImage(null);
      setContent("");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Image upload failed.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 rounded-md shadow-md bg-white dark:bg-[#0D172A] transition-colors">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title + Category */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-800 dark:text-white font-semibold mb-1">
              Training Title
            </label>
            <input
              type="text"
              placeholder="Type the training title"
              {...register("title", { required: true })}
              className="w-full px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-gray-800 dark:text-white font-semibold mb-1">
              Select Category
            </label>
            <select
              {...register("categoryId", { required: true })}
              className="w-full px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-[#1E293B]"
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option
                  key={cat.id}
                  value={cat.id}
                  className="bg-white dark:bg-[#1E293B] dark:text-white"
                >
                  {cat.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-800 dark:text-white font-semibold mb-1">
            Training Description
          </label>
          <textarea
            placeholder="Type the training description"
            rows={4}
            {...register("description", { required: true })}
            className="w-full px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Thumbnail + Blog Content */}
        <div>
          <label className="block text-gray-800 dark:text-white font-semibold mb-1">
            Training Thumbnail
          </label>
          <ImageUpload onUpload={setImage} resetTrigger={image === null} />

          <div className="sm:col-span-2 mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Blog Content
            </label>
            <Editor
              id="blog-content-editor"
              apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
              value={content}
              onEditorChange={(newValue) => setContent(newValue)}
              init={{
                height: 300,
                menubar: false,
                plugins:
      "advlist autolink lists link image charmap preview anchor " +
      "searchreplace visualblocks code fullscreen insertdatetime media table help wordcount",
    toolbar:
      "undo redo | blocks | " +
      "bold italic underline | alignleft aligncenter " +
      "alignright alignjustify | bullist numlist outdent indent | " +
      "removeformat | help",
                skin: isDarkMode ? "oxide-dark" : "oxide",
                content_css: isDarkMode ? "dark" : "default",
                content_style: isDarkMode
                  ? `
                      body { background-color: #0D172A; color: #fff; }
                      .tox-toolbar, .tox-toolbar__primary { background-color: #1E293B !important; }
                      .tox-statusbar { background-color: #1E293B !important; }
                    `
                  : `
                      body { background-color: #fff; color: #000; }
                    `,
              }}
            />
          </div>

          <ToggleInput
            label="Publish your Training"
            name="isActive"
            trueTitle="Active"
            falseTitle="Draft"
            register={register}
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <SubmitButton
            isLoading={loading}
            buttonTitle="Create Training"
            loadingButtonTitle="Creating Training please wait..."
          />
        </div>
      </form>
    </div>
  );
}
