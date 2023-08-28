import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Cart = sequelize.define(
    'Cart',
    {
        customer: {
            type: DataTypes.INTEGER,
            allowNull: false,
            compositePrimaryKey: true,
        },
        item: {
            type: DataTypes.INTEGER,
            allowNull: false,
            compositePrimaryKey: true,
            unique: true,
        },
    },
    {
        tableName: 'shopping_cart',
    }
);

export default Cart;