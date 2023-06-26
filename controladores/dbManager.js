import mysql from "mysql";
import { makeDb } from "mysql-async-simple";
import dotenv from "dotenv";
import { registrarError } from "../controladores/filemanager.js";

dotenv.config({path: ".env"});

const connection = mysql.createConnection({
    //    connectionLimit: 500,
    host: process.env.MYSQL_IP,
    user     : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASS,
    database : process.env.MYSQL_DB,
    port: process.env.MYSQL_PORT
});

const database = makeDb();
try{
    await database.connect(connection);
    console.log(`Mysql conectada exitosamente 
usuario: ${process.env.MYSQL_USER}`);
} catch(e){
    registrarError(e, "Error al conectar la mysql")
}

const encuestaSQL = async (peticion) => {
    var resultado;
    try {
        resultado = await database.query(connection, peticion);
    } catch (e) {
        registrarError(e, `Error con la query \`${peticion}\``)
        resultado = null;
    } finally {
        return resultado;
    }
}
const ejecutarSQL = async (peticion) => {
    try {
        await database.query(connection, peticion);
        return true;
    } catch (e) {
        registrarError(e, `Error con la query \`${peticion}\``)
        return false;
    }
}
export {
    encuestaSQL,
    ejecutarSQL
}