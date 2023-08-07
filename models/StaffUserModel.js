import { DataTypes } from 'sequelize'
import sequelize from '../db/db.js'

const StaffUser = sequelize.define(
    'StaffUser',
    {
        role: {
            type: DataTypes.STRING
        }
    },
    {
        tableName: 'staff_users'
    }
)

export default StaffUser
