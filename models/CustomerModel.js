import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Customer = sequelize.define(
    'Customer',
    {
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        coat_measurements: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        trouser_measurements: {
            type: DataTypes.JSON,
            allowNull: true,
        }
    },
    {
        tableName: 'customers',
    }
);

export default Customer;