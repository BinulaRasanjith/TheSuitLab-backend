// TABLE: rents
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Rent = sequelize.define(
    'Rent',
    {
        customer: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        costume: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        rented_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        will_handover: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        price: {
            type: DataTypes.DOUBLE(12, 2),
            allowNull: true,
        },
        advance: {
            type: DataTypes.DOUBLE(12, 2),
            allowNull: false,
        },
        mobile_no: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
    },
    {
        tableName: 'rents',
    }
);

export default Rent;