"use client";
import React, { useEffect, useState } from "react";
import Layout from "../component/Layout";
import Title from "../component/Title";
import axios from "axios";

const Page = () => {
  const [orders, setorders] = useState([]);
  const [updating, setUpdating] = useState({});

  useEffect(() => {
    async function getdata() {
      const { data } = await axios.get("/api/orders");
      setorders(data);
    }
    getdata();
  }, []);

  const handleStatusChange = async (orderId) => {
    setUpdating((prev) => ({ ...prev, [orderId]: true }));
    try {
      await axios.post("/api/orders/changestatus", {
        id: orderId,
        status: "completed",
      });
      setorders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? { ...order, order_status: "completed" }
            : order
        )
      );
    } catch (err) {
      console.log("error")
    }
    setUpdating((prev) => ({ ...prev, [orderId]: false }));
  };

  return (
    <Layout>
      <Title>Orders</Title>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white rounded-lg shadow text-sm md:text-base">
          <thead>
            <tr className="bg-blue-200 text-blue-900">
              <th className="py-3 px-2 md:px-4 text-left whitespace-nowrap">Order Id</th>
              <th className="py-3 px-2 md:px-4 text-left whitespace-nowrap">Order Status</th>
              <th className="py-3 px-2 md:px-4 text-left whitespace-nowrap">Receipt</th>
              <th className="py-3 px-2 md:px-4 text-left whitespace-nowrap">Paid</th>
              <th className="py-3 px-2 md:px-4 text-left whitespace-nowrap">Date</th>
              <th className="py-3 px-2 md:px-4 text-left whitespace-nowrap">Products</th>
              <th className="py-3 px-2 md:px-4 text-left whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 &&
              orders.map((order, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-blue-50 transition-colors"
                >
                  <td className="py-2 px-2 md:px-4 break-all">{order._id}</td>
                  <td className="py-2 px-2 md:px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.order_status === "completed"
                          ? "bg-green-200 text-green-900"
                          : "bg-yellow-200 text-yellow-900"
                      }`}
                    >
                      {order.order_status}
                    </span>
                  </td>
                  <td className="py-2 px-2 md:px-4">
                    <span className="block font-semibold">{order.name}</span>
                    <span className="text-xs text-gray-700 block">
                      <b>Address:</b> {order.streetaddress},{order.city},
                      {order.country},{order.pincode}
                      <br />
                      <b>Mobile-number:</b> {order.phonenumber}
                    </span>
                  </td>
                  <td className="py-2 px-2 md:px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.paid
                          ? "bg-green-300 text-green-900"
                          : "bg-red-200 text-red-900"
                      }`}
                    >
                      {order.paid ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="py-2 px-2 md:px-4 whitespace-nowrap">
                    {order.createdAt.replace("T", " ").substring(0, 19)}
                  </td>
                  <td className="py-2 px-2 md:px-4">
                    {order.lineitems.map((e, idx) => (
                      <div key={idx} className="text-xs md:text-sm">
                        {JSON.stringify(e.quantity)} x{" "}
                        {e.price_data.product_data.name}
                        <br />
                      </div>
                    ))}
                  </td>
                  <td className="py-2 px-2 md:px-4">
                    {order.order_status === "pending" && !updating[order._id] && (
                      <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition font-semibold text-xs md:text-sm shadow w-full md:w-auto"
                        onClick={() => handleStatusChange(order._id)}
                      >
                        Mark as Completed
                      </button>
                    )}
                    {updating[order._id] && (
                      <span className="text-blue-400 text-xs">Updating...</span>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Page;
