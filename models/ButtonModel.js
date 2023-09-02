// TABLE FOR BUTTONS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Buttons = sequelize.define(
    'Buttons',
    {
        materialCode: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        quantity: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        size: { // DIAMETER OF THE BUTTON
            type: DataTypes.FLOAT,
            allowNull: true,
        },
    },
    {
        tableName: 'buttons',
    }
);

export default Buttons;