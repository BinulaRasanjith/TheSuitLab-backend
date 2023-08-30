// TODO: IS THIS NEEDED??
// TABLE FOR STAFF USERS
import { DataTypes } from 'sequelize'
import sequelize from '../db/db.js'

sequelize.query(`CREATE SEQUENCE staff_code_seq;`);

const StaffUser = sequelize.define(
    'StaffUser',
    {
        user_id: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            compositeprimaryKey: true,
        },
        staff_id: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            compositeprimaryKey: true,
            defaultValue: sequelize.literal(`'EMP' || LPAD(nextval('staff_code_seq')::TEXT, 5, '0')`), // EMP00001
        },
    },
    {
        tableName: 'staff_users'
    }
)

export default StaffUser
