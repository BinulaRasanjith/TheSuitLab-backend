// TABLE FOR STRINGS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Strings = sequelize.define(
    'Strings',
    {
        materialCode: { // MATERIAL CODE FROM THE PARENT
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        quantity: { // NO OF ROLLS
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