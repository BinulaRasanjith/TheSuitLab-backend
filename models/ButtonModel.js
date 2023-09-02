// TABLE FOR BUTTONS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Buttons = sequelize.define(
    'Buttons',
    {
        materialCode: {
            type: DataTypes.TEXT,
            allowNull: false,
            primaryKey: true,
        },
        quantity: {
            type: DataTypes.DOUBLE(12, 2),
            allowNull: false,
        },
        size: { // DIAMETER OF THE BUTTON
            type: DataTypes.DOUBLE(12, 2),
            allowNull: true,
        },
    },
    {
        tableName: 'buttons',
    }
);

export default Buttons;