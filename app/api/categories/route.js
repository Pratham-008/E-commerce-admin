import mongoose from "mongoose";
import { categories } from "@/model/categories";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("db is connected");
  } catch (error) {
    console.log("error in database connection");
  }
  const { name, parent, properties } = body;
  console.log(parent);
  if (parent == "0") {
    const resp = await categories.create({ name, properties: properties });
    console.log(resp);
  } else {
    const resp = await categories.create({
      name,
      parent,
      properties: properties,
    });
    console.log(resp);
  }
  return new Response(JSON.stringify({ message: "Success" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function GET(req) {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("db is connected");
  } catch (error) {
    console.log("error in database connection");
  }

  const data = await categories.find().populate("parent");
  return NextResponse.json(data, { status: 200 });
}

export async function PUT(req) {
  const body = await req.json();
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("db is connected");
  } catch (error) {
    console.log("error in database connection");
  }
  const { name, parent, _id, properties } = body;
  if (parent == "0") {
    const resp = await categories.updateOne(
      { _id: _id },
      { $set: { name: name, parent: null, properties: properties } }
    );
    console.log(resp);
  } else {
    const resp = await categories.updateOne(
      { _id: _id },
      { $set: { name: name, parent: parent, properties: properties } }
    );
    console.log(resp);
  }

  return new Response(JSON.stringify({ message: "Success" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
