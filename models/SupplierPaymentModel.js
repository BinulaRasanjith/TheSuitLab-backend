// TABLE FOR SUPPLIER PAYMENTS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

sequelize.query(`CREATE SEQUENCE IF NOT EXISTS supplier_payment_code_seq;`);

const SupplierPayment = sequelize.define(
    'SupplierPayment',
    {
        referenceNo: { // UNIQUE ID FOR SUPPLIER PAYMENT REFERENCES
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            primaryKey: true,
            defaultValue: sequelize.literal(`'REF' || LPAD(nextval('supplier_payment_code_seq')::TEXT, 10, '0')`), // REF0000000001
        },
        supplyID: { // PAYMENT DONE AFTER THE SUPPLY ORDER IS PLACED
            type: DataTypes.TEXT,
            allowNull: false,
        },
        method: { // CASH, CARD
            type: DataTypes.STRING,
            allowNull: false,
        },
        amountPaid: { // TOTAL PURCHASE AMOUNT
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        date: { // PAYMENT DATE
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: 'supplier_payments',
    }
);

export default SupplierPayment;
