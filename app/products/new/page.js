"use client";
import Layout from "@/app/component/Layout";
import Productform from "@/app/component/Productform";

const page = () => {
  const data={_id:null,name:null,description:null,price:null}
  
  return (
    <Layout>
      <h2>New Product</h2>
      <Productform productdata={data}/>
    </Layout>
  );
};

export default page;
