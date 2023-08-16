import bcrypt from 'bcrypt'; // import bcrypt for hashing password
import { DataTypes } from "sequelize";

import sequelize from "../db/db.js";

const User = sequelize.define(
    'User',
    {
        mobileNo: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            // allowNull: false, // TODO: lastName - allow null for now
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
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