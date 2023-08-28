import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Strings = sequelize.define(
    'Strings',
    {
        material_code: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        quantity: {
            type: DataTypes.DOUBLE(12, 2),
            allowNull: false,
        },
        size: { // SIZE OF THE STRING
            type: DataTypes.DOUBLE(12, 2),
            // allowNull: true,
        },
    },
    {
        tableName: 'strings',
    }
);

export default Strings;