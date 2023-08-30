// TABLE FOR PURCHASE PAYMENTS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Payment = sequelize.define(
    'Payment',
    {
        reference_no: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        customer: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        order_id: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        method: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount_paid: {
            type: DataTypes.DOUBLE(12, 2),
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: 'payments',
    }
);

export default Payment;
