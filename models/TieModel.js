import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Tie = sequelize.define(
    'Tie',
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
        Pattern: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        width: {
            type: DataTypes.INTEGER,
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
        tableName: 'ties',
    }
);

export default Tie;