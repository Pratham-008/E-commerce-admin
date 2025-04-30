"use client";
import { React, useEffect, useState } from "react";
import Layout from "@/app/component/Layout";
import axios from "axios";
import { useParams } from "next/navigation";
import Productform from "@/app/component/Productform";

const Page = () => {
  const [data, setdata] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/api/products/${id[0]}`)
      .then((response) => {
        setdata(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the product data!", error);
      });
  }, [id]);
  if (data != null) {
    return (
      <Layout>
        <h2>Edit Form</h2>
        <Productform productdata={data} />
      </Layout>
    );
  } else {
    {
      console.log("loding");
    }
    <p>loding</p>;
  }
};

export default Page;
