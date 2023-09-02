// TABLE FOR BELTS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

sequelize.query(`CREATE SEQUENCE accessory_code_seq;`);

const Belt = sequelize.define(
    'Belt',
    {
        itemId: {
            type: DataTypes.TEXT,
            allowNull: false,
            primaryKey: true,
            unique: true,
            defaultValue: sequelize.literal(`'ITEM' || LPAD(nextval('accessory_code_seq')::TEXT, 10, '0')`), // ITEM0000000001
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        itemName: {
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