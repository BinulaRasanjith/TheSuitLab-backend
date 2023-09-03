// TABLE FOR STRINGS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Interlining = sequelize.define(
    'Interlining',
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