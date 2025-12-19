import Table from "../models/table.model.js";

export const createTableController = async (req, res) => {
    try {
        const { tableNumber, capacity } = req.body;

        let existingTable = await Table.findOne({ tableNumber });
        if (existingTable) {
            return res.status(400).json({
                success: false,
                message: "Table Number already exists"
            });
        }

        const newTable = new Table({
            tableNumber,
            seats: { A: {}, B: {}, C: {}, D: {} },
            capacity: capacity || 4,
            isFull: false
        });

        await newTable.save();

        res.status(201).json({
            success: true,
            message: "New Table created successfully",
            table: newTable
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Table cannot be created",
            error: error.message
        });
    }
}
