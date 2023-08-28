import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const PurchaseOrder = sequelize.define(
    'PurchaseOrder',
    {
        reference_no: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            // TODO: auto increment or not ??
        },
        customer: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        item_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        total_amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        payment_method: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        requested_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        fit_on_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        collected_date: {
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