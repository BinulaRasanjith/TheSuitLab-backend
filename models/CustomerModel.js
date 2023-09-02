// TABLE FOR CUSTOMERS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Customer = sequelize.define(
    'Customer',
    {
        userId: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        coatMeasurements: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        trouserMeasurements: {
            type: DataTypes.JSON,
            allowNull: true,
        }
    },
    {
        tableName: 'customers',
    }
);

export default Customer;