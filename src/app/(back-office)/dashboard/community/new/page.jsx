"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { uploadToS3 } from "@/lib/s3";
import ImageUpload from "@/app/components/backoffice/ImageUpload";
import SubmitButton from "@/app/components/Forminputs/SubmitButton";
import { generateSlug } from "@/lib/generateSlug";
import ToggleInput from "@/components/ToggleInput";


export default function NewTraining() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const categories = [
    { id: 1, title: "Category 1" },
    { id: 2, title: "Category 2" },
    { id: 3, title: "Category 3" },
  ];

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    defaultValues: {isActive: true}
  });
  const isActive = watch("isActive")

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

        {/* Thumbnail Upload */}
        <div>
          <label className="block text-gray-800 dark:text-white font-semibold mb-1">
            Training Thumbnail
          </label>
          <ImageUpload onUpload={setImage} resetTrigger={image === null} />

                  <ToggleInput
            label="Publish your Category"
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
