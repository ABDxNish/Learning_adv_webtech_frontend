"use client";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const signUpSchema = z
  .object({
    name: z
      .string()
      .min(3, "Full Name must contain at least 3 characters")
      .regex(/^[A-Za-z ]+$/, "Name must not contain special characters"),
    uname: z.string().min(4, "Username must contain at least 4 characters"),
    pass: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .regex(/\d/, "Password must contain at least one number"),
    confirmPass: z.string(),
    add: z.string().min(3, "Address must be at least 3 characters"),
    myfile: z
      .any()
      .refine((file) => file instanceof File, "Please select a file")
      .refine(
        (file: File) =>
          ["image/jpeg", "image/png", "image/webp"].includes(file.type),
        "Only jpg, png, or webp images allowed"
      )
      .refine(
        (file: File) => file.size <= 5 * 1024 * 1024,
        "File size must be less than 5MB"
      ),
  })
  .refine((data) => data.pass === data.confirmPass, {
    message: "Passwords didn't match",
    path: ["confirmPass"],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function Signup() {
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    console.log(" Valid Data:", data);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("uname", data.uname);
    formData.append("pass", data.pass);
    formData.append("confirmPass", data.confirmPass);
    formData.append("myfile", data.myfile);
    formData.append("add", data.add);

    try {
      const response = await fetch("http://localhost:3001/adminP/addAdminM", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      console.log("Backend Response:", result);
      alert("Signup successful!");
    } catch (err) {
      console.error(err);
      alert("Signup failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Signup Page
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
          className="space-y-4"
        >
          {/* Full Name */}
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              type="text"
              {...register("name")}
              className="textbox"
              placeholder="Enter full name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Username */}
          <div>
            <label className="block font-medium mb-1">Username</label>
            <input
              type="text"
              {...register("uname")}
              className="textbox"
              placeholder="Enter username"
            />
            {errors.uname && (
              <p className="text-red-500 text-sm mt-1">{errors.uname.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              {...register("pass")}
              className="textbox"
              placeholder="Enter password"
            />
            {errors.pass && (
              <p className="text-red-500 text-sm mt-1">{errors.pass.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPass")}
              className="textbox"
              placeholder="Re-enter password"
            />
            {errors.confirmPass && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPass.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block font-medium mb-1">Address</label>
            <input
              type="text"
              {...register("add")}
              className="textbox"
              placeholder="Enter address"
            />
            {errors.add && (
              <p className="text-red-500 text-sm mt-1">{errors.add.message}</p>
            )}
          </div>

          {/* File Upload */}
          <div>
            <label className="block font-medium mb-1">Upload Photo</label>
            <input
              type="file"
              accept="image/*"
              className="w-full text-sm text-blue-700 file:mr-4 file:py-2 file:px-4 
                         file:rounded-lg file:border-0 file:text-sm file:font-semibold
                         file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setValue("myfile", file, { shouldValidate: true });
                if (file) setPreview(URL.createObjectURL(file));
              }}
            />
            {errors.myfile && (
              <p className="text-red-500 text-sm mt-1">
                {errors.myfile.message as string}
              </p>
            )}
          </div>

          {/* Preview */}
          {preview && (
            <div className="mt-3">
              <img
                src={preview}
                alt="Preview"
                className="w-28 h-28 rounded-lg object-cover border border-blue-300"
              />
            </div>
          )}

          {/* Submit Button */}
          <button type="submit" className="btn-primary w-full">
            Signup
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-4">
          <Link href="/HomePage/LogIn">
            <button className="text-blue-600 hover:underline cursor-pointer">
              Already have an account? Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
