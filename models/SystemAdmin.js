import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const SystemAdmin = sequelize.define(
    'SystemAdmin',
    {
        employee_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
    },
    {
        tableName: 'system_admins',
    }
);

export default SystemAdmin;