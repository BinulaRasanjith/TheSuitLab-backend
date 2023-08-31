// TABLE FOR SUPPLIER PAYMENTS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

sequelize.query(`CREATE SEQUENCE supplier_payment_code_seq;`);

const SupplierPayment = sequelize.define(
    'SupplierPayment',
    {
        reference_no: {
            type: DataTypes.TEXT,
            allowNull: false,
            primaryKey: true,
            defaultValue: sequelize.literal(`'REF' || LPAD(nextval('supplier_payment_code_seq')::TEXT, 10, '0')`), // REF0000000001
        },
        supplier: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        invoiceNo: {
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
        tableName: 'supplier_payments',
    }
);

export default SupplierPayment;
