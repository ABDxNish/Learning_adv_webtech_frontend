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


// TypeScript type

type SignUpFormData = z.infer<typeof signUpSchema>;


// Component

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
    console.log("✅ Valid Data:", data);

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
    <>
      <h1>Signup Page</h1>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <table>
          <tbody>
            <tr>
              <td>Full Name:</td>
              <td>
                <input type="text" {...register("name")} />
                {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
              </td>
            </tr>

            <tr>
              <td>Username:</td>
              <td>
                <input type="text" {...register("uname")} />
                {errors.uname && <p style={{ color: "red" }}>{errors.uname.message}</p>}
              </td>
            </tr>

            <tr>
              <td>Password:</td>
              <td>
                <input type="password" {...register("pass")} />
                {errors.pass && <p style={{ color: "red" }}>{errors.pass.message}</p>}
              </td>
            </tr>

            <tr>
              <td>Confirm Password:</td>
              <td>
                <input type="password" {...register("confirmPass")} />
                {errors.confirmPass && (
                  <p style={{ color: "red" }}>{errors.confirmPass.message}</p>
                )}
              </td>
            </tr>
          <tr>
  <td>Address:</td>
  <td>
    <input type="text" {...register("add")} />
    {errors.add && <p style={{ color: "red" }}>{errors.add.message}</p>}
  </td>
</tr>

            <tr>
              <td>Upload Photo:</td>
              <td>
                <input  type="file"  accept="image/*"onChange={(e) => {
    const file = e.target.files?.[0] || null; 
    setValue("myfile", file, { shouldValidate: true }); 
    if (file) setPreview(URL.createObjectURL(file)); 
  }}
/>

                {errors.myfile && <p style={{ color: "red" }}>{errors.myfile.message}</p>}
              </td>
            </tr>

            {preview && (
              <tr>
                <td></td>
                <td>
                  <img src={preview} alt="Preview" width={120} />
                </td>
              </tr>
            )}

            <tr>
              <td></td>
              <td>
                <button type="submit">Signup</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      <br />
      <Link href="/HomePage/LogIn">
        <button>Already have an account? Login</button>
      </Link>
    </>
  );
}
