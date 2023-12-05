import { getConnection } from "./../database/database";

//-----------------------------------------------------------------------------------------

const getUsers = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM user");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getName = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM user WHERE id = ?", id);
       

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};


//-----------------------------------------------------------------------------------------
const verifyUser = async (req, res) => {
    try {
        const { rfid } = req.body;

        if (rfid === undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all fields." });
            return;
        }

        const connection = await getConnection();

        // Llamar al procedimiento almacenado
        const [results] = await connection.query("CALL RegistrarAcceso(?, @message)", [rfid]);
        
        // Obtener el mensaje de salida
        const [messageResults] = await connection.query("SELECT @message as message");
        const message = messageResults[0].message;

        res.json({ message });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// const verifyUser = async (req, res) => {
//     try {
//         const { rfid } = req.body;

//         if (rfid === undefined) {
//             res.status(400).json({ message: "Bad Request. Please fill all field." });
//             return;
//         }

//         const user = { rfid };
//         const connection = await getConnection();
//         const [results] = await connection.query("CALL RegistrarAcceso(?)", [user.rfid]);
//         res.json(results);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

//-------------------------------------------------------------------------------------------

const addUser = async (req, res) => {
    try {
        const { name, u_access, rfid_id } = req.body;

        if (name === undefined || u_access === undefined || rfid_id === undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field." });
        }

        const User = {name , u_access, rfid_id };
        const connection = await getConnection();
        await connection.query("INSERT INTO user SET ?", User);
        res.json({ message: "Usuaurio agregado" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
// -------------------------------------------------------------------------------------------



const updateUser = async (req, res) => {
    try {
        
        const {id,  name, u_access } = req.body;

        // if (id === undefined || name === undefined || u_access === undefined) {
        //     res.status(400).json({ message: "Es necesario llenar todos los compos correctamente." });
        // }

        const connection = await getConnection();
        const result = await connection.query("UPDATE user SET name = ?, u_access = ? WHERE id = ?", [ name, u_access, id]);
        res.json({message: "Usuaurio actualizado"});
         
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// ----------------------------------------------------------------

const deleteUser = async (req, res) => {
    try {
        const connection = await getConnection();
        const { id } = req.params;
        const [consulta] = await connection.query("SELECT id FROM user where id=? ", [id]);
        if (!consulta || consulta.length === 0){
            res.json({message: "no se encontro usuario con id : " + [id]});
        } else {
        const result = await connection.query("DELETE FROM user WHERE id = ?", [id]);
        res.json({message:"Usuario Eliminado"});
        }
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getUsers,
    getName,
    verifyUser,
    addUser,
    updateUser,
    deleteUser
};
