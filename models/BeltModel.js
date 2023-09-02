// TABLE FOR BELTS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Belt = sequelize.define(
    'Belt',
    {
        itemId: {  // THE INDIVIDUAL ITEM ID
            type: DataTypes.TEXT,
            allowNull: false,
            PrimaryKey: true,
        },
        buckleType: {
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