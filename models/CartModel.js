// TABLE FOR SHOPPING CART
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

// sequelize.query(`CREATE SEQUENCE cart_code_seq;`);

const Cart = sequelize.define(
    'Cart',
    {
        // cart_id: {
        //     type: DataTypes.TEXT,
        //     allowNull: false,
        //     primaryKey: true,
        //     defaultValue: sequelize.literal(`'CART' || LPAD(nextval('cart_code_seq')::TEXT, 10, '0')`), // CART0000000001
        // },
        customer: {
            type: DataTypes.TEXT,
            allowNull: false,
            compositePrimaryKey: true,
        },
        item: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            compositePrimaryKey: true,
        },
    },
    {
        tableName: 'shopping_cart',
    }
);

export default Cart;