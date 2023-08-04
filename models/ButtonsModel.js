import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Strings = sequelize.define(
    'Strings',
    {
        material_code: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        size: {
            type: DataTypes.STRING,
        },
    },
    {
        tableName: 'strings',
    }
);

export default Strings;