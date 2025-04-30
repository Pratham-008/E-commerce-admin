"use client";
import React from "react";
import Layout from "@/app/component/Layout";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

const page = ({ params }) => {
  const { id } = useParams();
  const router = useRouter();
  const goback = () => {
    router.back();
  };

  const gofordelete = () => {
    console.log("/api/products/delete/" + id);
    axios
      .get("/api/products/delete/" + id)
      .then((response) => {
        router.back();
      })
      .catch((error) => {
        console.error("There was an error fetching the product data!", error);
      });
  };

  return (
    <Layout>
        <h1 className="text-2xl font-bold justify-center flex">
          Do you really want to delete this product
        </h1>
        <div className="justify-center flex gap-4">
          <button className="px-3 py-2 font-bold bg-green-500 rounded-lg text-black cursor-pointer  mt-4" onClick={() => gofordelete()}>
            Yes
          </button>
          <button className="px-3 py-2 font-bold  bg-red-500 text-white rounded-lg cursor-pointer  mt-4" onClick={() => goback()}>
            No
          </button>
        </div>
    </Layout>
  );
};

export default page;
