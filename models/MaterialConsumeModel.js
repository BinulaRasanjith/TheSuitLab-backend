// TABLE FOR MATERIAL CONSUMPTION
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const MaterialConsume = sequelize.define(
    'MaterialConsume',
    {
        costumeId: { // GLOBAL ITEM ID
            type: DataTypes.TEXT,
            allowNull: false,
            compositePrimaryKey: true,
        },
        materialCode: { // MATERIAL ID
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            compositePrimaryKey: true,
        },
        units: { // NUMBER OF CONSUMED UNITS (YARDS OR NUMBER)
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        tableName: 'material_consume',
    }
);

export default MaterialConsume;