import { Order } from "@/model/order";
import mongoose from "mongoose";

export async function GET(){
    await mongoose.connect(process.env.MONGODB_URI)
    const data=await Order.find({});
    console.log(data);
    return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" },})
}