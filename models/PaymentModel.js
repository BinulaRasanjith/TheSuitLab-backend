// TABLE FOR PURCHASE PAYMENTS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

// sequelize.query(`CREATE SEQUENCE payment_invoice_seq;`);

const Payment = sequelize.define(
    'Payment',
    {
        invoiceNo: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            primaryKey: true,
            defaultValue: sequelize.literal(`'PMT' || LPAD(nextval('payment_invoice_seq')::TEXT, 10, '0')`), // PMT0000000001
        },
        customerId: { // TODO: CHECK, THIS CAN BE GET FROM `orderId`
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
            type: DataTypes.FLOAT,
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
