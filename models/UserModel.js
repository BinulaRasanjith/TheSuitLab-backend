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
    },
    {
        tableName: 'users',
        timestamps: false
    }
);

export default User;