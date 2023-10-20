// TODO: IS THIS NEEDED??
// TABLE FOR STAFF USERS
import { DataTypes } from 'sequelize'
import sequelize from '../db/db.js'

const StaffUser = sequelize.define(
    'StaffUser',
    {
        userId: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        staffId: {
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
