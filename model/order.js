const { Schema, model, models } = require("mongoose");

const orderSchema = new Schema(
  {
    lineitems: Object,
    name: String,
    email: String,
    city: String,
    pincode: String,
    streetaddress: String,
    country: String,
    phonenumber: String,
    paid: Boolean,
    order_id: String,
    order_status: String,
    user_id:String,
  },
  {
    timestamps: true,
  }
);

export const Order = models?.Order || model("Order", orderSchema);
