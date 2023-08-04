import { DataTypes } from 'sequelize'
import sequelize from '../config/db.js'

const StaffUser = sequelize.define(
    'StaffUser',
    {
        // employee_id: { // ? employee need a separate id?
        //     type: DataTypes.INTEGER,
        //     // ? check again
        //     // primaryKey: true,
        //     // autoIncrement: true,
        //     allowNull: false,
        //     unique: true
        // },
        role: {
            type: DataTypes.STRING
        }
    },
    {
        tableName: 'staff_users'
    }
)

export default StaffUser
