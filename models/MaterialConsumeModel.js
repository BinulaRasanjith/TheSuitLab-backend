// TABLE FOR MATERIAL CONSUMPTION
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const MaterialConsume = sequelize.define(
    'MaterialConsume',
    {
        costumeId: { // COSTUME ID
            type: DataTypes.TEXT,
            allowNull: false,
            compositePrimaryKey: true,
        },
        materialCode: { // MATERIAL CODE
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            compositePrimaryKey: true,
        },
        units: { // NUMBER OF CONSUMED UNITS (METERS OR UNITS)
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        tableName: 'material_consume',
    }
);

export default MaterialConsume;