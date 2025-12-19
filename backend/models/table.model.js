import mongoose from "mongoose";

const tableSchema = new mongoose.Schema(
    {
        tableNumber: {
            type: Number,
            required: true,
        },
        seats: {
            A: {
                currentOrder: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Order",
                    default: null,
                },
            },
            B: {
                currentOrder: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Order",
                    default: null,
                },
            },
            C: {
                currentOrder: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Order",
                    default: null,
                },
            },
            D: {
                currentOrder: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Order",
                    default: null,
                },
            },
        },
        capacity: {
            type: Number,
            default: 4,
        },
        isFull: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Table = mongoose.model("Table", tableSchema);
export default Table;
