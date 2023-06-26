
import express from "express";
//import datos from "../api.json" assert {type: 'json'};
import { RegistrarUsuario, LoginUsuario } from "../controladores/DataManager.js";
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
import session from "express-session";

const router = express.Router();
const regresar = async (req, res) => {res.send("xd");} 
router.route("/").get(regresar);

router.route("/register").get(regresar).post(jsonParser,RegistrarUsuario);
router.route("/login").get(regresar).post(jsonParser,LoginUsuario);

router.get("*", async function(req, res){
    res.redirect("/");
});

export default router;

//router.route("/register").get(RegisterView).post(jsonParser,Register);
//router.route("/logout").get((req, res) => {req.session.destroy(function(err) {});res.redirect('/login');});
