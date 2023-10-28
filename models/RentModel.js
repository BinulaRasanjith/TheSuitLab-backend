// TABLE FOR HIRINGS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Rent = sequelize.define(
    'Rent',
    {
        rentalId: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            PrimaryKey: true,
            defaultValue: sequelize.literal(`'HE' || LPAD(nextval('hire_code_seq')::TEXT, 10, '0')`), // HE0000000001
        },
        customerId: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        costume: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        rentedDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        willHandover: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        advance: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        mobileNo: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
    },
    {
        tableName: 'rents',
    }
);

export default Rent;