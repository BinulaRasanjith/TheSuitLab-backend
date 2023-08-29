// TABLE: supply_orders
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const SupplyOrder = sequelize.define(
    'SupplyOrder',
    {
        invoiceNo: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        material: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        supplier: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        unit_price: {
            type: DataTypes.DOUBLE(12, 2),
            allowNull: false,
        },
        quantity: {
            type: DataTypes.DOUBLE(12, 2),
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