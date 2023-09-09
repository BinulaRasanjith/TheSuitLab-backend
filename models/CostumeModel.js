// TABLE FOR COSTUMES
import { DataTypes } from "sequelize";

import sequelize from "../db/db.js";
import { PRE_DESIGNED } from "../constants/constants.js";

// sequelize.query(`CREATE SEQUENCE costume_code_seq;`);

// ? WHEN CUSTOMER CUSTOMIZING A NEW COSTUME, THE COSTUME WILL BE ADDED TO THIS TABLE AND THE PARTICULAR ORDER TABLE
// ? WHEN SHOP MEMBER ADDING A NEW COSTUME, THE COSTUME WILL BE ADDED TO THIS TABLE ONLY

const Costume = sequelize.define(
    'Costume',
    {
        costumeId: {
            type: DataTypes.TEXT,
            allowNull: false,
            primaryKey: true,
            unique: true,
            defaultValue: sequelize.literal(`'COST' || LPAD(nextval('costume_code_seq')::TEXT, 10, '0')`), // COST0000000001
        },
        costumeName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        customization: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        measurements: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        costumeType: { // COAT, SHIRT, TROUSER
            type: DataTypes.STRING,
            allowNull: false,
        },
        designType: { // PRE-DESIGNED OR CUSTOMIZED
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: PRE_DESIGNED,
        },
        rentalPrice: { // FOR CUSTOMIZED COSTUMES THERE IS NO RENTAL PRICE
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        salePrice: { // FOR CUSTOMIZED COSTUMES SALE-PRICE WILL CALCULATED AND ADDED TO THIS FIELD
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        image: {
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: true,
        },
    },
    {
        tableName: 'costumes',
    }
);

export default Costume;