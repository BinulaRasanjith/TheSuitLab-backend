import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const HireCostume = sequelize.define(
    'HireCostume',
    {
        name: { // COSTUME NAME
            type: DataTypes.TEXT,
            allowNull: false,
        },
        costumeType: { // JACKETS OR PANTS 
            type: DataTypes.TEXT,
            allowNull: false,
        },
        size: {
            type: DataTypes.JSONB,
            allowNull: false,
        },
        color: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        rentStatus: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        images: { // TODO: CHECK THIS
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: true,
        },
    },
    {
        tableName: 'hire_costumes',
    }
);

export default HireCostume;