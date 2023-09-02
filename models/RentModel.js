// TABLE FOR RENTS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

sequelize.query(`CREATE SEQUENCE hire_code_seq;`);

const Rent = sequelize.define(
    'Rent',
    {
        rental_id: {
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