// TABLE FOR STRINGS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Zipper = sequelize.define(
    'Zipper',
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
        style: { // FRONT FACING OR BACK FACING
            type: DataTypes.STRING,
            allowNull: false,
        },
        size: { // SIZE OF THE STRING
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        tableName: 'zippers',
    }
);

export default Zipper;