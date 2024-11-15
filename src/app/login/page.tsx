"use client";
import React, { useState } from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/login", user);
      if (response.status === 200 && response.data.user) {
        login(response.data.user);
        toast.success("Login successful");
        router.push("/start");
      } else {
        toast.error("Failed to retrieve valid user data");
      }
    } catch (error: any) {
      toast.error("Invalid credentials", error);
    }
  };
  return (
    <div
      className="relative flex flex-col xl:top-[21.75%] xl:h-[56.5%] max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input 
    bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white dark:bg-gradient-to-r dark:from-black dark:via-black dark:to-black dark:text-white"
    >
      <h2 className="font-bold xl:text-3xl text-white dark:text-neutral-200">
        Welcome to QuizApp
      </h2>
      <p className="text-white xl:text-xl max-w-sm mt-2 dark:text-neutral-300">
        Welcome to QuizApp! Log in to access exciting quizzes and track your
        progress.
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email" className="text-white text-xl">
            Email Address
          </Label>
          <Input
            id="email"
            value={user.email}
            placeholder="projectmayhem@fc.com"
            type="email"
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
            required
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password" className="text-white text-xl">
            Password
          </Label>
          <Input
            id="password"
            value={user.password}
            placeholder="••••••••"
            type="password"
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
            required
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] text-xl"
          type="submit"
        >
          Login &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button className="relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]">
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-blue-500">
                Signup
              </Link>
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
