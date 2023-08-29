// TODO: IS THIS NEEDED??
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Tailor = sequelize.define(
    'Tailor',
    {
        experienceInYears: {
            type: DataTypes.INTEGER,
        },
        specialization: {
            type: DataTypes.STRING,
        }
    },
    {
        tableName: 'tailors',
    }
);

export default Tailor;