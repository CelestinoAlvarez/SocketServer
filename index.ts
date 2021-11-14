import bodyParser from "body-parser";
import express from "express";
import  cors  from "cors";

import Server from "./classes/server";
import { SERVER_PORT } from "./global/environments";
import { router } from "./routes/routes";

const server = Server.instance;


//Para poder leer los datos que vienen del endpoint
server.app.use(express.urlencoded({extended:true}));
server.app.use(express.json());


//CORS, configuramos cors para que se pueda acceder a nuestro backend desde otro dominio
server.app.use(cors({origin:true, credentials:true}))

//Rutas de servicios
server.app.use('/',router);


server.start(()=>{
    console.log("Servidor en funcionamiento en el puerto ",SERVER_PORT);
    
});
