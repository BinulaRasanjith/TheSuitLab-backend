// TABLE FOR RENTS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

sequelize.query(`CREATE SEQUENCE IF NOT EXISTS hire_code_seq;`);

const Rent = sequelize.define(
    'Rent',
    {
        rentalId: { // WHEN PAYMENT IS DONE, THIS WILL BE GENERATED
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            PrimaryKey: true,
            defaultValue: sequelize.literal(`'HE' || LPAD(nextval('hire_code_seq')::TEXT, 10, '0')`), // HE0000000001
        },
        customerId: { // THIS WILL BE COMES FROM THE LOGGED IN USER ID
            type: DataTypes.TEXT,
            allowNull: false,
        },
        costume: { // COSTUME ID COMES FROM THE MODEL RELATIONSHIPS
            type: DataTypes.TEXT,
            allowNull: false,
        },
        rentedDate: { // DATE WHEN THE RENT IS PLACED
            type: DataTypes.DATE,
            allowNull: false,
        },
        willHandover: { // DATE WHEN THE SUIT HANDOVER BACK
            type: DataTypes.DATE,
            allowNull: true,
        },
        price: { // AMOUNT = DAYS * PRICE + OTHER CHARGES
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        mobileNo: { // IF USER DOES NOT ADDED, THIS WILL BE FILLED BY LOGGED IN USER'S NUMBER
            type: DataTypes.STRING(15),
            allowNull: false,
        },
    },
    {
        tableName: 'rents',
    }
);

export default Rent;