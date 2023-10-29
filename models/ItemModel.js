// CENTER POINT TO ADD UNIQUE IDs FOR ALL ITEMS
import { DataTypes } from "sequelize";

import sequelize from "../db/db.js";

sequelize.query(`CREATE SEQUENCE IF NOT EXISTS item_code_seq;`);

const ItemModel = sequelize.define(
    'ItemModel',
    {
        itemId: {
            type: DataTypes.TEXT,
            allowNull: false,
            primaryKey: true,
            defaultValue: sequelize.literal(`'ITEM' || LPAD(nextval('item_code_seq')::TEXT, 20, '0')`),
        },
        itemType: {
            type: DataTypes.STRING,
            allowNull: false // 'CustomSuit', 'HireCostume', 'Accessory', PreDesigned
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false // Prices for both hires and sales
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: true // Not considered now
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true // This item deleted or not
        },
    },
    {
        tableName: "items",
    }
);

export default ItemModel;