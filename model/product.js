import { Schema, Types, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String },
    description: String,
    price: { type: Number },
    images: {
      type: [String],
    },
    category: { type: Types.ObjectId, ref: "categories" },
    properties: { type: Object },
  },
  { timestamps: true }
);

export const Products = models.Products || model("Products", ProductSchema);
