import { Customer, Cart, ItemModel, User } from "../models/models.js";
import { CoatMeasurements, TrouserMeasurements } from "../models/CustomerModel.js";

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

// export const setCartItem = async (req, res) => {
//     try {
//         const userId = req.user.userId;
//         const { itemId, description, price, size, quantity } = req.body;

//         // TODO: check if item is already in cart
//         const cartItem = new Cart({ customerId: userId, itemId, description, size, quantity, price });
//         await cartItem.save();
//         res.status(201).json({ message: "Item added to cart" });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

export const setNewCostumeToItemModel = async (req, res) => {
    try {
        const { itemType, price, quantity, status } = req.body;
        const item = await ItemModel.create({
            itemType,
            price,
            quantity,
            status,
        });
        res.status(201).json({ itemId: item.itemId });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const setCartItemForHireCostume = async (req, res) => {
    try {
        const { customerId, itemId, price, quantity, status, description } = req.body;
        /*
            description = {
                type: "hire",
                size: "M",
                fromDate: "2021-05-01",
                toDate: "2021-05-10"
            }
        */
        const cartItem = new Cart({ customerId, itemId, price, quantity, status, description });
        console.log(cartItem.toJSON());
        await cartItem.save();

        res.status(201).json({ message: "Item added to cart" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const setCartItemForCustomSuit = async (req, res) => {
    try {
        const { customerId, itemId, price, quantity, status, description, measurement } = req.body;

        const cartItem = new Cart({ customerId, itemId, price, quantity, status, description, measurement });
        console.log(cartItem.toJSON());
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

export const paymentInfo = async (req, res) => {
    const { userId } = req.user;

    try {
        const customer = await Customer.findOne({ where: { userId }, include: { model: User, attributes: ['firstName', 'lastName', 'mobileNo'] } });
        if (!customer) {
            res.status(404).json({ message: "Customer not found" });
        } else {
            console.log(customer.toJSON());
            res.status(200).json({
                firstName: customer.User.firstName,
                lastName: customer.User.lastName,
                email: customer.email,
                phone: customer.User.mobileNo,
                address: customer.address,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const setPaymentInfo = async (req, res) => {
    const { userId } = req.user;
    const { email, address } = req.body;

    console.log(req.body);
    try {
        const customer = await Customer.findOne({ where: { userId } });
        if (!customer) {
            res.status(404).json({ message: "Customer not found" });
        } else {
            customer.email = email;
            customer.address = address;
            await customer.save();
            res.status(200).json({ message: "Payment info saved" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};