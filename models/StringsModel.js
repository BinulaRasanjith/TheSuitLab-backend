import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Buttons = sequelize.define(
    'Buttons',
    {
        material_code: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        size: {
            type: DataTypes.STRING,
        },
    },
    {
        tableName: 'buttons',
    }
);

export default Buttons;