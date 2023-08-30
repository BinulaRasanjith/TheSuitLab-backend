// TABLE FOR SUPPLIERS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

sequelize.query(`CREATE SEQUENCE supplier_code_seq;`);

const Supplier = sequelize.define(
    'Supplier',
    {
        supplier_id: {
            type: DataTypes.TEXT,
            allowNull: false,
            primaryKey: true,
            defaultValue: sequelize.literal(`'SUP' || LPAD(nextval('supplier_code_seq')::TEXT, 5, '0')`), // SUP00001
        },
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
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: 'suppliers',
    }
);

export default Supplier;