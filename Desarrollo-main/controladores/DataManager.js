import bcrypt from "bcrypt";
import { ejecutarSQL, encuestaSQL } from "./dbManager.js";
const RegistrarUsuario = async (req, res) => {
    const body = req.body;
    if(!body.nombre || !body.correo || !body.password) return res.status(200).send({error: "Faltan datos",respuesta: null});
    const password = await encriparPassword(body.password);
    if(ejecutarSQL(`INSERT INTO cuentas_proyecto (nombre, correo, password, rol) VALUES `+
    `("${body.nombre}", "${body.correo}", "${password}", "usuario")`))
    return res.status(200).send({error: null,respuesta: "Cuenta registrada exitosamente"});
    else return res.status(200).send({error: "Error al registrar la cuenta",respuesta: null});
}
const encriparPassword = async (p) => {
    const salt = await bcrypt.genSalt(15);return await bcrypt.hash(p, salt);
}
const LoginUsuario = async (req, res) => {
    const body = req.body;
    if(!body.correo || !body.password) return res.status(200).send({error: "Faltan datos",respuesta: null});
    const data = await encuestaSQL(`SELECT * FROM cuentas_proyecto WHERE correo = "${body.correo}"`);
    if(data && data[0]){
        let verificado = await bcrypt.compareSync(body.password, data[0].password);
        data[0].password = null;//borramos el password para que el resultado no lo muestre
        if(verificado){//contraseña correcta
            let cuenta_empresa = await encuestaSQL(`SELECT * FROM empresas WHERE id_usuario = ${data[0].id_usuario}`);
            if(cuenta_empresa && cuenta_empresa[0]) data[0].empresa = true;
            else data[0].empresa = false;
            return res.status(200).send({error: null,respuesta: data[0]});//regresamos los datos de la sesion
        } else return res.status(200).send({error: "Esa cuenta no existe",respuesta: null});
    }
}
export {
    RegistrarUsuario,
    LoginUsuario
}