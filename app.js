import express from "express";
import usuarioRutas from "./rutas/UsuarioRutas.js";
const max = 24*60*60000;
import session from "express-session";
import fileUpload from 'express-fileupload';

const app = express();

//controlador de archivos
app.use(fileUpload());

app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true, cookie: { maxAge: max }}));

//habilitar lectura de formulario
app.use(express.urlencoded( {extended: true}) );

//Usar pug
app.set("view engine", "ejs");
app.set("views", "./vistas");

//carpetas publicas
app.use(express.static("public"));

//use es para buscar todas las rutas que empiecen por "/"
app.use("/", usuarioRutas);

const port = 21025;
app.listen(port, () => {
    console.log(`servidor cargado exitosamente en ${port}`);
});

//OTMzMTM5MjM5MDM2NjU3NzM1.GRR5QH.z7jN9sIckv32Y_9-kYdAt0RrdRHJGL0Nrav1UI