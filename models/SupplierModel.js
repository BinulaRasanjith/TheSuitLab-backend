// TABLE FOR SUPPLIERS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Supplier = sequelize.define(
    'Supplier',
    {
        supplierId: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            primaryKey: true,
            defaultValue: sequelize.literal(`'SUP' || LPAD(nextval('supplier_code_seq')::TEXT, 10, '0')`), // SUP0000000001
        },
        supplierName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bankName: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        accountNo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        mobileNo: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        progress: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: 'suppliers',
    }
);

export default Supplier;