"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Layout from "../component/Layout";
const page = () => {
  const { data: session } = useSession();

  return (
    <Layout>
      <div className="flex justify-between">
        <h2 className="flex items-center">
          Hey,<b>{session?.user?.name}</b>
        </h2>
        <div className="flex bg-gray-400 gap-1 rounded-full overflow-hidden items-center ">
          <img src={session?.user?.image} alt="profile" className="h-10" />
          <span className="px-2">{session?.user?.name}</span>
        </div>
      </div>
    </Layout>
  );

};

export default page;
