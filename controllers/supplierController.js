import Supplier from "../models/SupplierModel.js";

// create supplier
export const createSupplier = async (req, res) => {
    try {
        const { name, email, contactNo } = req.body;
        const newSupplier = await Supplier.create({
            supplierName: name,
            email,
            mobileNo: contactNo,
            progress: true,
        });
        res.status(201).json(newSupplier);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// get all suppliers
export const getSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.findAll();
        res.status(200).json(suppliers);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// get supplier by id
export const getSupplier = async (req, res) => {
    try {
        const { id } = req.params;

        const supplier = await Supplier.findOne({ where: { id } });
        res.status(200).json(supplier);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// update supplier
export const updateSupplier = async (req, res) => {
    try {
        const supplier = req.body;

        const updatedSupplier = await Supplier.update(supplier, { where: { id: supplier.id } });

        res.status(200).json(updatedSupplier);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// delete supplier by id
export const deleteSupplier = async (req, res) => {
    try {
        const { id } = req.params;

        await Supplier.destroy({ where: { id } });

        res.status(200).json({ message: "Supplier deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
