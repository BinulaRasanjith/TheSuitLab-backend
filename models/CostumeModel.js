import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Costume = sequelize.define(
    'Costume',
    {
        size: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.FLOAT,
        },
        costume_type: {

            type: DataTypes.STRING,
        },
        order_type: { // * costume is a order or a rental
            type: DataTypes.STRING,
        },
    },
    {
        tableName: 'costumes',
    }
);

export default Costume;