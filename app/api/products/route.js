import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Products } from "@/model/product";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const formData = await req.formData();

    const name = formData.get("name");
    const description = formData.get("description");
    const price = formData.get("price");
    const images = formData.getAll("images");
    const category = formData.get("category");
    const properties = formData.get("properties");

    if (!name || !description || !price || images.length === 0) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const imageUrls = await Promise.all(
      images.map(async (image) => {
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);

        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.v2.uploader.upload_stream(
            { resource_type: "image" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url);
            }
          );
          uploadStream.end(buffer);
        });
      })
    );

    console.log({ name, description, price, imageUrls });
    if (category == "0") {
      const newProduct = await Products.collection.insertOne({
        name,
        description,
        price,
        images: imageUrls,
        category: null,
      });
    } else {
      const newProduct = await Products.collection.insertOne({
        name,
        description,
        price,
        images: imageUrls,
        category: category,
        properties: JSON.parse(properties),
      });
    }
    return NextResponse.json(
      {
        message: "Product added successfully",
        data: { name, description, price, images: imageUrls },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const products = await Products.find({});
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
