// TABLE FOR HIRING COSTUME DETAILS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const HireCostume = sequelize.define(
    'HireCostume',
    {
        itemId: { // COSTUME CODE
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        name: { // COSTUME NAME
            type: DataTypes.TEXT,
            allowNull: false,
        },
        costumeType: { // JACKET OR PANT
            type: DataTypes.TEXT,
            allowNull: false,
        },
        size: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        color: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        fabric: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        buttons: { // FOR JACKETS -> COUNT && FOR PANTS -> 0 OR 1
            type: DataTypes.TEXT,
            allowNull: true,
        },
        buttonColor: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        // FOR JACKETS
        lapel: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        pockets: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        pocketColor: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        sleeveButton: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        // FOR PANTS
        vent: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        backPocket: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        // FOR BOTH
        rentStatus: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: 'Available',
        },
        images: { // ADD IMAGES AS AN ARRAY
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: true,
        },
    },
    {
        tableName: 'hire_costumes',
    }
);

export default HireCostume;
