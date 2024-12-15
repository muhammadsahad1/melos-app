// /src/components/forms/SignupFormDemo.tsx
"use client";

import React, { useState } from "react";
import { Label } from "../ui/label"; // Assuming this component exists in /ui
import { Input } from "../ui/input"; // Assuming this component exists in /ui
import { cn } from "@/lib/utils"; // Assuming this utility function exists
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { useForm, SubmitHandler } from "react-hook-form";
import api from "@/lib/api";
import { IRegister } from "@/app/types/user";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

export const SignupFormDemo = () => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<IRegister>();
    // const router = useRouter();

    const onSubmit: SubmitHandler<IRegister> = async (data) => {
        try {
            setLoading(true);
            const response = await api.post("/auth", { type: "register", username: data.username, email: data.email, password: data.password });

            if (response.data.message === "Registration successful") {
                toast.success("Registration successful!");
                // router.push("/home");  // Redirect to home after successful registration
            } else {
                toast.error(response.data.error);
            }
            setLoading(false);
        } catch (error) {
            toast.error("An error occurred during registration.");
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-zinc-950">
            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                Welcome to Melos
            </h2>
            <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                Register to melos and start connecting with others!
            </p>

            <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
                {/* Username Field */}
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                    <LabelInputContainer>
                        <Label htmlFor="username">Name</Label>
                        <Input
                            id="username"
                            placeholder="username"
                            type="text"
                            {...register("username", { required: "Username is required", minLength: { value: 3, message: "Username must be at least 3 characters" } })}
                        />
                        {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
                    </LabelInputContainer>
                </div>

                {/* Email Field */}
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        id="email"
                        placeholder="useremail@gmail.com"
                        type="email"
                        {...register("email", { 
                            required: "Email is required", 
                            pattern: { value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, message: "Invalid email address" } 
                        })}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </LabelInputContainer>

                {/* Password Field */}
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        placeholder="••••••••"
                        type="password"
                        {...register("password", { 
                            required: "Password is required", 
                            minLength: { value: 6, message: "Password must be at least 6 characters" } 
                        })}
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </LabelInputContainer>

                {/* Submit Button */}
                <button
                    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Sign up →"}
                    <BottomGradient />
                </button>

                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

                {/* Social Media Buttons */}
                <div className="flex flex-col space-y-4">
                    <button
                        className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                        type="button"
                    >
                        <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                        <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                            GitHub
                        </span>
                        <BottomGradient />
                    </button>
                    <button
                        className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                        type="button"
                    >
                        <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                        <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                            Google
                        </span>
                        <BottomGradient />
                    </button>
                </div>
            </form>
        </div>
    );
};

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
