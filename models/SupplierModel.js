import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Supplier = sequelize.define(
    'Supplier',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contact_no: {
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