// TABLE FOR STRINGS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Interlining = sequelize.define(
    'Interlining',
    {
        materialCode: { // MATERIAL CODE FROM THE PARENT
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        quantity: { // QUANTITY IN YARDS
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        weightOfUnit: { // WEIGHT OF 1 UNIT OF MATERIAL
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        tableName: 'interlinings',
    }
);

export default Interlining;