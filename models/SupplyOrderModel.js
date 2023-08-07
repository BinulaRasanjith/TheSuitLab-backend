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
        quantity: {
            type: DataTypes.INTEGER,
        },
        price: {
            type: DataTypes.FLOAT,
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