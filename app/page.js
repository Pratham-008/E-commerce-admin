"use client";
import { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Navbar from "./component/Navbar";
import { useRouter } from "next/navigation";
import Layout from "./component/Layout";

export default function Page({ children }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/home");
    }
  }, [status, router]);

  return (
    <div className="conatiner text-center mx-auto items-center w-screen justify-center flex  h-screen bg-gray-900">
      <div className="bg-gray-800 p-3 text-center rounded-lg">
        <button
          className="bg-blue-950 m-3 text-white rounded-lg p-3 cursor-pointer"
          onClick={() => signIn("github")}
        >
          Sign in using Github
        </button>
        <br />
        <button
          className="bg-blue-950 m-3 text-white rounded-lg p-3 cursor-pointer"
          onClick={() => signIn("github")}
        >
          Sign in using Google
        </button>
      </div>
    </div>
  );
}
