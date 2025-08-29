"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { uploadToS3 } from "@/lib/s3";
import ImageUpload from "@/app/components/backoffice/ImageUpload";
import { makePostRequest } from "@/lib/apiRequest";
import SubmitButton from "@/app/components/Forminputs/SubmitButton";
import { generateSlug } from "@/lib/generateSlug";
import { ArrayItemsInput } from "@/app/components/Forminputs/ArrayItemsInput";
import ToggleInput from "@/components/ToggleInput";

export default function NewProduct({
  label,
  name,
  trueTitle,
  falseTitle,
  className = "sm:col-span-2 flex flex-wrap",
}) {
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const categories = [
    { id: 1, title: "Category 1" },
    { id: 2, title: "Category 2" },
    { id: 3, title: "Category 3" },
  ];
  const farmers = [
    { id: 1, title: "Farmer 1" },
    { id: 2, title: "Farmer 2" },
    { id: 3, title: "Farmer 3" },
  ];

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isActive: true,
    },
  });

  // Watch the toggle
  const isActive = watch("isActive");
  console.log(isActive)

  const onSubmit = async (data) => {
    if (!image) {
      alert("Please upload an image.");
      return;
    }

    try {
      const fileName = `products/${Date.now()}-${image.name}`;
      const buffer = await image.arrayBuffer();
      const imageUrl = await uploadToS3(buffer, fileName, image.type);

      const slug = generateSlug(data.title);

      const payload = {
        ...data,
        slug,
        imageUrl,
        tags,
      };

      await makePostRequest(
        setLoading,
        "api/products",
        payload,
        "Product",
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
    <div className="max-w-4xl mx-auto p-6 rounded-md shadow-md bg-white dark:bg-[#0D172A] transition-colors">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-gray-800 dark:text-white font-semibold mb-1">
            Product Title
          </label>
          <input
            type="text"
            placeholder="Enter product title"
            {...register("title", { required: true })}
            className="w-full px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-600 
            text-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* SKU & Barcode */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* SKU */}
          <div>
            <label className="block text-gray-800 dark:text-white font-semibold mb-1">
              Product SKU
            </label>
            <input
              type="text"
              placeholder="Enter product SKU"
              {...register("sku", { required: true })}
              className="w-full px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-600 
              text-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Barcode */}
          <div>
            <label className="block text-gray-800 dark:text-white font-semibold mb-1">
              Product Barcode
            </label>
            <input
              type="text"
              placeholder="Enter product barcode"
              {...register("barcode", { required: true })}
              className="w-full px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-600 
              text-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Price & Sale Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Price */}
          <div>
            <label className="block text-gray-800 dark:text-white font-semibold mb-1">
              Product Price (Before Discount)
            </label>
            <input
              type="number"
              placeholder="Enter original price"
              {...register("price", { required: true })}
              className="w-full px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-600 
              text-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Sale Price */}
          <div>
            <label className="block text-gray-800 dark:text-white font-semibold mb-1">
              Product Sale Price (Discounted)
            </label>
            <input
              type="number"
              placeholder="Enter discounted price"
              {...register("salePrice", { required: true })}
              className="w-full px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-600 
              text-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Category & Farmer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category */}
          <div>
            <label className="block text-gray-800 dark:text-white font-semibold mb-1">
              Select Category
            </label>
            <select
              {...register("categoryId", { required: true })}
              className="w-full px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-600 
              text-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-[#1E293B]"
            >
              <option value="">-- Select Category --</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          {/* Farmer */}
          <div>
            <label className="block text-gray-800 dark:text-white font-semibold mb-1">
              Select Farmer
            </label>
            <select
              {...register("farmerId", { required: true })}
              className="w-full px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-600 
              text-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-[#1E293B]"
            >
              <option value="">-- Select Farmer --</option>
              {farmers.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-800 dark:text-white font-semibold mb-1">
            Product Image
          </label>
          <ImageUpload onUpload={setImage} resetTrigger={image === null} />
        </div>

        {/* Tags */}
        <ArrayItemsInput setItems={setTags} items={tags} itemTitle="Tag" />

        {/* Description */}
        <div>
          <label className="block text-gray-800 dark:text-white font-semibold mb-1">
            Product Description
          </label>
          <textarea
            placeholder="Enter product description"
            rows={4}
            {...register("description", { required: true })}
            className="w-full px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-600 
            text-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <ToggleInput
          label="Publish your Product"
          name="isActive"
          trueTitle="Active"
          falseTitle="Draft"
          register={register}
        />

        {/* Submit */}
        <div className="flex justify-end">
          <SubmitButton
            isLoading={loading}
            buttonTitle="Create Product"
            loadingButtonTitle="Creating Product please wait..."
          />
        </div>
      </form>
    </div>
  );
}
