// TABLE FOR SUPPLIERS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

sequelize.query(`CREATE SEQUENCE IF NOT EXISTS supplier_code_seq;`);

const Supplier = sequelize.define(
    'Supplier',
    {
        supplierId: { // UNIQUE ID FOR SUPPLIER
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            primaryKey: true,
            defaultValue: sequelize.literal(`'SUP' || LPAD(nextval('supplier_code_seq')::TEXT, 10, '0')`), // SUP0000000001
        },
        supplierName: { // NAME OF THE SUPPLIER
            type: DataTypes.STRING,
            allowNull: false,
        },
        bankName: { // NAME OF THE BANK
            type: DataTypes.TEXT,
            allowNull: true,
        },
        accountNo: { // BANK ACCOUNT NUMBER
            type: DataTypes.STRING,
            allowNull: true,
        },
        mobileNo: { // MOBILE NUMBER OF THE SUPPLIER
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        progress: { // 1 FOR CURRENTLY SUPPLYING, 0 FOR NOT SUPPLYING
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        image: { // Supplier.jpg
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: 'suppliers',
    }
);

export default Supplier;