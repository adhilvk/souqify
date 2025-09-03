"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { marketLogoUploader } from "@/lib/uploaders";
import ImageUpload from "@/app/components/backoffice/ImageUpload";
import { makePostRequest } from "@/lib/apiRequest";
import SubmitButton from "@/app/components/Forminputs/SubmitButton";
import { generateSlug } from "@/lib/generateSlug";
import ToggleInput from "@/components/ToggleInput";

export default function NewMarket() {
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);

  const { register, reset, watch, handleSubmit } = useForm({
    defaultValues: { isActive: true },
  });

  const isActive = watch("isActive");

  const onSubmit = async (data) => {
    if (!logo) {
      alert("Please upload a market logo.");
      return;
    }

    try {
      const buffer = await logo.arrayBuffer();
      const fileName = `${Date.now()}-${logo.name}`;

      // ✅ Use the marketLogoUploader wrapper
      const logoUrl = await marketLogoUploader(buffer, fileName, logo.type);

      const slug = generateSlug(data.title);

      const payload = {
        ...data,
        slug,
        logoUrl,
        isActive,
      };

      await makePostRequest(setLoading, "api/markets", payload, "Market", reset);

      reset();
      setLogo(null);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Logo upload failed.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-md shadow-md bg-white dark:bg-[#0D172A] transition-colors">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Market Title */}
        <div>
          <label className="block text-gray-800 dark:text-white font-semibold mb-1">
            Market Title
          </label>
          <input
            type="text"
            placeholder="Enter market title"
            {...register("title", { required: true })}
            className="w-full px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-600 
            text-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Market Logo */}
        <div>
          <label className="block text-gray-800 dark:text-white font-semibold mb-1">
            Market Logo
          </label>
          <ImageUpload onUpload={setLogo} resetTrigger={logo === null} />
        </div>

        {/* Market Description */}
        <div>
          <label className="block text-gray-800 dark:text-white font-semibold mb-1">
            Market Description
          </label>
          <textarea
            placeholder="Enter market description"
            {...register("description", { required: true })}
            className="w-full px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-600
            text-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            rows={4}
          />
        </div>

        {/* Market Status Toggle */}
        <ToggleInput
          label="Market Status"
          name="isActive"
          trueTitle="Active"
          falseTitle="Draft"
          register={register}
        />

        {/* Submit Button */}
        <div className="flex justify-end">
          <SubmitButton
            isLoading={loading}
            buttonTitle="Create Market"
            loadingButtonTitle="Creating Market please wait..."
          />
        </div>
      </form>
    </div>
  );
}
