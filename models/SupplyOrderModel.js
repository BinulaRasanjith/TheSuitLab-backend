// TABLE FOR SUPPLY ORDERS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

// sequelize.query(`CREATE SEQUENCE supply_invoice_code_seq;`);

const SupplyOrder = sequelize.define(
    'SupplyOrder',
    {
        invoice: {
            type: DataTypes.TEXT,
            allowNull: false,
            primaryKey: true,
            defaultValue: sequelize.literal(`'INV' || LPAD(nextval('supply_invoice_code_seq')::TEXT, 10, '0')`), // INV0000000001
        },
        material: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        supplier: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        unitPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        status: { // PENDING, RECEIVED, CANCELLED
            type: DataTypes.STRING,
            allowNull: false,
        },
        payment_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
        },
        paid_by: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        date: {
            type: DataTypes.DATE,
        },
    },
    {
        tableName: 'supply_orders',
    }
);

export default SupplyOrder;