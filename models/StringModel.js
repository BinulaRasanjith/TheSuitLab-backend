// TABLE FOR STRINGS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Strings = sequelize.define(
    'Strings',
    {
        materialCode: {
            type: DataTypes.TEXT,
            allowNull: false,
            primaryKey: true,
        },
        quantity: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        size: { // SIZE OF THE STRING
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        tableName: 'strings',
    }
);

export default Strings;