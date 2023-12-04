// database.js
import mysql from "promise-mysql";
import config from "./../config";

let connection;

const connectToDatabase = async () => {
    try {
        connection = await mysql.createConnection({
            host: config.host,
            database: config.database,
            user: config.user,
            password: config.password
        });

        console.log("Conexion exitosa!");
    } catch (error) {
        console.error("Error conexion de database:", error.message);
        throw error;
    }
};

const getConnection = () => {
    return connection;
};

export { connectToDatabase, getConnection };
