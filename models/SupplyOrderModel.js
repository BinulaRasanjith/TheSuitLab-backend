// TABLE FOR SUPPLY ORDERS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

sequelize.query(`CREATE SEQUENCE IF NOT EXISTS supply_code_seq;`);

const SupplyOrder = sequelize.define(
    'SupplyOrder',
    {
        supplyID: { // GENERATED WHEN SUPPLIER PLACES AN ORDER
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            primaryKey: true,
            defaultValue: sequelize.literal(`'SPL' || LPAD(nextval('supply_code_seq')::TEXT, 10, '0')`), // SPL0000000001
        },
        material: { // MATERIAL ID FROM THE MATERIAL TABLE
            type: DataTypes.TEXT,
            allowNull: false,
        },
        supplier: { // SUPPLIER ID FROM THE SUPPLIER TABLE
            type: DataTypes.TEXT,
            allowNull: false,
        },
        unitPrice: { // UNIT PRICE USER ADDED OR THE PRICE FROM THE MATERIAL TABLE
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        quantity: { // QUANTITY OF THE MATERIAL
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        status: { // PENDING, RECEIVED, CANCELLED
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: { // TOTAL PRICE OF THE ORDER
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        date: { // DATE WHEN THE ORDER IS PLACED
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: 'supply_orders',
    }
);

export default SupplyOrder;