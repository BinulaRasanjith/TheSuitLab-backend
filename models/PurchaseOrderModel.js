// TABLE FOR PURCHASE ORDERS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const PurchaseOrder = sequelize.define(
    'PurchaseOrder',
    {
        orderId: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            primaryKey: true,
            defaultValue: sequelize.literal(`'PO' || LPAD(nextval('order_code_seq')::TEXT, 15, '0')`), // PO000000000000001
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        totalAmount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        paymentMethod: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        orderedDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        collectedDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        tableName: 'purchase_orders',
    }
);

export default PurchaseOrder;