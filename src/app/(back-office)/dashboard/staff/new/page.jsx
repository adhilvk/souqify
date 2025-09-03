"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { makePostRequest } from "@/lib/apiRequest";
import SubmitButton from "@/app/components/Forminputs/SubmitButton";

export default function NewStaff() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    reset,
    watch,
    handleSubmit,
  } = useForm({
    defaultValues: {
      isActive: true,
    },
  });

  const isActive = watch("isActive");

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        isActive,
      };

      await makePostRequest(
        setLoading,
        "api/staff",
        payload,
        "staff",
        reset
      );

      reset();
    } catch (error) {
      console.error("Save failed:", error);
      alert("Failed to create staff.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 rounded-md shadow-md bg-white dark:bg-[#0D172A] transition-colors">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Full Name Row (full width) */}
        <div>
          <label className="block text-gray-800 dark:text-white font-semibold mb-1">
            Staff Full Name
          </label>
          <input
            type="text"
            placeholder="Type the staff's full name"
            {...register("fullName", { required: true })}
            className="w-full px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-600
            text-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
        </div>

        {/* Password + Phone side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-800 dark:text-white font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter a password"
              {...register("password", { required: true })}
              className="w-full px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-600
              text-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
          </div>

           <div>
            <label className="block text-gray-800 dark:text-white font-semibold mb-1">
              Staff's Email Address
            </label>
            <input
              type="email"
              placeholder="Type the staff's email address"
              {...register("email", { required: true })}
              className="w-full px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-600
              text-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
          </div>

          <div>
            <label className="block text-gray-800 dark:text-white font-semibold mb-1">
              Staff's Phone
            </label>
            <input
              type="text"
              placeholder="Type the staff's phone"
              {...register("phone", { required: true })}
              className="w-full px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-600
              text-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
          </div>
  <div>
            <label className="block text-gray-800 dark:text-white font-semibold mb-1">
              Staff's Physical Address
            </label>
            <input
              type="text"
              placeholder="Type the staff's physical address"
              {...register("address", { required: true })}
              className="w-full px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-600
              text-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
          </div>

        </div>


        {/* Notes */}
        <div>
          <label className="block text-gray-800 dark:text-white font-semibold mb-1">
            Notes
          </label>
          <textarea
            placeholder="Type the notes"
            {...register("notes")}
            className="w-full px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-600
            text-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
            rows={3}
          />
        </div>

        {/* Status + Submit */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <SubmitButton
            isLoading={loading}
            buttonTitle=" Create Staff"
            loadingButtonTitle="Creating Staff please wait..."
          />
        </div>
      </form>
    </div>
  );
}
