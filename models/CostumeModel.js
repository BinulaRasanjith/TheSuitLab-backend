import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Costume = sequelize.define(
    'Costume',
    {
        size: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.FLOAT,
        },
        costumeType: {

            type: DataTypes.STRING,
        },
        orderType: { // * costume is a order or a rental
            type: DataTypes.STRING,
        },
    },
    {
        tableName: 'costumes',
    }
);

export default Costume;