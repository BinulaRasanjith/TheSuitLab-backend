// TABLE FOR BELTS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

// sequelize.query(`CREATE SEQUENCE accessory_code_seq;`);

const Accessory = sequelize.define(
    'Accessory',
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
        itemName: { // TODO: GET THE QUANTITY AND CREATE RECORDS FOR EACH ITEM WITH SAME NAME
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
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // quantity: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        // },
        image: {
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: false,
        },
    },
    {
        tableName: 'accessories',
    }
);

export default Accessory;