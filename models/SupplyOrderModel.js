// TABLE FOR SUPPLY ORDERS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

// sequelize.query(`CREATE SEQUENCE supply_code_seq;`);

const SupplyOrder = sequelize.define(
    'SupplyOrder',
    {
        supplyID: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            primaryKey: true,
            defaultValue: sequelize.literal(`'SPL' || LPAD(nextval('supply_code_seq')::TEXT, 10, '0')`), // SPL0000000001
        },
        material: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        supplier: {
            type: DataTypes.TEXT,
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
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: 'supply_orders',
    }
);

export default SupplyOrder;