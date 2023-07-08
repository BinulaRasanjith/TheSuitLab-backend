import { Sequelize } from "sequelize";
import {db} from './config.js';

const sequelize = new Sequelize(
    db.name,
    db.username,
    db.password,
    {
        host: db.host,
        dialect: db.dialect,
        logging: false,
    }
);

export default sequelize;