// TABLE FOR BELTS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Belt = sequelize.define(
    'Belt',
    {
        item_id: {  // THE INDIVIDUAL ITEM ID
            type: DataTypes.TEXT,
            allowNull: false,
            PrimaryKey: true,
        },
        buckle_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        size: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
    },
    {
        tableName: 'belts',
    }
);

export default Belt;