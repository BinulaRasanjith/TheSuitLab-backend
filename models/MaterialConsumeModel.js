import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const MaterialConsume = sequelize.define(
    'MaterialConsume',
    {
        costume: {
            type: DataTypes.INTEGER,
            allowNull: false,
            compositePrimaryKey: true,
        },
        material: {
            type: DataTypes.INTEGER,
            allowNull: false,
            compositePrimaryKey: true,
        },
        units: {
            type: DataTypes.DOUBLE(12, 2),
            allowNull: false,
        },
    },
    {
        tableName: 'material_consume',
    }
);

export default MaterialConsume;