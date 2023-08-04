import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const SupplyOrder = sequelize.define(
    'SupplyOrder',
    {
        invoice_no: {
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