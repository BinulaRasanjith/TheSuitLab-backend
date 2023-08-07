import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Buttons = sequelize.define(
    'Buttons',
    {
        materialCode: {
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