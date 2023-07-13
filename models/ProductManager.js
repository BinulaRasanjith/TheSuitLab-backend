import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ProductManager = sequelize.define(
    'ProductManager',
    {
        employee_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
    },
    {
        tableName: 'product_managers',
    }
);

export default ProductManager;