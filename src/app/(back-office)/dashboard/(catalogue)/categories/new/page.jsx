"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { makePostRequest } from "@/lib/apiRequest";
import SubmitButton from "@/app/components/Forminputs/SubmitButton";
import { generateSlug } from "@/lib/generateSlug";
import ToggleInput from "@/components/ToggleInput";

// 👇 Use the new wrapper
// import { categoryImageUploader } from "@/lib/uploaders";
import CategoryImageUploader from "@/components/backoffice/uploaders/CategoryImageUploader";

export default function NewCategory() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const markets = [
    { id: 1, title: "Sproutes Farmers Market" },
    { id: 2, title: "Cabbage Farmers Market" },
    { id: 3, title: "Carrots Farmers Market" },
    { id: 4, title: "Broccoli Farmers Market" },
  ];

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    defaultValues: {
      isActive: true,
    },
  });

  const isActive = watch("isActive");

  const onSubmit = async (data) => {
    if (!image) {
      alert("Please upload an image.");
      return;
    }

    try {
      const buffer = await image.arrayBuffer();
      const fileName = `${Date.now()}-${image.name}`;
      const imageUrl = await categoryImageUploader(buffer, fileName, image.type);

      const slug = generateSlug(data.title);
      const payload = {
        ...data,
        slug,
        imageUrl,
        isActive,
      };

      console.log(payload, "payload");

      await makePostRequest(
        setLoading,
        "api/categories",
        payload,
        "Category",
        reset
      );

      reset();
      setImage(null);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Image upload failed.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 rounded-md shadow-md bg-white dark:bg-[#0D172A] transition-colors">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title + Market Select */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-800 dark:text-white font-semibold mb-1">
              Category Title
            </label>
            <input
              type="text"
              placeholder="Type the value"
              {...register("title", { required: true })}
              className="w-full px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-gray-800 dark:text-white font-semibold mb-1">
              Select Markets
            </label>
            <select
              {...register("marketIds", { required: true })}
              className="w-full px-4 py-2 
                         bg-transparent 
                         border border-gray-300 dark:border-gray-600 
                         text-gray-800 dark:text-white 
                         rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-orange-500
                         dark:bg-[#1E293B]"
            >
              <option value="" className="bg-white dark:bg-[#1E293B] dark:text-white">
                -- Select Market --
              </option>
              {markets.map((market) => (
                <option
                  key={market.id}
                  value={market.id}
                  className="bg-white dark:bg-[#1E293B] dark:text-white"
                >
                  {market.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-800 dark:text-white font-semibold mb-1">
            Category Description
          </label>
          <textarea
            placeholder="Type the value"
            rows={4}
            {...register("description", { required: true })}
            className="w-full px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-800 dark:text-white font-semibold mb-1">
            Category Image
          </label>
          <CategoryImageUploader
            onUpload={setImage}
            resetTrigger={image === null}
          />

          <ToggleInput
            label="Publish your Category"
            name="isActive"
            trueTitle="Active"
            falseTitle="Draft"
            register={register}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <SubmitButton
            isLoading={loading}
            buttonTitle="Create Category"
            loadingButtonTitle="Creating Category please wait..."
          />
        </div>
      </form>
    </div>
  );
}
