"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Layout from "../component/Layout";
import Image from "next/image";
import axios from "axios";

const Page = () => {
  const { data: session } = useSession();
  const userImage = session?.user?.image;

  const [orderStats, setOrderStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
  });

  useEffect(() => {
    // Fetch order stats from your backend API
    const fetchOrders = async () => {
      try {
        const res = await axios.get("/api/orders");
        const orders = res.data || [];
        const completed = orders.filter((o) => o.order_status === "completed").length;
        const pending = orders.filter((o) => o.order_status == "pending").length;
        setOrderStats({
          total: orders.length,
          completed,
          pending,
        });
      } catch (err) {
        // Handle error or show fallback
        setOrderStats({ total: 0, completed: 0, pending: 0 });
      }
    };
    fetchOrders();
  }, []);

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <h2 className="flex items-center text-2xl font-semibold">
          Hey,{" "}
          <span className="ml-2 text-blue-700">{session?.user?.name}</span>
        </h2>
        <div className="flex bg-gray-200 gap-2 rounded-full overflow-hidden items-center px-3 py-1 shadow">
          {userImage && (
            <Image
              src={userImage}
              alt="profile"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full"
            />
          )}
          <span className="px-2 font-medium">{session?.user?.name}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-gray-500 text-lg mb-2">Total Orders</span>
          <span className="text-3xl font-bold text-blue-700">
            {orderStats.total}
          </span>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-gray-500 text-lg mb-2">Completed Orders</span>
          <span className="text-3xl font-bold text-green-600">
            {orderStats.completed}
          </span>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-gray-500 text-lg mb-2">Pending Orders</span>
          <span className="text-3xl font-bold text-yellow-500">
            {orderStats.pending}
          </span>
        </div>
      </div>
    </Layout>
  );
};

export default Page;
