require('dotenv').config();
module.exports = {
    mongoURI: process.env.DB_URI,
    port: process.env.PORT || 3000,
    connectOptions: {
        dbName: process.env.DB_NAME,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS
    }

};