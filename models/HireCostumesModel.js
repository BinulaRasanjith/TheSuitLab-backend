// TABLE FOR HIRING COSTUMES
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const HireCostume = sequelize.define(
    'HireCostume',
    {
        itemId: { // COSTUME CODE
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
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
            defaultValue: 'Available',
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