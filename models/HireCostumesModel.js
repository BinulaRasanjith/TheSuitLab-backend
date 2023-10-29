import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const HireCostume = sequelize.define(
    'HireCostume',
    {
        itemId: { // GLOBAL ITEM ID
            type: DataTypes.TEXT,
            allowNull: false,
            primaryKey: true,
        },
        name: { // COSTUME NAME
            type: DataTypes.TEXT,
            allowNull: false,
        },
        costumeType: { // 'JACKETS' OR 'PANTS' 
            type: DataTypes.TEXT,
            allowNull: false,
        },
        size: { // {"L": 3, "M": 1, "S": 3}
            type: DataTypes.JSONB,
            allowNull: false,
        },
        color: { // COLOR OF COSTUME ENTERED BY ASSISTANT
            type: DataTypes.TEXT,
            allowNull: true,
        },
        rentStatus: { // 'AVAILABLE' OR 'UNAVAILABLE'
            type: DataTypes.TEXT,
            allowNull: false,
        },
        images: { // [1.webp, 3.webp, 4.webp, 5.webp]
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: true,
        },
    },
    {
        tableName: 'hire_costumes',
    }
);

export default HireCostume;