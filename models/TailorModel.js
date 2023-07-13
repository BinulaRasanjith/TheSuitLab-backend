import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Tailor = sequelize.define(
    'Tailor',
    {
        employee_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        experience: {
            type: DataTypes.INTEGER,
        },
        specializations: {
            type: DataTypes.STRING,
        }
    },
    {
        tableName: 'tailors',
    }
);

export default Tailor;