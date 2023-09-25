import sequelize from "./db.js";
import { ASCII } from "../config/config.js";

const createSequences = async () => {
    try {
        // REQUIRED SEQUENCE QUERIES SET

        // ? TO START FROM 1 AND INCREASE COUNT 1 BY 1
        // await sequelize.query(`CREATE SEQUENCE accessory_code_seq START 1 INCREMENT 1;`);

        await sequelize.query(`CREATE SEQUENCE IF NOT EXISTS accessory_code_seq;`);
        await sequelize.query(`CREATE SEQUENCE IF NOT EXISTS costume_code_seq;`);
        await sequelize.query(`CREATE SEQUENCE IF NOT EXISTS material_code_seq;`);
        await sequelize.query(`CREATE SEQUENCE IF NOT EXISTS order_code_seq;`);
        await sequelize.query(`CREATE SEQUENCE IF NOT EXISTS payment_invoice_seq;`);
        await sequelize.query(`CREATE SEQUENCE IF NOT EXISTS hire_costume_code_seq;`);
        await sequelize.query(`CREATE SEQUENCE IF NOT EXISTS hire_code_seq;`);
        await sequelize.query(`CREATE SEQUENCE IF NOT EXISTS review_code_seq;`);
        await sequelize.query(`CREATE SEQUENCE IF NOT EXISTS return_code_seq;`);
        await sequelize.query(`CREATE SEQUENCE IF NOT EXISTS staff_code_seq;`);
        await sequelize.query(`CREATE SEQUENCE IF NOT EXISTS supplier_code_seq;`);
        await sequelize.query(`CREATE SEQUENCE IF NOT EXISTS supplier_payment_code_seq;`);
        await sequelize.query(`CREATE SEQUENCE IF NOT EXISTS supply_code_seq;`);
        await sequelize.query(`CREATE SEQUENCE IF NOT EXISTS user_code_seq;`);

        // PROVIDE FEEDBACK AFTER SUCCESSFULLY RUN SEQUENCE QUERIES
        console.log(`${ASCII.green}\nSequences created${ASCII.reset}`);

    } catch (error) {
        // PROVIDE FEEDBACK IF THERE IS PROBLEM TO RUN SEQUENCE QUERIES
        console.error('Error executing SEQUENCE queries:', error);

        // EXIT THE SETUP SCRIPT WITH ERROR CODE
        process.exit(1);
    }
};

export default createSequences;