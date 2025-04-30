import { models, Schema, model, Types } from "mongoose";

const categoriesSchema = new Schema({
  name: { type: String, required: true },
  parent: { type: Types.ObjectId, ref: "categories" },
  properties: { type: [{ name: String, values: [String] }] },
});

export const categories =
  models.categories || model("categories", categoriesSchema);
