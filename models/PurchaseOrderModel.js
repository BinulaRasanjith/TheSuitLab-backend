import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const PurchaseOrder = sequelize.define(
    'PurchaseOrder',
    {
        referenceNo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            // TODO: auto increment or not ??
        },
        noOfItems: {
            type: DataTypes.INTEGER
        },
        totalAmount: {
            type: DataTypes.INTEGER,
        },
        status: {
            type: DataTypes.STRING,
        },
        remarks: {
            type: DataTypes.STRING,
        },
        requestedDate: {
            type: DataTypes.DATE,
        },
        collectedDate: {
            type: DataTypes.DATE,
        },
        fitOnDate: {
            type: DataTypes.DATE,
        },

        // ! payment details (check if needed a payment id)
        // payment_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        // },
        // payment_amount: {
        //     type: DataTypes.FLOAT,
        // },
        // payment_method: {
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