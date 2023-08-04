import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define(
    'User',
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            // TODO: allow null: true
        },
        mobile_no: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false, // TODO: check again
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: 'users',
    }
);

export default User;