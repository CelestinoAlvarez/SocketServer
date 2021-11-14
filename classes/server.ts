import  express  from "express";
import socketIO from "socket.io";
import http from 'http';

import { SERVER_PORT } from "../global/environments";
import * as socket from '../sockets/sockets';

export default class Server{
    //Esta variable tiene que ver con el Singleton
    private static _instance:Server;
    public app:express.Application;
    public port:number;
    public io:socketIO.Server;
    private httpServer:http.Server;

    private constructor(){
        this.app=express();
        this.port=SERVER_PORT;

        //Para poder utilizar sockets debemos enlazar express y sockets mediante http
        this.httpServer=new http.Server(this.app);
        this.io = new socketIO.Server( this.httpServer, { cors: { origin: true, credentials: true } } );
        this.escucharSockets();

    }

    public static get instance(){
        return this._instance || (this._instance=new this());
    }

    start(callback:Function){
        this.httpServer.listen(this.port,callback());
    }

    private escucharSockets(){
        console.log('Escuchando conexiones');
        this.io.on('connection',cliente=>{
            console.log('Nuevo cliente conectado'); 

        //Desconectar
        socket.desconectar(cliente);

        //Leer mensaje
        socket.escucharMensaje(cliente, this.io);
          
        })
        
        }
}