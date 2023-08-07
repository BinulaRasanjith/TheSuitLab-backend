import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const ProductManager = sequelize.define(
    'ProductManager',
    {},
    {
        tableName: 'product_managers',
    }
);

export default ProductManager;