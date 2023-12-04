
import app from "./app";
import { connectToDatabase } from "./database/database";


const main = async () => {
    try {
        await connectToDatabase();
        
        app.listen(app.get("port"));
        console.log(`Server on port ${app.get("port")}`);
    } catch (error) {
        console.error("Unable to start the server:", error.message);
    }
};

main();
