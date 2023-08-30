// TABLE FOR COSTUMES
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

sequelize.query(`CREATE SEQUENCE costume_code_seq;`);

const Costume = sequelize.define(
    'Costume',
    {
        costume_id: {
            type: DataTypes.TEXT,
            allowNull: false,
            primaryKey: true,
            unique: true,
            defaultValue: sequelize.literal(`'COST' || LPAD(nextval('costume_code_seq')::TEXT, 10, '0')`), // COST0000000001
        },
        costume_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        size: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        rental_price: {
            type: DataTypes.DOUBLE(12, 2),
            allowNull: false,
        },
        sale_price: {
            type: DataTypes.DOUBLE(12, 2),
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