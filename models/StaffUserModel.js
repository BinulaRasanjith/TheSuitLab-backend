import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const StaffUser = sequelize.define(
    'StaffUser',
    {
        employee_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        role: {
            type: DataTypes.STRING,
        },
    },
    {
        tableName: 'staff_users',
    }
);

export default StaffUser;