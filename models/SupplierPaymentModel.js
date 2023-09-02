// TABLE FOR SUPPLIER PAYMENTS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

// sequelize.query(`CREATE SEQUENCE supplier_payment_code_seq;`);

const SupplierPayment = sequelize.define(
    'SupplierPayment',
    {
        referenceNo: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            primaryKey: true,
            defaultValue: sequelize.literal(`'REF' || LPAD(nextval('supplier_payment_code_seq')::TEXT, 10, '0')`), // REF0000000001
        },
        // supplier: { // TODO: CHECK, THIS CAN BE GET FROM `supplyID`
        //     type: DataTypes.TEXT,
        //     allowNull: false,
        // },
        supplyID: {
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
        tableName: 'supplier_payments',
    }
);

export default SupplierPayment;
