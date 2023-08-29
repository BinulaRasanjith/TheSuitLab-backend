// TABLE FOR BUTTONS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

// sequelize.query(`CREATE SEQUENCE material_code_seq;`);

const Buttons = sequelize.define(
    'Buttons',
    {
        material_code: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        // material_code: {
        //     type: DataTypes.TEXT,
        //     allowNull: false,
        //     primaryKey: true,
        //     defaultValue: sequelize.literal(`'MAT' || LPAD(nextval('material_code_seq')::TEXT, 4, '0')`), // MAT0001
        // },
        quantity: {
            type: DataTypes.DOUBLE(12, 2),
            allowNull: false,
        },
        size: { // DIAMETER OF THE BUTTON
            type: DataTypes.DOUBLE(12, 2),
            // allowNull: true,
        },
    },
    {
        tableName: 'buttons',
    }
);

export default Buttons;