import { config } from "dotenv";

config();

export default {
    host: "localhost",//process.env.HOST || "",
    database: "rfid", // process.env.DATABASE || "",
    user: "root" ,//process.env.USER || "",
    password: ""//process.env.PASSWORD || ""
};
