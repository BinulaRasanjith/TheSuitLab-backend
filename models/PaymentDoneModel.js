import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const PaymentDone = sequelize.define(
    'PaymentDone',
    {
        done: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
    },
    {
        tableName: 'payment_done',
    }
);

export default PaymentDone;