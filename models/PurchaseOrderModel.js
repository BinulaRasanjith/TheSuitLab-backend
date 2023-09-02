// TABLE FOR PURCHASE ORDERS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

sequelize.query(`CREATE SEQUENCE order_code_seq;`);

const PurchaseOrder = sequelize.define(
    'PurchaseOrder',
    {
        orderId: {
            type: DataTypes.TEXT,
            allowNull: false,
            primaryKey: true,
            unique: true,
            defaultValue: sequelize.literal(`'#' || LPAD(nextval('order_code_seq')::TEXT, 10, '0')`), // #0000000001
        },
        referenceNo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: true,
        },
        customerId: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        itemCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        totalAmount: {
            type: DataTypes.DOUBLE(12, 2),
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
        requestedDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        fitOnDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        collectedDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },

        // ! payment details (check if needed a payment id)
        // payment_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        // },
        // payment_amount: {
        //     type: DataTypes.FLOAT,
        // },
        // paymentMethod: {
        //     type: DataTypes.STRING,
        // },
        // payment_date: {
        //     type: DataTypes.DATE,
        // },
        // payment_status: {
        //     type: DataTypes.STRING,
        // },
    },
    {
        tableName: 'purchase_orders',
    }
);

export default PurchaseOrder;