// TABLE FOR MATERIALS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

// sequelize.query(`CREATE SEQUENCE material_code_seq;`);

const Material = sequelize.define(
    'Material',
    {
        materialCode: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            primaryKey: true,
            defaultValue: sequelize.literal(`'MAT' || LPAD(nextval('material_code_seq')::TEXT, 10, '0')`), // MAT0000000001
        },
        materialType: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        materialName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        supplier: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        unitPrice: {
            type: DataTypes.FLOAT,
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
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: 'materials',
    }
);

export default Material;