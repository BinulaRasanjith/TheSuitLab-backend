// TABLE FOR COSTUMES
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

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
        size: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        rentalPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        salePrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        costumeType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: 'costumes',
    }
);

export default Costume;