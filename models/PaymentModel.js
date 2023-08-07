import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Payment = sequelize.define(
    'Payment',
    {
        amount: {
            type: DataTypes.FLOAT,
        },
        method: {
            type: DataTypes.STRING,
        },
        date: {
            type: DataTypes.DATE,
        },
        status: {
            type: DataTypes.STRING,
        },
    },
    {
        tableName: 'payments',
    }
);

export default Payment;
