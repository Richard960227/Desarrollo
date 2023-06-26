import fs from "fs";
import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const dir = (__dirname).replace("/controladores", "");

const dirExiste = async (dir) => {
    if(fs.existsSync(dir)){
        return true;
    } else return false;
}
const crearDir = async (dir) => {
    try {
        fs.mkdirSync(dir);
        return true;
    } catch (e) {
        await registrarError(e, "Creacion de directorio");
        return false;
    }
}
const archivoExiste = async (nombre, dir) => {
    const path = `${dir}/${nombre}`;    
    if (fs.existsSync(path)) return true;
    else return false;
}
const Borrar = (dir) => {
    var filePath = `${dir}`; 
    try{
        fs.unlinkSync(filePath);
        return true;
    }catch(e){
        return false;
    }
}
const crearArchivo = async (nombre, dir, contenido) => {
    return new Promise(async function(resolve, reject) {    
        const path = `${dir}/${nombre}`;
        var existe = await archivoExiste(nombre, dir);
        if(existe) reject(Error("Ya existe ese archivo"));//await Borrar(dir);
        fs.writeFile(path, `${contenido}`, function(err) {
            if (err) reject(err);
            else resolve("Archivo creado");
        });
    });
}
const getContenido = async (dir) => {
    try {
        const data = fs.readFileSync(dir, 'utf8');
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}
const getArchivos = async (dir) => {
    var lista = [];
    if(await dirExiste(dir)){
        fs.readdirSync(`${dir}`).forEach(async file => {
            lista.push(file);
        });
    }
    return lista;
}
const leerArchivo = async (d) => {
    return await fs.readFileSync(d, 'utf8');
}
const leerDir = async (ext, f) => {
    const path = `${dir}${ext}/${f}`;
  
    if (fs.existsSync(path)) return true;
    else return false;
}

const makeid = async (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

const registrarError = async (error, tipo) => {
    let ide = await makeid(20);
    await crearArchivo(`${ide}.txt`, `${dir}/errores`, `${tipo}\n\n${error}`);
    console.log(`------------------------------------

    #####  #####  #####  #####  #####
    #      #   #  #   #  #   #  #   #
    #####  #####  #   #  #####  #####
    #      #  #   #   #  #  #   #  # 
    #####  #   #  #####  #   #  #   #

    ID: ${ide}
    Tipo de error: ${tipo}
    
------------------------------------`);
    return ide;
}


export {
    dirExiste,
    crearDir,
    archivoExiste,
    crearArchivo,
    getContenido,
    leerArchivo,
    leerDir,
    registrarError,
    Borrar,
    getArchivos,
    makeid
}