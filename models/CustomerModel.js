// TABLE FOR CUSTOMERS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Customer = sequelize.define(
    'Customer',
    {
        user_id: {
            type: DataTypes.TEXT,
            allowNull: false,
            primaryKey: true,
        },
        address: {
            type: DataTypes.TEXT,
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