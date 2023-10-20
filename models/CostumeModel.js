// TABLE FOR COSTUMES
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";
import { PRE_DESIGNED } from "../constants/constants.js";

// ? WHEN CUSTOMER CUSTOMIZING A NEW COSTUME, THE COSTUME WILL BE ADDED TO THIS TABLE AND THE PARTICULAR ORDER TABLE
// ? WHEN SHOP MEMBER ADDING A NEW COSTUME, THE COSTUME WILL BE ADDED TO THIS TABLE ONLY

const Costume = sequelize.define(
    'Costume',
    {
        itemId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        costumeName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        costumeType: { // COAT, TROUSER
            type: DataTypes.STRING,
            allowNull: false,
        },
        customization: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        measurementType: { // STANDARD OR CUSTOMIZED
            type: DataTypes.STRING,
            allowNull: false,
        },
        measurements: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: 'costumes',
    }
);

export default Costume;