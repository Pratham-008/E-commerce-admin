import mongoose from "mongoose";
import { Order } from "@/model/order";

export async function POST(req){
    
    const { id, status } = await req.json();
    console.log("Received order_id:", id);
    console.log("Received order_status:", status);
    await mongoose.connect(process.env.MONGODB_URI);
    const data=await Order.findOneAndUpdate({_id: id},{order_status: "completed"}, {new: true});
    console.log("Order status updated:", data);
    return new Response(JSON.stringify("Successfully updated order status"), {status:200});
    
}