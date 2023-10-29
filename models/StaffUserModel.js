// TODO: IS THIS NEEDED??
// TABLE FOR STAFF USERS
import { DataTypes } from 'sequelize'
import sequelize from '../db/db.js'

sequelize.query(`CREATE SEQUENCE IF NOT EXISTS staff_code_seq;`);

const StaffUser = sequelize.define(
    'StaffUser',
    {
        userId: { // GET THE USER ID FROM THE USER TABLE
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        staffId: { // UNIQUE ID FOR STAFF
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            defaultValue: sequelize.literal(`'EMP' || LPAD(nextval('staff_code_seq')::TEXT, 5, '0')`), // EMP00001
        },
    },
    {
        tableName: 'staff_users'
    }
)

export default StaffUser
