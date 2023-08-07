import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Rent = sequelize.define(
    'Rent',
    {
        price: {
            type: DataTypes.FLOAT,
        },
        advance: {
            type: DataTypes.FLOAT,
        },
        rentDate: {
            type: DataTypes.DATE,
        },
        collectedDate: {
            type: DataTypes.DATE,
        },
    },
    {
        tableName: 'rents',
    }
);

export default Rent;