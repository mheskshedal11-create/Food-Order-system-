import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        orderNumber: {
            type: String,
            required: true,
            unique: true,
        },
        table: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Table",
            required: true,
        },
        seats: [{
            type: String,
            enum: ["A", "B", "C", "D"],
            required: true
        }],
        items: [{
            food: String,
            quantity: Number,
            price: Number
        }],
        totalAmount: {
            type: Number,
            required: true
        },
        paymentStatus: {
            type: String,
            enum: ["pending", "paid", "failed"],
            default: "pending",
        },
        orderStatus: {
            type: String,
            enum: ["received", "preparing", "ready", "served", "completed"],
            default: "received",
        },
        specialInstructions: { type: String },
        isGroupOrder: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
