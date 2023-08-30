// TABLE FOR SHOES
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Shoe = sequelize.define(
    'Shoe',
    {
        item_id: {  // THE INDIVIDUAL ITEM ID
            type: DataTypes.TEXT,
            allowNull: false,
            PrimaryKey: true,
        },
        style: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        size: {
            type: DataTypes.DOUBLE(10, 2),
            allowNull: false,
        },
    },
    {
        tableName: 'shoes',
    }
);

export default Shoe;