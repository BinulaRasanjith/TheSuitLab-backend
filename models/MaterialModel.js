import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Material = sequelize.define(
    'Material',
    {
        material_code: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        color: {
            type: DataTypes.STRING,
        },
        color_code: {
            type: DataTypes.STRING,
        },
        quantity: {
            type: DataTypes.INTEGER,
        },
        used_quantity: {
            type: DataTypes.INTEGER,
        },
    },
);

export default Material;