// TABLE: costumes
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Costume = sequelize.define(
    'Costume',
    {
        costume_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        size: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        rental_price: {
            type: DataTypes.DOUBLE(12, 2),
            allowNull: false,
        },
        sale_price: {
            type: DataTypes.DOUBLE(12, 2),
            allowNull: false,
        },
        costumeType: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: 'costumes',
    }
);

export default Costume;