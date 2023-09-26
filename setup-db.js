import createSequences from "./db/createSequences.js";
import seed from "./db/seed.js";
import sequelize from "./db/db.js";

sequelize.sync({ alter: true, force: true })
    .then(async () => {
        await createSequences();
        await seed();
        process.exit(0);
    })
    .catch((error) => {
        console.log(error);
        process.exit(1);
    }
    );

//? to run this script, run the following command in terminal:
//? node setup-db.js