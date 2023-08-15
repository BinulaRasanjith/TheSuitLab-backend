import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Supplier = sequelize.define(
    'Supplier',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bankAccNo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        contactNo: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        tableName: 'suppliers',
    }
);

export default Supplier;