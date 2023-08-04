import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Payment = sequelize.define(
    'Payment',
    {
        payment_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        payment_amount: {
            type: DataTypes.FLOAT,
        },
        payment_method: {
            type: DataTypes.STRING,
        },
        payment_date: {
            type: DataTypes.DATE,
        },
        payment_status: {
            type: DataTypes.STRING,
        },
    },
    {
        tableName: 'payments',
    }
);

export default Payment;
