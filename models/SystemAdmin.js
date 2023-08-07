import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

// TODO: check
const SystemAdmin = sequelize.define(
    'SystemAdmin',
    {},
    {
        tableName: 'system_admins',
    }
);

export default SystemAdmin;