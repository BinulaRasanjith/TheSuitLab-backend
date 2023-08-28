import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Material = sequelize.define(
    'Material',
    {
        material_code: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        material_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        supplier: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        unit_price: {
            type: DataTypes.DOUBLE(17, 2),
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        colorCode: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        tableName: 'materials',
    }
);

export default Material;