import { DataTypes } from "sequelize";

import sequelize from "../db/db.js";

const ItemModel = sequelize.define(
    'ItemModel',
    {
        itemId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        itemType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true
        },
    },
    {
        tableName: "items",
    }
);

export default ItemModel;