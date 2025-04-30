"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Layout from "../component/Layout";
import Image from "next/image";
const Page = () => {
  const { data: session } = useSession();
  const userImage = session?.user?.image;

  return (
    <Layout>
      <div className="flex justify-between">
        <h2 className="flex items-center">
          Hey,<b>{session?.user?.name}</b>
        </h2>
        <div className="flex bg-gray-400 gap-1 rounded-full overflow-hidden items-center ">
          {userImage && (
            <Image
              src={userImage}
              alt="profile"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full"
            />
          )}
          <span className="px-2">{session?.user?.name}</span>
        </div>
      </div>
    </Layout>
  );
};

export default Page;
