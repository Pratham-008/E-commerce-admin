import mongoose from "mongoose";
import { Products } from "@/model/product";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(req, { params }) {
  const { id } = await params;

  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to database");
  } catch (error) {
    console.log("Error connecting to database");
  }
  const products = await Products.findOne({ _id: id });
  return new Response(JSON.stringify(products), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req, { params }) {
  const formData = await req.formData();
  const _id = formData.get("_id");
  const name = formData.get("name");
  const description = formData.get("description");
  const price = formData.get("price");
  const images = formData.getAll("images");
  const existingimages = formData.getAll("existingimages");
  const category = formData.get("category");
  const properties = formData.get("properties");
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to database");
  } catch (error) {
    console.log("Error connecting to database");
  }

  let imageUrls = await Promise.all(
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

  imageUrls = imageUrls.concat(existingimages);
  console.log(imageUrls);

  if (category == "0") {
    const products = await Products.updateOne(
      { _id: _id },
      {
        $set: {
          name: name,
          description: description,
          price: price,
          images: imageUrls,
          category: null,
          properties: null,
        },
      }
    );
  } else {
    const products = await Products.updateOne(
      { _id: _id },
      {
        $set: {
          name: name,
          description: description,
          price: price,
          images: imageUrls,
          category: category,
          properties: JSON.parse(properties),
        },
      }
    );
  }

  return new Response(JSON.stringify({ message: "Success" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
