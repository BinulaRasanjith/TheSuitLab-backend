// TABLE FOR HANDOVERS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Handover = sequelize.define(
    'Handover',
    {
        rentalId: {
            type: DataTypes.TEXT,
            allowNull: false,
            // unique: true,
            PrimaryKey: true,
        },
        costumeId: { // COSTUME ID
            type: DataTypes.TEXT,
            allowNull: false,
        },
        handoveredDate: { // DATE OF HANDOVER
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        handoveredTo: { // NAME OF THE PERSON WHO RECEIVED THE COSTUME
            type: DataTypes.TEXT,
            allowNull: true,
        },
        damages: { // DAMAGES TO THE COSTUME
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },
        balance: { // BALANCE AFTER INITIAL PAYMENT
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        penalties: { // PENALTIES FOR DAMAGES AND DELAYS
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        total: { // TOTAL COST FOR HIRE
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        tableName: 'handovers',
    }
);

export default Handover;