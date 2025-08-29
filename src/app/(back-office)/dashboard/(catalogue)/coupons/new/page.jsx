"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { makePostRequest } from "@/lib/apiRequest";
import SubmitButton from "@/app/components/Forminputs/SubmitButton";
import { generateSlug } from "@/lib/generateSlug";
import { generateCouponCode } from "@/lib/generateCouponCode";

export default function NewCoupon() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Generate coupon code & slug
      const couponCode = generateCouponCode(data.couponTitle, data.expiryDate);
      const slug = generateSlug(data.couponTitle);

      // Merge into full payload
      const payload = {
        ...data,
        couponCode,
        slug,
      };

      console.log("Payload being sent:", payload);

      // Send payload instead of plain data
      await makePostRequest(
        setLoading,
        "api/coupons",
        payload,
        "Coupon",
        reset
      );

      reset(); // clear form after success
    } catch (error) {
      console.error("Error creating coupon:", error);
      alert("Something went wrong while creating the coupon.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 rounded-md shadow-md bg-white dark:bg-[#0D172A] transition-colors">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Coupon Title */}
        <div>
          <label className="block text-gray-800 dark:text-white font-semibold mb-1">
            Coupon Title
          </label>
          <input
            type="text"
            placeholder="Enter coupon title"
            {...register("couponTitle", { required: "Coupon title is required" })}
            className="w-full px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors.couponTitle && (
            <p className="text-red-500 text-sm mt-1">
              {errors.couponTitle.message}
            </p>
          )}
        </div>

        {/* Expiry Date */}
        <div>
          <label className="block text-gray-800 dark:text-white font-semibold mb-1">
            Expiry Date
          </label>
          <input
            type="date"
            {...register("expiryDate", { required: "Expiry date is required" })}
            className="w-full px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors.expiryDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.expiryDate.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <SubmitButton
            isLoading={loading}
            buttonTitle="Create Coupon"
            loadingButtonTitle="Creating Coupon please wait..."
          />
        </div>
      </form>
    </div>
  );
}
