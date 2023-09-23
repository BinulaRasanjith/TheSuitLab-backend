import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const HireCostume = sequelize.define(
    'HireCostume',
    {
        hireCostumeId: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            PrimaryKey: true,
            defaultValue: sequelize.literal(`'HC' || LPAD(nextval('hire_costume_code_seq')::TEXT, 10, '0')`), // HC0000000001
        },
        name: { // COSTUME NAME
            type: DataTypes.TEXT,
            allowNull: false,
        },
        costumeType: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        size: {
            type: DataTypes.ARRAY(DataTypes.JSON),
            allowNull: false,
        },
        color: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        status: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        images: { // TODO: CHECK THIS
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: true,
        },
    },
    {
        tableName: 'hire_costumes',
    }
);

export default HireCostume;