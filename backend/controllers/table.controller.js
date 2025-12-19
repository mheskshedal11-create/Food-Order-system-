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

export const updateTableController = async (req, res) => {
    try {
        const { tableNumber, capacity } = req.body;
        const { id } = req.params;

        let table = await Table.findById(id);
        if (!table) {
            return res.status(404).json({
                success: false,
                message: "Table not found"
            });
        }

        const existingTable = await Table.findOne({ tableNumber, _id: { $ne: id } });
        if (existingTable) {
            return res.status(400).json({
                success: false,
                message: "Table number already exists"
            });
        }

        const updatedTable = await Table.findByIdAndUpdate(
            id,
            { tableNumber, capacity },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Table updated successfully",
            table: updatedTable
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Update table unsuccessful",
            error: error.message
        });
    }
}

export const deleteTableController = async (req, res) => {
    try {
        const { id } = req.params;
        const table = await Table.findByIdAndDelete(id);

        if (!table) {
            return res.status(404).json({
                success: false,
                message: "Table not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Table deleted successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Table deletion unsuccessful",
            error: error.message
        });
    }
}