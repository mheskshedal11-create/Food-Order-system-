import Order from "../models/order.model.js";
import Table from "../models/table.model.js";
import MenuItem from "../models/menuItem.model.js";

export const createOrderController = async (req, res) => {
    try {
        const { tableId, seats, items, paymentStatus, specialInstructions } = req.body;

        const table = await Table.findById(tableId);
        if (!table) {
            return res.status(404).json({ success: false, message: "Table not found" });
        }

        for (let seat of seats) {
            if (!table.seats[seat]) {
                return res.status(400).json({ success: false, message: `Seat ${seat} does not exist on this table` });
            }
            if (table.seats[seat].currentOrder) {
                return res.status(400).json({ success: false, message: `Seat ${seat} is already occupied` });
            }
        }

        const lastOrder = await Order.findOne().sort({ createdAt: -1 });
        const orderNumber = lastOrder
            ? `ORD-${(parseInt(lastOrder.orderNumber.split("-")[1]) + 1).toString().padStart(3, "0")}`
            : "ORD-001";

        // Fetch menu items
        const orderItems = await Promise.all(
            items.map(async i => {
                const menuItem = await MenuItem.findById(i.menuItem).select("name price -_id");
                if (!menuItem) throw new Error(`MenuItem with id ${i.menuItem} not found`);
                return {
                    menuItem: i.menuItem,
                    name: menuItem.name,
                    price: menuItem.price,
                    quantity: i.quantity,
                    specialInstructions: i.specialInstructions || ""
                };
            })
        );

        const totalAmount = orderItems.reduce((acc, i) => acc + i.price * i.quantity, 0);

        let newOrder = new Order({
            orderNumber,
            table: table._id,
            seats,
            items: orderItems,
            totalAmount,
            paymentStatus: paymentStatus || "pending",
            orderStatus: "received",
            specialInstructions: specialInstructions || "",
            isGroupOrder: seats.length > 1
        });

        await newOrder.save();

        // Block seats
        seats.forEach(seat => table.seats[seat].currentOrder = newOrder._id);
        await table.save();

        // Populate table number only and remove table _id
        newOrder = await Order.findById(newOrder._id)
            .populate("table", "tableNumber -_id"); // only tableNumber, hide _id

        res.status(201).json({ success: true, message: "Order created successfully", order: newOrder });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Order creation failed", error: error.message });
    }
};