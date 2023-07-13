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
        }
    },
    {
        tableName: 'purchase_orders',
    }
);

export default PurchaseOrder;