// TABLE FOR PURCHASE PAYMENTS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Payment = sequelize.define(
    'Payment',
    {
        referenceNo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        customerId: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        orderId: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        method: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amountPaid: {
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
