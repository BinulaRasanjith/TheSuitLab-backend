import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const PurchaseOrder = sequelize.define(
    'PurchaseOrder',
    {
        reference_no: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            // TODO: auto increment or not ??
        },
        no_of_items: {
            type: DataTypes.INTEGER
        },
        total_amount: {
            type: DataTypes.INTEGER,
        },
        status: {
            type: DataTypes.STRING,
        },
        remarks: {
            type: DataTypes.STRING,
        },
        requested_date: {
            type: DataTypes.DATE,
        },
        collected_date: {
            type: DataTypes.DATE,
        },
        fit_on_date: {
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