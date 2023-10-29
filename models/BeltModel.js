// TABLE FOR BELTS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Belt = sequelize.define(
    'Belt',
    {
        itemId: {  // THE INDIVIDUAL ITEM ID
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            PrimaryKey: true,
        },
        buckleType: { // 'Frame', 'Box', 'Plate', 'D-ring'
            type: DataTypes.STRING,
            allowNull: false,
        },
        size: { // 'S', 'M', 'L'
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        tableName: 'belts',
    }
);

export default Belt;