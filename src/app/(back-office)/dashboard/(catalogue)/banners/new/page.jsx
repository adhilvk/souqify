"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { bannerImageUploader } from "@/lib/uploaders";
import ImageUpload from "@/app/components/backoffice/ImageUpload";
import { makePostRequest } from "@/lib/apiRequest";
import SubmitButton from "@/app/components/Forminputs/SubmitButton";
import { generateSlug } from "@/lib/generateSlug";
import ToggleInput from "@/components/ToggleInput";

export default function NewBanner() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const { register, reset, watch, handleSubmit } = useForm({
    defaultValues: { isActive: true },
  });

  const isActive = watch("isActive");

  const onSubmit = async (data) => {
    if (!image) {
      alert("Please upload a banner image.");
      return;
    }

    try {
      const buffer = await image.arrayBuffer();
      const fileName = `${Date.now()}-${image.name}`;

      // ✅ Use the banner uploader wrapper
      const imageUrl = await bannerImageUploader(buffer, fileName, image.type);

      const slug = generateSlug(data.title);

      const payload = {
        ...data,
        slug,
        imageUrl,
        isActive,
      };

      await makePostRequest(setLoading, "api/banners", payload, "Banner", reset);

      reset();
      setImage(null);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Image upload failed.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-md shadow-md bg-white dark:bg-[#0D172A] transition-colors">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Banner Title */}
        <div>
          <label className="block text-gray-800 dark:text-white font-semibold mb-1">
            Banner Title
          </label>
          <input
            type="text"
            placeholder="Enter banner title"
            {...register("title", { required: true })}
            className="w-full px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-600 
            text-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Banner Link */}
        <div>
          <label className="block text-gray-800 dark:text-white font-semibold mb-1">
            Banner Link
          </label>
          <input
            type="text"
            placeholder="Enter banner link"
            {...register("link", { required: true })}
            className="w-full px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-600 
            text-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Banner Image */}
        <div>
          <label className="block text-gray-800 dark:text-white font-semibold mb-1">
            Banner Image
          </label>
          <ImageUpload onUpload={setImage} resetTrigger={image === null} />
        </div>

        {/* Publish Toggle */}
        <ToggleInput
          label="Publish your Banner"
          name="isActive"
          trueTitle="Active"
          falseTitle="Draft"
          register={register}
        />

        {/* Submit */}
        <div className="flex justify-end">
          <SubmitButton
            isLoading={loading}
            buttonTitle="Create Banner"
            loadingButtonTitle="Creating Banner please wait..."
          />
        </div>
      </form>
    </div>
  );
}
