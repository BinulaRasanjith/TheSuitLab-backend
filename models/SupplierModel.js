// TABLE: suppliers
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Supplier = sequelize.define(
    'Supplier',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bank: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        account_no: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        mobile_no: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        progress: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        tableName: 'suppliers',
    }
);

export default Supplier;