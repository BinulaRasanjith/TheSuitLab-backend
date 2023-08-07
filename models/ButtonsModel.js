import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Strings = sequelize.define(
    'Strings',
    {
        materialCode: {
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