
import app from "./app";
import { methods } from "./controllers/Users.controller";
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


app.get("/users", methods.getUsers);
app.get("/users/:id", methods.getName);
app.post("/users/verify", methods.verifyUser);
app.post("/users", methods.addUser);
app.put("/users", methods.updateUser);
app.delete("/users/:id", methods.deleteUser);

