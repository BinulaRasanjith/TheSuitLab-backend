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
        type: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING(20),
        },
        colorCode: {
            type: DataTypes.STRING(7),
        },
        image: {
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