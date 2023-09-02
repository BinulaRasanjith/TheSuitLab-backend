// TABLE FOR MATERIAL CONSUMPTION
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const MaterialConsume = sequelize.define(
    'MaterialConsume',
    {
        costume: {
            type: DataTypes.TEXT,
            allowNull: false,
            compositePrimaryKey: true,
        },
        material: {
            type: DataTypes.TEXT,
            allowNull: false,
            compositePrimaryKey: true,
        },
        units: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        tableName: 'material_consume',
    }
);

export default MaterialConsume;