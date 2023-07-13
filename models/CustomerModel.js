import { DataTypes } from "sequelize";
import sequelize from "../config/db";

const Customer = sequelize.define(
    'Customer',
    {
        customer_id: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
            autoIncrement: true, // TODO: check again??
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // TODO: measurements??
    },
    {
        tableName: 'customers',
    }
);

export default Customer;