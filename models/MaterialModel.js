import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Material = sequelize.define(
    'Material',
    {
        materialCode: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        color: {
            type: DataTypes.STRING,
        },
        colorCode: {
            type: DataTypes.STRING,
        },
        quantity: {
            type: DataTypes.INTEGER,
        },
        usedQuantity: {
            type: DataTypes.INTEGER,
        },
    },
    {
        tableName: 'materials',
    }
);

export default Material;