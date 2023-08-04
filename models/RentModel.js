import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Rent = sequelize.define(
    'Rent',
    {
        price: {
            type: DataTypes.FLOAT,
        },
        advance: {
            type: DataTypes.FLOAT,
        },
        rent_date: {
            type: DataTypes.DATE,
        },
        collected_date: {
            type: DataTypes.DATE,
        },
    },
    {
        tableName: 'rents',
    }
);

export default Rent;