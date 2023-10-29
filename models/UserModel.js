// TABLE FOR ALL USERS
import bcrypt from 'bcrypt'; // import bcrypt for hashing password
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

sequelize.query(`CREATE SEQUENCE IF NOT EXISTS user_code_seq;`);

const User = sequelize.define(
    'User',
    {
        userId: { // WHEN USER IS CREATED, THIS WILL BE GENERATED
            type: DataTypes.TEXT,
            allowNull: false,
            primaryKey: true,
            defaultValue: sequelize.literal(`'USER' || LPAD(nextval('user_code_seq')::TEXT, 10, '0')`), // USER0000000001
        },
        mobileNo: { // MOBILE NUMBER OF THE USER
            type: DataTypes.STRING(15),
            allowNull: false,
            unique: true,
        },
        firstName: { // FIRST NAME OF THE USER
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: { // LAST NAME OF THE USER
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: { // PASSWORD OF THE USER INITIALLY THIS CAN BE THE SAME AS MOBILE NUMBER
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: { // ROLE OF THE USER
            type: DataTypes.STRING(25),
            allowNull: false,
        },
        progress: { // 1 FOR CURRENTLY USING THE SYSTEM, 0 FOR NOT USING THE SYSTEM
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        image: { // Avatar.jpeg
            type: DataTypes.TEXT,
            allowNull: true,
        },

    },
    {
        tableName: 'users',
    }
);

User.beforeCreate(async (user, options) => {
    const salt = await bcrypt.genSalt(10); // generate salt for hashing password
    user.password = await bcrypt.hash(user.password, salt); // hash password
});

User.beforeBulkCreate(async (users, options) => {
    const salt = await bcrypt.genSalt(10); // generate salt for hashing password

    for (const user of users) {
        user.password = await bcrypt.hash(user.password, salt); // hash password
    }
});

User.beforeUpdate(async (user, options) => {
    if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10); // generate salt for hashing password
        user.password = await bcrypt.hash(user.password, salt); // hash password   
    }
});

User.beforeBulkUpdate(async (users, options) => {
    const salt = await bcrypt.genSalt(10); // generate salt for hashing password

    for (const user of users) {
        if (user.changed('password')) {
            user.password = await bcrypt.hash(user.password, salt); // hash password
        }
    }
});

// prototype method for validating password
User.prototype.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// prototype method for converting user to JSON
User.prototype.toJSON = function () {
    // deletes the password when converting to a JSON object.
    // This is because we don’t want to expose the password to the client.
    const user = { ...this.get() };
    delete user.password;
    return user;
};

export default User;