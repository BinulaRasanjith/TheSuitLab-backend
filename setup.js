import dotenv from 'dotenv';
import sequelize from './db/db.js';
import { ASCII } from './config/config.js';

dotenv.config();

// CONNECTING THE DATABASE
sequelize
    .authenticate()
    .then(async () => {
        console.log(`${ASCII.green}\nDatabase connection established!${ASCII.reset}`);

        try {
            // REQUIRED SEQUENCE QUERIES SET

            // ? TO START FROM 1 AND INCREASE COUNT 1 BY 1
            // await sequelize.query(`CREATE SEQUENCE accessory_code_seq START 1 INCREMENT 1;`);

            await sequelize.query(`CREATE SEQUENCE accessory_code_seq;`);
            await sequelize.query(`CREATE SEQUENCE costume_code_seq;`);
            await sequelize.query(`CREATE SEQUENCE material_code_seq;`);
            await sequelize.query(`CREATE SEQUENCE order_code_seq;`);
            await sequelize.query(`CREATE SEQUENCE payment_invoice_seq;`);
            await sequelize.query(`CREATE SEQUENCE hire_code_seq;`);
            await sequelize.query(`CREATE SEQUENCE review_code_seq;`);
            await sequelize.query(`CREATE SEQUENCE return_code_seq;`);
            await sequelize.query(`CREATE SEQUENCE staff_code_seq;`);
            await sequelize.query(`CREATE SEQUENCE supplier_code_seq;`);
            await sequelize.query(`CREATE SEQUENCE supplier_payment_code_seq;`);
            await sequelize.query(`CREATE SEQUENCE supply_code_seq;`);
            await sequelize.query(`CREATE SEQUENCE user_code_seq;`);

            // PROVIDE FEEDBACK AFTER SUCESSFULLY RUN SEQUENCE QUERIES
            console.log('SEQUENCE queries executed successfully.');


            // CLOSE THE DB CONNECTION
            await sequelize.close();
            console.log('Database connection closed.');

            // EXIT WITH THE SUCCESS CODE
            process.exit(0);

        } catch (error) {
            // PROVIDE FEEDBACK IF THERE IS PROBLEM TO RUN SEQUENCE QUERIES
            console.error('Error executing SEQUENCE queries:', error);

            // CLOSE THE DB CONNECTION
            await sequelize.close();
            console.error('Database connection closed due to an error.');

            // EXIT THE SETUP SCRIPT WITH ERROR CODE
            process.exit(1);
        }
    })

    .catch((error) => {

        console.error(`${ASCII.bold + ASCII.red}\nDatabase connection failed!${ASCII.reset}`);
        console.error(error);

        // EXIT THE SETUP SCRIPT WITH ERROR CODE
        process.exit(1);
    });
