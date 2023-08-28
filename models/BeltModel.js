import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Belt = sequelize.define(
    'Belt',
    {
        brand: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        item_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        material: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        buckle_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        size: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        price: {
            type: DataTypes.DOUBLE(12, 2),
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        image: {
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: false,
        },
    },
    {
        tableName: 'belts',
    }
);

export default Belt;