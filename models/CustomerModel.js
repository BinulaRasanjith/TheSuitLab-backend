import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Customer = sequelize.define(
    'Customer',
    {
        customer_id: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
            // TODO: check again??
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