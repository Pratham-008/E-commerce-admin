import mongoose from "mongoose";
import { Products } from "@/model/product";


export async function GET(req,{params}) {
  const {id}=await params;

  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to database");
  } catch (error) {
    console.log("Error connecting to database");
  }

  const products = await Products.deleteOne({"_id":id});

  
  return new Response(JSON.stringify({ message: "Success"}), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}