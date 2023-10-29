// TABLE FOR PURCHASE PAYMENTS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

sequelize.query(`CREATE SEQUENCE IF NOT EXISTS payment_invoice_seq;`);

const Payment = sequelize.define(
    'Payment',
    {
        invoiceNo: { // WHEN PAYMENT IS DONE, THIS WILL BE GENERATED
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            primaryKey: true,
            defaultValue: sequelize.literal(`'PAY' || LPAD(nextval('payment_invoice_seq')::TEXT, 10, '0')`), // PAY0000000001
        },
        customerId: { // THIS WILL BE COMES FROM THE LOGGED IN USER ID
            type: DataTypes.TEXT,
            allowNull: false,
        },
        method: { // 'Cash' OR 'Card'
            type: DataTypes.STRING,
            allowNull: true,
        },
        amountPaid: { // TOTAL AMOUNT OF THE ORDER
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        status: { // TODO: IS THIS NEEDED?
            type: DataTypes.STRING,
            allowNull: true,
        },
        date: { // DATE WHEN THE ORDER IS PLACED
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: 'payments',
    }
);

export default Payment;
