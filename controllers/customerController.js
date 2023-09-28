import { Customer, Cart, User } from "../models/models.js";
import { CoatMeasurements, TrouserMeasurements } from "../models/CustomerModel.js";

export const getCustomers = async (req, res) => {
    try {
        const { id } = req.body;

        let customers;
        if (id) { // IF ID IS SPECIFIED
            customers = await User.findAll({
                where: {
                    userId: id,
                    role: 'customer'
                }
            });
        } else { // IF ID IS NOT SPECIFIED
            customers = await User.findAll({
                where: {
                    role: 'customer'
                }
            });
        }

        return res.status(200).json({ customers });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }

}

export const setCoatMeasurements = async (req, res) => {
    const { userId } = req.user;
    const { measurements } = req.body;

    try {
        const customer = await Customer.findOne({ where: { userId } });
        if (!customer) {
            res.status(404).json({ message: "Customer not found" });
        } else {
            const coatMeasurements = new CoatMeasurements(measurements);
            customer.coatMeasurements = coatMeasurements;
            await customer.save();
            res.status(200).json({ message: "Measurements saved" });
        }
    } catch (error) {
        console.log(error);
    }
};

export const setTrouserMeasurements = async (req, res) => {
    const { userId } = req.user;
    const { measurements } = req.body;

    try {
        const customer = await Customer.findOne({ where: { userId } });
        if (!customer) {
            res.status(404).json({ message: "Customer not found" });
        } else {
            const trouserMeasurements = new TrouserMeasurements(measurements);
            customer.trouserMeasurements = trouserMeasurements;
            await customer.save();
            res.status(200).json({ message: "Measurements saved" });
        }
    } catch (error) {
        console.log(error);
    }
};

export const getCoatMeasurements = async (req, res) => {
    const { userId } = req.params;

    try {
        const customer = await Customer.findOne({ where: { userId } });
        if (!customer) {
            res.status(404).json({ message: "Customer not found" });
        } else {
            res.status(200).json(customer.coatMeasurements);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getTrouserMeasurements = async (req, res) => {
    const { userId } = req.params;

    try {
        const customer = await Customer.findOne({ where: { userId } });
        if (!customer) {
            res.status(404).json({ message: "Customer not found" });
        } else {
            res.status(200).json(customer.trouserMeasurements);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const setCartItem = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { itemId, description, price, size, quantity } = req.body;

        // TODO: check if item is already in cart
        const cartItem = new Cart({ customerId: userId, itemId, description, size, quantity, price });
        await cartItem.save();
        res.status(201).json({ message: "Item added to cart" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const setCartItemForCustomSuit = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { description, price, quantity, type, size, selection } = req.body;

        const cartItem = new Cart({ customerId: userId, description, quantity, price, selection, type, size });
        await cartItem.save();

        res.status(201).json({ message: "Item added to cart" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const removeCartItem = async (req, res) => {
    const { id } = req.params;
    try {
        const cartItem = await Cart.findOne({ where: { id } });
        if (!cartItem) {
            res.status(404).json({ message: "Item not found" });
        } else {
            await cartItem.destroy();
            res.status(200).json({ message: "Item removed from cart" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getCartItems = async (req, res) => {
    const { userId } = req.user;

    try {
        const cartItems = await Cart.findAll({ where: { customerId: userId } });
        res.status(200).json(cartItems);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const hireCostume = async (req, res) => {
    const { userId } = req.user;
    const { costumeId, costumeName, size, quantity } = req.body;

    try {
        const customer = await Customer.findOne({ where: { userId } });
        if (!customer) {
            res.status(404).json({ message: "Customer not found" });
        } else {
            const cartItem = new Cart({ customerId: userId, itemId: costumeId, description, size, quantity });
            await cartItem.save();
            res.status(200).json({ message: "Item added to cart" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};